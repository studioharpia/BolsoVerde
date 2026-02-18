import Papa from 'papaparse'

/**
 * Normaliza strings para comparação (remove acentos, espaços extras e caixa baixa)
 */
const normalizeText = (text) => {
    if (!text) return ''
    return text.toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/\s+/g, ' ')           // Normaliza espaços
        .trim()
        .toLowerCase()
}

/**
 * Detecta se o valor está em formato BR (1.234,56) ou EN (1234.56)
 * e converte para Number corretamente.
 */
const parseAmount = (value) => {
    if (value === null || value === undefined) return 0

    let str = String(value).trim()
    if (!str) return 0

    // Remove R$, $, espaços e outros símbolos monetários
    str = str.replace(/[R$\s]/g, '')

    // Se o valor estiver entre parênteses: (1.234,56) -> -1.234,56
    if (str.startsWith('(') && str.endsWith(')')) {
        str = '-' + str.slice(1, -1)
    }

    // Se já é um número limpo EN (ex: 1234.56)
    if (/^-?\d+(\.\d+)?$/.test(str)) {
        return parseFloat(str)
    }

    // Identifica o separador decimal
    // Se tem vírgula e ponto, o último é o decimal
    const lastComma = str.lastIndexOf(',')
    const lastDot = str.lastIndexOf('.')

    if (lastComma > lastDot) {
        // Formato BR (ou similar): 1.234,56
        str = str.replace(/\./g, '').replace(',', '.')
    } else if (lastDot > lastComma && lastComma !== -1) {
        // Formato EN com separador de milhar: 1,234.56
        str = str.replace(/,/g, '')
    } else if (lastComma !== -1) {
        // Apenas vírgula: 1234,56
        str = str.replace(',', '.')
    }

    const parsed = parseFloat(str)
    return isNaN(parsed) ? 0 : parsed
}

/**
 * Mapeamento inteligente de colunas filtrando por proximidade de nomes.
 */
const mapRow = (row) => {
    const keys = Object.keys(row)

    // Função auxiliar para achar chave por alias com prioridade
    const findValue = (aliases) => {
        const normalizedKeys = keys.map(k => ({ original: k, normalized: normalizeText(k) }))

        // 1. Tenta match exato primeiro
        const exactMatch = normalizedKeys.find(k =>
            aliases.some(alias => k.normalized === normalizeText(alias))
        )
        if (exactMatch) return row[exactMatch.original]

        // 2. Tenta match parcial (excluindo casos de colisão conhecidos)
        const partialMatch = normalizedKeys.find(k => {
            return aliases.some(alias => {
                const normalizedAlias = normalizeText(alias)
                // Se o alias é 'lancamento', não pode conter 'data' para evitar 'Data Lançamento' ser pego como descrição
                if (normalizedAlias === 'lancamento' && k.normalized.includes('data')) return false
                return k.normalized.includes(normalizedAlias)
            })
        })
        return partialMatch ? row[partialMatch.original] : ''
    }

    // Coleta todas as chaves que batem com aliases de descrição para fusão
    const descriptionAliases = ['descricao', 'historico', 'title', 'description', 'titulo', 'lancamento', 'detalhe', 'movimentacao', 'movimentacoes', 'identificador']
    const descriptionParts = keys
        .filter(k => descriptionAliases.some(alias => normalizeText(k).includes(normalizeText(alias))))
        .map(k => row[k])
        .filter(val => val && val.trim() !== '')

    // Remove duplicatas (caso 'Histórico' e 'Descrição' tenham o mesmo valor)
    const uniqueParts = [...new Set(descriptionParts)]
    const description = uniqueParts.join(' - ')

    const date = findValue(['data', 'date', 'vencimento', 'data lancamento'])
    const rawAmount = findValue(['valor', 'amount', 'total', 'quantia', 'valor da transacao'])

    const amount = parseAmount(rawAmount)

    return { date, description: description || 'Sem descrição', amount }
}

/**
 * Tenta localizar a linha de cabeçalho real ignorando metadados no topo
 */
const findHeaderAndContent = (text) => {
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== '')

    const keywords = ['data', 'valor', 'descricao', 'historico', 'amount', 'date']

    let headerIndex = -1
    for (let i = 0; i < Math.min(lines.length, 20); i++) {
        const lowerLine = normalizeText(lines[i])
        // Conta quantas palavras-chave de cabeçalho existem na linha
        const matches = keywords.filter(k => lowerLine.includes(k)).length

        if (matches >= 2) {
            headerIndex = i
            break
        }
    }

    if (headerIndex === -1) return text // Falhou em detectar, tenta o texto todo
    return lines.slice(headerIndex).join('\n')
}

/**
 * Extrai transações de um arquivo CSV
 */
export const parseFile = async (file) => {
    const text = await file.text()
    const cleanedCSV = findHeaderAndContent(text)

    return new Promise((resolve, reject) => {
        Papa.parse(cleanedCSV, {
            header: true,
            dynamicTyping: false,
            skipEmptyLines: 'greedy',
            complete: (results) => {
                if (!results.data || results.data.length === 0) {
                    reject(new Error('Não foi possível encontrar dados válidos no CSV.'))
                    return
                }

                const transactions = results.data
                    .map(mapRow)
                    .filter(t => t.description && t.amount !== 0)

                console.log('[BolsoVerde] CSV Extraído:', transactions.length, 'itens')
                resolve(transactions)
            },
            error: (err) => reject(new Error('Erro ao ler CSV: ' + err.message))
        })
    })
}
