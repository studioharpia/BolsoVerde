/**
 * Sistema de Categorização Financeira — BolsoVerde
 *
 * REGRA DE PRIORIDADE: Categorias são verificadas em ordem.
 * Categorias ESPECÍFICAS (Moradia, Saúde) vêm ANTES de categorias genéricas.
 * Isso evita que keywords amplas como "PIX" ou "PAGAMENTO" roubem transações.
 *
 * ⚠️ NÃO reordene as entradas sem entender o impacto na prioridade.
 */

// Ordered array (NOT object) to guarantee priority
const CATEGORY_RULES = [
    // ── PRIORIDADE ALTA: Categorias com keywords muito específicas ──
    {
        name: 'Moradia',
        keywords: [
            // Aluguel e variações
            'ALUGUEL', 'ALUG ', 'PGTO ALUG', 'PAG ALUG', 'LOCACAO', 'LOCAÇÃO',
            // Imobiliárias e plataformas
            'QUINTO ANDAR', 'QUINTOANDAR', 'LOFT', 'ZAP IMOVEIS', 'IQ GESTAO',
            'IMOVEIS', 'IMOBILIARIA', 'IMOBILIÁRIA',
            // Condomínio
            'CONDOMINIO', 'CONDOMÍNIO', 'COND ',
            // Energia elétrica
            'ENEL', 'CEMIG', 'CPFL', 'LIGHT', 'ELETRO', 'COELBA', 'CELPE',
            'ENERGISA', 'EQUATORIAL', 'NEOENERGIA', 'ENERGIA', 'ELETRICIDADE',
            'CONTA DE LUZ', 'LUZ ',
            // Água e esgoto
            'SABESP', 'SANEPAR', 'COPASA', 'CEDAE', 'CAGECE', 'EMBASA',
            'COMPESA', 'DESO', 'CAERN', 'CORSAN', 'CONTA DE AGUA', 'AGUA ',
            // Gás
            'COMGAS', 'COMGÁS', 'GAS NATURAL', 'GÁS NATURAL', 'SUPERGASBRAS', 'ULTRAGAZ',
            'NACIONAL GAS', 'CONTA DE GAS',
            // Internet e telefone fixo (moradia, não celular)
            'INTERNET', 'FIBRA', 'NET ', 'VIVO FIBRA', 'CLARO FIBRA', 'OI FIBRA',
            // IPTU e seguro
            'IPTU', 'SEGURO RESID', 'SEGURO INCENDIO',
        ],
    },
    {
        name: 'Saúde',
        keywords: [
            'FARMACIA', 'FARMÁCIA', 'DROGASIL', 'DROGA RAIA', 'ULTRAFARMA',
            'PAGUE MENOS', 'DROGARIA', 'PANVEL',
            'HOSPITAL', 'MEDICO', 'MÉDICO', 'CLINICA', 'CLÍNICA',
            'LABORATORIO', 'LABORATÓRIO', 'EXAME',
            'ODONTO', 'DENTISTA', 'ORTODONT',
            'PLANO DE SAUDE', 'PLANO DE SAÚDE', 'UNIMED', 'AMIL', 'SULAMERICA',
            'SULAMÉRICA', 'BRADESCO SAUDE', 'HAPVIDA', 'NOTREDAME',
            'SMARTFIT', 'SMART FIT', 'GYMPASS', 'WELLHUB', 'TOTALPASS',
            'ACADEMIA', 'BLU FIT', 'BODYTECH',
            'PSICOLOG', 'TERAPIA', 'FISIOTERAPIA', 'NUTRICION',
        ],
    },
    {
        name: 'Educação',
        keywords: [
            'FACULDADE', 'UNIVERSIDADE', 'ESCOLA', 'COLEGIO', 'COLÉGIO',
            'CURSO', 'MENSALIDADE',
            'ALURA', 'UDEMY', 'ROCKETSEAT', 'DIO ', 'HOTMART', 'EDUZZ', 'KIWIFY',
            'PLATZI', 'COURSERA', 'DOMESTIKA',
            'LIVRARIA', 'SARAIVA', 'CULTURA',
        ],
    },

    // ── PRIORIDADE MÉDIA: Categorias bem definidas ──
    {
        name: 'Transporte',
        keywords: [
            'UBER', '99APP', '99POP', '99 APP', 'CABIFY', 'INDRIVER',
            'POSTO', 'GASOLINA', 'COMBUSTIVEL', 'COMBUSTÍVEL',
            'SHELL', 'IPIRANGA', 'BR DISTRIBUIDORA', 'ALE COMBUSTIVEIS',
            'ESTACIONAMENTO', 'ZONA AZUL', 'ESTAPAR',
            'PEDAGIO', 'PEDÁGIO', 'SEM PARAR', 'CONECTCAR', 'VELOE',
            'METRO', 'METRÔ', 'BILHETE UNICO', 'BILHETE ÚNICO',
            'VIA QUATRO', 'CPTM', 'BOM ', 'RECARGA BILHETE',
        ],
    },
    {
        name: 'Alimentação',
        keywords: [
            'IFOOD', 'RAPPI', 'JAMES', 'ZE DELIVERY', 'ZÉ DELIVERY',
            'MC DONALDS', 'MCDONALD', 'BURGER KING', 'BK ', 'OUTBACK',
            'SUBWAY', 'KFC', 'POPEYES', 'HABIB', 'GIRAFFAS', 'MADERO',
            'RESTAURANTE', 'LANCHONETE', 'PIZZARIA', 'PIZZA', 'SUSHI',
            'PADARIA', 'CONFEITARIA', 'CAFE ', 'CAFETERIA', 'STARBUCKS',
            'SUPERMERCADO', 'MERCADO', 'CARREFOUR', 'EXTRA', 'PAO DE ACUCAR',
            'PÃO DE AÇÚCAR', 'ATACADAO', 'ATACADÃO', 'ASSAI', 'ASSAÍ',
            'SAM CLUB', 'SAMS CLUB', 'MAKRO', 'BIG ', 'HORTIFRUTI',
            'ACOUGUE', 'AÇOUGUE', 'SACOLAO', 'SACOLÃO',
        ],
    },
    {
        name: 'Assinaturas',
        keywords: [
            'NETFLIX', 'SPOTIFY', 'DEEZER', 'TIDAL', 'APPLE MUSIC',
            'DISNEY', 'DISNEY+', 'PRIME VIDEO', 'AMAZON PRIME',
            'HBO', 'HBO MAX', 'MAX ', 'PARAMOUNT', 'GLOBOPLAY', 'STAR+',
            'YOUTUBE PREMIUM', 'YOUTUBE MUSIC', 'APPLE TV',
            'CHATGPT', 'OPENAI', 'CLAUDE', 'MIDJOURNEY',
            'ICLOUD', 'GOOGLE ONE', 'DROPBOX', 'ONEDRIVE',
            'ADOBE', 'CANVA', 'FIGMA', 'NOTION',
            'XBOX GAME PASS', 'PLAYSTATION PLUS', 'PS PLUS', 'STEAM',
            'CRUNCHYROLL', 'TWITCH',
        ],
    },
    {
        name: 'Compras',
        keywords: [
            'MAGAZINE', 'MAGALU', 'MERCADO LIVRE', 'MERCADOLIVRE',
            'SHOPEE', 'SHEIN', 'TEMU', 'ALIEXPRESS', 'WISH',
            'AMAZON', 'KABUM', 'PICHAU', 'TERABYTE',
            'RENNER', 'RIACHUELO', 'ZARA', 'C&A', 'HERING',
            'LOJAS AMERICANAS', 'CASAS BAHIA', 'PONTO FRIO',
            'CENTAURO', 'NETSHOES', 'NIKE', 'ADIDAS', 'DECATHLON',
            'BOTICARIO', 'BOTICÁRIO', 'NATURA', 'AVON', 'SEPHORA',
            'LEROY MERLIN', 'TELHA NORTE', 'DICICO', 'OBRAMAX',
        ],
    },

    // ── PRIORIDADE BAIXA: Categorias de nicho ──
    {
        name: 'Viagem',
        keywords: [
            'AIRBNB', 'BOOKING', 'HOTEL', 'POUSADA', 'HOSTEL',
            'DECOLAR', 'HURB', 'LATAM', 'GOL ', 'AZUL ', 'TAP ',
            'PASSAGEM', 'AEREO', 'AÉREO', 'AIRLINE',
            'RENT A CAR', 'LOCALIZA', 'MOVIDA', 'UNIDAS',
            'AGENCIA DE VIAGEM', 'CVC ', 'COPA AIRLINES',
        ],
    },
    {
        name: 'Pets',
        keywords: [
            'PETSHOP', 'PET SHOP', 'COBASI', 'PETZ', 'PET CENTER',
            'VETERINARIO', 'VETERINÁRIO', 'VET ', 'VETERIN',
            'RACAO', 'RAÇÃO', 'PET LOVE', 'PETLOVE', 'DOG', 'CAT',
        ],
    },
    {
        name: 'Lazer',
        keywords: [
            'CINEMA', 'CINEMARK', 'CINEPOLIS', 'UCI ',
            'TEATRO', 'SHOW', 'INGRESSO', 'SYMPLA', 'EVENTIM', 'TICKET',
            'PARQUE', 'MUSEU', 'BRINQUEDO', 'JOGO ',
            'BAR ', 'CERVEJA', 'CHOPP', 'PUB ', 'BALADA', 'DANCETERIA',
        ],
    },

    // ── CELULAR: Separado de Moradia (internet fixa) ──
    {
        name: 'Telefonia',
        keywords: [
            'VIVO', 'CLARO', 'TIM ', 'OI ', 'CELULAR',
            'RECARGA CELULAR', 'RECARGA TIM', 'RECARGA VIVO', 'RECARGA CLARO',
        ],
    },
]

/**
 * Cores vibrantes e distinguíveis para cada categoria
 */
export const CATEGORY_COLORS = {
    'Moradia': '#06b6d4', // Cyan
    'Saúde': '#ef4444', // Red
    'Educação': '#f59e0b', // Amber
    'Transporte': '#3b82f6', // Blue
    'Alimentação': '#10b981', // Emerald
    'Assinaturas': '#8b5cf6', // Violet
    'Compras': '#ec4899', // Pink
    'Viagem': '#f97316', // Orange
    'Pets': '#a3e635', // Lime
    'Lazer': '#14b8a6', // Teal
    'Telefonia': '#6366f1', // Indigo
    'Outros': '#94a3b8', // Slate
}

/**
 * Classifica uma transação com base na descrição.
 * A ordem das regras em CATEGORY_RULES define a prioridade.
 */
export const categorizeTransaction = (description) => {
    if (!description) return 'Outros'
    const upper = description.toUpperCase()

    for (const rule of CATEGORY_RULES) {
        if (rule.keywords.some(kw => upper.includes(kw))) {
            return rule.name
        }
    }

    return 'Outros'
}

/**
 * Normaliza uma data string para formato YYYY-MM-DD
 */
const normalizeDate = (dateStr) => {
    if (!dateStr) return null

    // Formato DD/MM/YYYY
    const brMatch = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/)
    if (brMatch) return `${brMatch[3]}-${brMatch[2]}-${brMatch[1]}`

    // Formato YYYY-MM-DD (já normalizado)
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr

    return dateStr
}

/**
 * Processa transações e retorna dados completos para o Dashboard
 */
export const summarizeData = (transactions) => {
    const categoriesSum = {}
    let totalSpent = 0
    let totalReceived = 0
    const dailySpending = {}

    // Enriquece cada transação com categoria
    const enriched = transactions.map(t => {
        const category = categorizeTransaction(t.description)
        const normalizedDate = normalizeDate(t.date) || t.date
        return { ...t, category, normalizedDate }
    })

    enriched.forEach(t => {
        if (t.amount < 0) {
            // Débito (gasto)
            const absAmount = Math.abs(t.amount)
            totalSpent += absAmount
            categoriesSum[t.category] = (categoriesSum[t.category] || 0) + absAmount

            // Agrupa por dia
            const dayKey = t.normalizedDate || 'Sem data'
            dailySpending[dayKey] = (dailySpending[dayKey] || 0) + absAmount
        } else {
            // Crédito (recebimento)
            totalReceived += t.amount
        }
    })

    // Dados para o PieChart (categorias)
    const pieData = Object.entries(categoriesSum)
        .map(([name, value]) => ({
            name,
            value: Math.round(value * 100) / 100,
            color: CATEGORY_COLORS[name] || CATEGORY_COLORS['Outros']
        }))
        .sort((a, b) => b.value - a.value)

    // Dados para o BarChart (volume temporal)
    const sortedDays = Object.keys(dailySpending).sort()
    const useMonthly = sortedDays.length > 45

    let barData = []
    if (useMonthly) {
        const monthlySpending = {}
        sortedDays.forEach(day => {
            const month = day.substring(0, 7)
            monthlySpending[month] = (monthlySpending[month] || 0) + dailySpending[day]
        })
        barData = Object.entries(monthlySpending)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, value]) => {
                const [y, m] = month.split('-')
                const label = new Date(y, parseInt(m) - 1).toLocaleDateString('pt-BR', { month: 'short' })
                return { label: label.charAt(0).toUpperCase() + label.slice(1), valor: Math.round(value * 100) / 100 }
            })
    } else {
        barData = sortedDays.map(day => {
            const d = new Date(day + 'T12:00:00')
            const label = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
            return { label, valor: Math.round(dailySpending[day] * 100) / 100 }
        })
    }

    // Todas as transações enriquecidas (débitos e créditos), ordenadas por valor
    const allTransactions = enriched
        .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))

    return {
        pieData,
        barData,
        totalSpent: Math.round(totalSpent * 100) / 100,
        totalReceived: Math.round(totalReceived * 100) / 100,
        transactions: allTransactions,
        barLabel: useMonthly ? 'por mês' : 'por dia',
        transactionCount: allTransactions.length
    }
}
