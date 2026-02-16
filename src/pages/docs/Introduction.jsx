export default function Introduction() {
    return (
        <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">Introdução</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Bem-vindo à documentação oficial do projeto Jarvis IA. Este guia fornece todas as informações necessárias para entender o ecossistema, objetivos e regras de negócio.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Visão Geral</h2>
                <p className="text-muted-foreground mb-4">
                    O Jarvis IA é uma plataforma poderosa projetada para otimizar processos internos e fornecer uma interface intuitiva para gestão de clientes, negócios e ativos digitais.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div className="p-6 rounded-xl border border-border bg-card">
                        <h3 className="font-bold mb-2">Colaboração</h3>
                        <p className="text-sm text-muted-foreground">Fluidos de trabalho eficientes para equipes modernas.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-border bg-card">
                        <h3 className="font-bold mb-2">Inovação</h3>
                        <p className="text-sm text-muted-foreground">Utilizando as últimas tecnologias para escalar resultados.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
