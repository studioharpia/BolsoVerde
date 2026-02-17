import { Link } from 'react-router-dom'
import { BookOpen, Palette, Zap, Server, Layout, Brain } from 'lucide-react'

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
            <div className="max-w-6xl w-full space-y-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="size-16 rounded-2xl bg-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                        <Layout className="size-8 text-primary-foreground" />
                    </div>
                    <h1 className="text-5xl font-black tracking-tight uppercase">Jarvis IA</h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Acesse as principais áreas do projeto através dos módulos abaixo.
                    </p>
                    <button
                        onClick={() => {
                            import('canvas-confetti').then(confetti => {
                                confetti.default({
                                    particleCount: 150,
                                    spread: 70,
                                    origin: { y: 0.6 },
                                    colors: ['#3b82f6', '#8b5cf6', '#f97316', '#10b981']
                                });
                            });
                            const audio = new Audio('https://www.soundjay.com/human/sounds/applause-01.mp3');
                            audio.volume = 0.5;
                            audio.play();
                        }}
                        className="mt-6 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 group active:scale-95"
                    >
                        <Zap className="size-4 fill-current group-hover:animate-bounce" />
                        Celebrar Lançamento
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    <Link to="/docs" className="group p-8 rounded-3xl border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all space-y-4 flex flex-col items-center text-center">
                        <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <BookOpen className="size-7 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Docs</h3>
                            <p className="text-sm text-muted-foreground mt-2">Documentação e regras de negócio.</p>
                        </div>
                    </Link>

                    <Link to="/styleguide" className="group p-8 rounded-3xl border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all space-y-4 flex flex-col items-center text-center">
                        <div className="size-14 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Palette className="size-7 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Styleguide</h3>
                            <p className="text-sm text-muted-foreground mt-2">Design system e componentes.</p>
                        </div>
                    </Link>

                    <Link to="/skills" className="group p-8 rounded-3xl border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all shadow-xl shadow-primary/5 ring-1 ring-primary/10 space-y-4 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3">
                            <div className="size-2 rounded-full bg-primary animate-pulse" />
                        </div>
                        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Brain className="size-7 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">IA Nucleus</h3>
                            <p className="text-sm text-muted-foreground mt-2">Capacidades e skills do Jarvis.</p>
                        </div>
                    </Link>

                    <Link to="/updates" className="group p-8 rounded-3xl border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all space-y-4 flex flex-col items-center text-center">
                        <div className="size-14 rounded-2xl bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap className="size-7 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Updates</h3>
                            <p className="text-sm text-muted-foreground mt-2">Log de mudanças do projeto.</p>
                        </div>
                    </Link>

                    <Link to="/status" className="group p-8 rounded-3xl border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all space-y-4 flex flex-col items-center text-center">
                        <div className="size-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Server className="size-7 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Status</h3>
                            <p className="text-sm text-muted-foreground mt-2">Saúde dos servidores e serviços.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
