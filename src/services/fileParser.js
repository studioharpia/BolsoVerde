import Papa from 'papaparse'

/**
 * Detecta se o valor está em formato BR (1.234,56) ou EN (1234.56)
 * e converte para Number corretamente.
 */
const parseAmount = (value) => {
    if (value === null || value === undefined) return 0

    const str = String(value).trim()
    if (!str) return 0

    // Se já é um número limpo (formato EN: 1234.56 ou -1234.56)
    if (/^-?\d+(\.\d+)?$/.test(str)) {
        return parseFloat(str)
    }

    // Formato BR com R$: "R$ 1.234,56" ou "-R$ 1.234,56"
    let cleaned = str.replace(/[R$\s]/g, '')

    // Detecta formato BR: tem vírgula como decimal
    if (cleaned.includes(',')) {
        cleaned = cleaned.replace(/\./g, '').replace(',', '.')
    }

    return parseFloat(cleaned) || 0
}

/**
 * Mapeamento inteligente de colunas para extratos bancários brasileiros.
 * Suporte: Nubank, Inter, Bradesco, Itaú, C6, etc.
 */
const mapRow = (row) => {
    // Data
    const date = row.Data || row.date || row.Date || row['Data Lançamento'] || row['Data lançamento'] || ''

    // Descrição: prioriza campos mais descritivos
    const description = row.Descrição || row.Descricao || row.title ||
        row.description || row.Description || row.Histórico ||
        row.Titulo || row['Lançamento'] || row.Lancamento || ''

    // Valor
    const rawAmount = row.Valor || row.amount || row.Amount || row.valor || '0'
    const amount = parseAmount(rawAmount)

    return { date, description, amount }
}

/**
 * Extrai transações de um CSV
 */
const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false, // Mantém como string para nosso parser controlar
            complete: (results) => {
                if (!results.data || results.data.length === 0) {
                    reject(new Error('CSV vazio ou sem dados válidos.'))
                    return
                }

                // Log para debug
                console.log('[BolsoVerde] CSV Headers:', results.meta.fields)
                console.log('[BolsoVerde] Primeira linha:', results.data[0])

                const transactions = results.data
                    .map(mapRow)
                    .filter(t => t.description && t.amount !== 0)

                console.log('[BolsoVerde] Transações extraídas:', transactions.length)
                console.log('[BolsoVerde] Exemplo:', transactions[0])

                resolve(transactions)
            },
            error: (err) => reject(err)
        })
    })
}

/**
 * Função principal: detecta tipo e processa
 */
export const parseFile = async (file) => {
    const ext = file.name.split('.').pop().toLowerCase()

    if (ext === 'csv') {
        return await parseCSV(file)
    }

    throw new Error('Formato não suportado. Use um arquivo CSV.')
}
