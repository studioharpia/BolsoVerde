export default function Style() {
    return (
        <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">Estilo</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Diretrizes visuais para garantir consistência em toda a plataforma.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Princípios de Design</h2>
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        Nosso design é baseado no **Keystone Design System**, focando em:
                    </p>
                    <div className="flex gap-4">
                        <div className="size-12 rounded-lg bg-primary" title="Primary Color" />
                        <div className="size-12 rounded-lg bg-card border border-border" title="Card Background" />
                        <div className="size-12 rounded-lg bg-muted border border-border" title="Muted Background" />
                    </div>
                    <p className="text-muted-foreground mt-4 italic">
                        "Onde a função encontra a forma de maneira invisível."
                    </p>
                </div>
            </section>
        </div>
    )
}
