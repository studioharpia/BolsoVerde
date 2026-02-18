import { Badge } from '../components/ui/Badge'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HarpiaBanner } from '../components/layout/HarpiaBanner'
import { Scale, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { useEffect } from 'react'

export default function Terms() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <header className="p-4 pb-0">
                <HarpiaBanner />
                <Navbar />
            </header>

            <main>
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-12">
                    <div className="bg-primary/5 rounded-[3.5rem] p-8 md:p-20 flex flex-col items-center text-center space-y-8 relative overflow-hidden border border-primary/10">
                        <div className="absolute -top-24 -right-24 size-64 bg-primary/10 rounded-full blur-3xl opacity-20" />
                        <div className="absolute -bottom-24 -left-24 size-64 bg-emerald-500/5 rounded-full blur-3xl opacity-20" />

                        <div className="space-y-6 max-w-4xl relative z-10">
                            <Badge className="rounded-full bg-primary/10 text-primary border-none px-4 py-1 font-bold text-xs uppercase tracking-widest">
                                Regras de Uso
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-balance">
                                Termos de <span className="text-primary italic">Uso.</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                                Ao utilizar o BolsoVerde, você concorda com os princípios de transparência e segurança que regem nossa plataforma.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container max-w-4xl mx-auto px-6 py-20">
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-8 rounded-[2.5rem] border-primary/10 bg-primary/5 space-y-4">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Scale className="size-6" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">Uso Consciente</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    O BolsoVerde é uma ferramenta de auxílio visual. A responsabilidade pelas decisões financeiras tomadas com base nos dados apresentados é exclusivamente do usuário.
                                </p>
                            </Card>
                            <Card className="p-8 rounded-[2.5rem] border-primary/10 bg-primary/5 space-y-4">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <FileText className="size-6" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">Propriedade Intelectual</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    Toda a interface, algoritmos de categorização e design são propriedade do BolsoVerde e da Harpia IA.
                                </p>
                            </Card>
                        </div>

                        <div className="prose prose-invert max-w-none space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black tracking-tight">1. Aceitação dos Termos</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Ao carregar um extrato bancário no BolsoVerde, você declara estar ciente de que o processamento ocorre localmente e que nossa ferramenta não possui vínculo oficial com nenhuma instituição financeira.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black tracking-tight">2. Isenção de Responsabilidade</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Embora nossa IA de categorização busque a maior precisão possível, erros podem ocorrer devido a variações nas descrições bancárias. O BolsoVerde não garante precisão contábil absoluta e não deve ser usado para fins legais ou fiscais.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black tracking-tight">3. Limitações de Uso</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Você concorda em não tentar hackear, descompilar ou sobrecarregar nossos sistemas propositalmente. O uso deve ser pessoal e não comercial, a menos que acordado previamente.
                                </p>
                            </div>

                            <div className="bg-primary/5 p-8 md:p-12 rounded-[3rem] border border-primary/10 mt-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <CheckCircle2 className="size-8 text-primary" />
                                    <h3 className="text-2xl font-black tracking-tight">Conclusão</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed font-medium">
                                    Estes termos servem para proteger tanto você quanto a integridade da plataforma. Estamos em constante evolução.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
