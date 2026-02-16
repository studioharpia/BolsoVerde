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
