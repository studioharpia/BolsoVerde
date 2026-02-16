export default function Security() {
    return (
        <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">Segurança</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Protocolos e normas de segurança de dados.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Políticas</h2>
                <ul className="space-y-4">
                    <li className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
                        CUIDADO: Nunca exponha chaves de API no código cliente.
                    </li>
                    <li className="p-4 rounded-lg bg-card border border-border text-muted-foreground text-sm">
                        Todos os dados são criptografados em repouso via Supabase.
                    </li>
                </ul>
            </section>
        </div>
    )
}
