export default function Persona() {
    return (
        <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">Persona</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Entendendo quem é o nosso público-alvo e como nos comunicamos com ele.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Perfil Ideal</h2>
                <div className="prose dark:prose-invert">
                    <p className="text-muted-foreground mb-4">
                        Nossa persona principal é composta por gestores de tecnologia e empreendedores que buscam eficiência operacional sem abrir mão da estética e usabilidade.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Valoriza rapidez e automação.</li>
                        <li>Busca interfaces limpas e intuitivas.</li>
                        <li>Precisa de acesso rápido a métricas e dados de clientes.</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
