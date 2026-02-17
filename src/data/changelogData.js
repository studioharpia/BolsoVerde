/**
 * Changelog Data — Banco de dados local
 * 
 * Cada entrada segue o formato:
 * {
 *   date: "YYYY-MM-DD",
 *   title: "Título do update",
 *   type: "feature" | "fix" | "improvement" | "breaking",
 *   items: [
 *     { category: "Categoria", text: "Descrição amigável" }
 *   ]
 * }
 */

export const changelogEntries = [
    {
        date: "2026-02-17",
        title: "Categorização Inteligente 2.0",
        type: "feature",
        items: [
            { category: "Melhoria", text: "Sistema de categorias totalmente refeito com 11 categorias e prioridade inteligente." },
            { category: "Correção", text: "Aluguel e contas de moradia agora são corretamente classificados como 'Moradia'." },
            { category: "Funcionalidade", text: "Novas categorias: Assinaturas, Viagem, Pets e Telefonia." },
            { category: "Melhoria", text: "Valores no extrato agora mostram cor verde para entradas e vermelho para saídas." },
        ],
    },
    {
        date: "2026-02-17",
        title: "Correção de Leitura e Novo Dashboard",
        type: "fix",
        items: [
            { category: "Correção", text: "Valores financeiros agora são lidos corretamente do extrato do Nubank e outros bancos." },
            { category: "Funcionalidade", text: "Novo gráfico de Volume de Gastos por dia/mês para acompanhar sua evolução." },
            { category: "Funcionalidade", text: "Extrato detalhado com categoria, data e valor de cada transação." },
            { category: "Melhoria", text: "Separação de gastos e recebimentos — o total agora mostra apenas o que foi gasto." },
        ],
    },
    {
        date: "2026-02-17",
        title: "Lançamento da Landing Page BolsoVerde",
        type: "feature",
        items: [
            { category: "Funcionalidade", text: "Transformação da Home em uma Landing Page interativa com suporte a upload de extratos." },
            { category: "Visualização", text: "Implementação de Dashboards financeiros usando Recharts (Gráficos de Pizza e Barras)." },
            { category: "UX", text: "Adição de estados de processamento com animações e simulação de categorização inteligente." },
        ],
    },
    {
        date: "2026-02-17",
        title: "Identidade Visual BolsoVerde",
        type: "feature",
        items: [
            { category: "Design", text: "Transição completa para a nova identidade baseada em tons de Esmeralda e visual clean." },
            { category: "Interface", text: "Ajuste do arredondamento (radius) para 16px, trazendo um toque mais moderno e premium." },
            { category: "Sistema", text: "Atualização dos tokens de cores para suporte otimizado ao Light mode e ダーク mode." },
        ],
    },
    {
        date: "2026-02-16",
        title: "Estabilidade e pequenos ajustes",
        type: "fix",
        items: [
            { category: "Melhoria", text: "Corrigimos problemas técnicos que causavam instabilidade no calendário e seletores de data." },
            { category: "Experiência", text: "Ajustes na navegação para garantir que tudo funcione de forma rápida e sem erros." },
            { category: "Segurança", text: "Adicionamos proteções internas para evitar interrupções no funcionamento do site." },
        ],
    },
    {
        date: "2026-02-16",
        title: "Otimização de performance",
        type: "fix",
        items: [
            { category: "Sistema", text: "Limpeza de códigos antigos para deixar o carregamento das páginas mais rápido." },
            { category: "Interface", text: "Melhorias nos componentes de seleção e tabelas para facilitar o uso." },
        ],
    },
    {
        date: "2026-02-16",
        title: "Novos elementos visuais — Lote 3",
        type: "feature",
        items: [
            { category: "Novidade", text: "Adicionados novos componentes: Dicas flutuantes (Tooltips), Notificações e Botões de alternância." },
            { category: "Design", text: "Lançamento de elementos de texto refinados (h1–h4, citações e blocos de código)." },
            { category: "Interface", text: "Novos seletores de abas e botões de estado para layouts mais dinâmicos." },
        ],
    },
    {
        date: "2026-02-16",
        title: "Expansão da biblioteca de componentes",
        type: "feature",
        items: [
            { category: "Novidade", text: "Implementamos barras de busca, paginação e indicadores de progresso." },
            { category: "Design", text: "Novos painéis laterais (Sidebars) e áreas flexíveis que se ajustam ao conteúdo." },
            { category: "Interface", text: "Elementos de carregamento (Skeletons) para uma percepção de velocidade melhorada." },
        ],
    },
    {
        date: "2026-02-16",
        title: "Lançamento dos componentes base",
        type: "feature",
        items: [
            { category: "Novidade", text: "Primeiro conjunto de blocos fundamentais: Acordeões, Alertas e Menus de contexto." },
            { category: "Interface", text: "Criação de janelas flutuantes (Dialogs) e calendários interativos." },
            { category: "Sistema", text: "Introdução de tabelas de dados inteligentes com filtros e ordenação." },
        ],
    },
    {
        date: "2026-02-16",
        title: "Identidade Visual e Formulários",
        type: "improvement",
        items: [
            { category: "Design", text: "Unificação do estilo de bordas e sombras para um visual mais premium e moderno." },
            { category: "Interface", text: "Novos campos de formulário e áreas de texto com validações visuais." },
        ],
    },
    {
        date: "2026-02-16",
        title: "Fundação do Design System Keystone",
        type: "feature",
        items: [
            { category: "Design", text: "Definição oficial das cores, tipografia e espaçamentos do projeto." },
            { category: "Sistema", text: "Configuração da base tecnológica para garantir consistência visual em todo o site." },
        ],
    },
    {
        date: "2026-02-16",
        title: "Início do Projeto",
        type: "feature",
        items: [
            { category: "Sistema", text: "Configuração inicial do ambiente e tecnologias de última geração." },
            { category: "Infra", text: "Conexão com banco de dados e estrutura base de rotas finalizada." },
        ],
    },
]
