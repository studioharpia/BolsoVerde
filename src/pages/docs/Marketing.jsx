export default function Marketing() {
    return (
        <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">Marketing</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Estratégias de posicionamento e tom de voz da marca.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Voz da Marca</h2>
                <div className="grid grid-cols-1 gap-6">
                    <div className="p-6 rounded-xl border border-border bg-card">
                        <h3 className="font-bold text-primary mb-2">Tecnológica</h3>
                        <p className="text-sm text-muted-foreground">Sempre na vanguarda, mas acessível.</p>
                    </div>
                    <div className="p-6 rounded-xl border border-border bg-card">
                        <h3 className="font-bold text-primary mb-2">Confiável</h3>
                        <p className="text-sm text-muted-foreground">Passamos segurança em cada interação.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
