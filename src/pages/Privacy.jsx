import { Badge } from '../components/ui/Badge'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HarpiaBanner } from '../components/layout/HarpiaBanner'
import { ShieldCheck, Lock, EyeOff, Database } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { useEffect } from 'react'

export default function Privacy() {
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
                                Compromisso com Você
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-balance">
                                Política de <span className="text-primary italic">Privacidade.</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                                No BolsoVerde, sua privacidade não é uma opção, é a base de tudo o que construímos.
                                Seus dados financeiros pertencem apenas a você.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container max-w-4xl mx-auto px-6 py-20">
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card className="p-8 rounded-[2.5rem] border-primary/10 bg-primary/5 space-y-4">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <EyeOff className="size-6" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">Zero Armazenamento</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    Não salvamos suas transações, descrições ou valores em nossos servidores.
                                    O processamento ocorre de forma efêmera e local.
                                </p>
                            </Card>
                            <Card className="p-8 rounded-[2.5rem] border-primary/10 bg-primary/5 space-y-4">
                                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Database className="size-6" />
                                </div>
                                <h3 className="text-xl font-black tracking-tight">Processamento Local</h3>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                    Seu arquivo CSV é lido pelo seu próprio navegador.
                                    Nada é enviado para bancos de dados externos para fins de armazenamento permanente.
                                </p>
                            </Card>
                        </div>

                        <div className="prose prose-invert max-w-none space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-black tracking-tight">1. Coleta de Informações</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    O BolsoVerde não exige cadastro, senha ou vinculação de conta bancária.
                                    A única informação processada é o conteúdo do arquivo CSV que você escolhe carregar voluntariamente.
                                    Este processamento é realizado exclusivamente para gerar as visualizações e gráficos em sua tela.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black tracking-tight">2. Uso dos Dados</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Os dados extraídos dos seus extratos são utilizados apenas para fins de exibição imediata no Dashboard.
                                    Não utilizamos seus dados para treinamento de modelos de IA de terceiros, venda para anunciantes ou qualquer outra finalidade comercial oculta.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black tracking-tight">3. Segurança</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Utilizamos protocolos de segurança modernos para garantir que sua interação com o site seja protegida.
                                    Como não armazenamos dados financeiros sensíveis, o risco de vazamento de dados em nossos servidores é virtualmente inexistente.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black tracking-tight">4. Cookies</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Podemos utilizar cookies técnicos essenciais apenas para o funcionamento básico da plataforma e para lembrar suas preferências de design, sem rastrear sua identidade pessoal.
                                </p>
                            </div>

                            <div className="bg-secondary/30 p-8 md:p-12 rounded-[3rem] border border-border/50 mt-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <ShieldCheck className="size-8 text-primary" />
                                    <h3 className="text-2xl font-black tracking-tight">Nossa Promessa</h3>
                                </div>
                                <p className="text-muted-foreground italic leading-relaxed font-medium">
                                    &quot;Seus dados financeiros são sua vida privada. Nossa missão é dar a você as ferramentas para entendê-los, sem nunca pedir a chave para acessá-los.&quot;
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
