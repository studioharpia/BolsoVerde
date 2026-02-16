import React from 'react'

const ColorSwatch = ({ name, variable, hex }) => (
    <div className="flex flex-col gap-2">
        <div
            className="h-20 w-full rounded-lg border border-border shadow-sm"
            style={{ backgroundColor: `var(${variable})` }}
        />
        <div>
            <p className="text-sm font-medium capitalize">{name}</p>
            <code className="text-xs text-muted-foreground">{variable}</code>
        </div>
    </div>
)

export default function Styleguide() {
    const colors = [
        { name: 'background', var: '--background' },
        { name: 'foreground', var: '--foreground' },
        { name: 'card', var: '--card' },
        { name: 'primary', var: '--primary' },
        { name: 'secondary', var: '--secondary' },
        { name: 'muted', var: '--muted' },
        { name: 'border', var: '--border' },
        { name: 'accent', var: '--accent' },
    ]

    const semantics = [
        { name: 'success', var: '--success' },
        { name: 'success (muted)', var: '--success-muted' },
        { name: 'warning', var: '--warning' },
        { name: 'warning (muted)', var: '--warning-muted' },
        { name: 'destructive', var: '--destructive' },
        { name: 'destructive (muted)', var: '--destructive-muted' },
        { name: 'info', var: '--info' },
        { name: 'info (muted)', var: '--info-muted' },
    ]

    return (
        <div className="max-w-4xl space-y-12">
            <section>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Design Tokens</h1>
                <p className="text-muted-foreground">Extraídos do design Keystone.</p>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-2">Colors</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colors.map((color) => (
                        <ColorSwatch key={color.var} name={color.name} variable={color.var} />
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-2">Semantics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {semantics.map((color) => (
                        <ColorSwatch key={color.var} name={color.name} variable={color.var} />
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-2">Typography</h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Heading 1</p>
                        <h1 className="text-4xl font-bold">The quick brown fox jumps over the lazy dog.</h1>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Heading 2</p>
                        <h2 className="text-2xl font-semibold">The quick brown fox jumps over the lazy dog.</h2>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Body text</p>
                        <p className="text-base">A raposa rápida e marrom pula sobre o cão preguiçoso. Este é um exemplo de texto comum usando a fonte Inter e as variáveis de cor neutra do Keystone.</p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <h2 className="text-xl font-semibold border-b pb-2">Rounding & Shadows</h2>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <p className="text-sm font-medium">Border Radius (0.75rem)</p>
                        <div className="h-24 w-full bg-card border border-border rounded-lg flex items-center justify-center">
                            Large (default)
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm font-medium">Shadows</p>
                        <div className="h-24 w-full bg-card border border-border rounded-lg shadow-lg flex items-center justify-center">
                            Elevation
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
