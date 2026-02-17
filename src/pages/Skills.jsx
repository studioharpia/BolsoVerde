import { Link } from 'react-router-dom'
import {
    Brain,
    Code2,
    ShieldCheck,
    Cloud,
    Cpu,
    CheckCircle2,
    ChevronLeft,
    Search,
    Zap,
    Layout,
    Server,
    Database,
    Terminal,
    Bug,
    LineChart
} from 'lucide-react'

const SKILL_CATEGORIES = [
    {
        title: "Frontend & UI",
        icon: <Layout className="size-6 text-blue-500" />,
        color: "bg-blue-500/10",
        skills: ["React Expert", "Next.js Performance", "Tailwind Design", "Web Design Guidelines"]
    },
    {
        title: "Backend & API",
        icon: <Server className="size-6 text-orange-500" />,
        color: "bg-orange-500/10",
        skills: ["Node.js Best Practices", "API Design", "Python Patterns", "FastAPI"]
    },
    {
        title: "Security & Audit",
        icon: <ShieldCheck className="size-6 text-red-500" />,
        color: "bg-red-500/10",
        skills: ["Vulnerability Scanner", "Red Team Tactics", "Security Auditing", "Secrets Protection"]
    },
    {
        title: "Infra & Cloud",
        icon: <Cloud className="size-6 text-sky-500" />,
        color: "bg-sky-500/10",
        skills: ["Docker Expert", "CI/CD Pipelines", "Server Management", "Deployment Procedures"]
    },
    {
        title: "Testing & Quality",
        icon: <CheckCircle2 className="size-6 text-emerald-500" />,
        color: "bg-emerald-500/10",
        skills: ["Webapp Testing", "TDD Workflow", "Testing Patterns", "Playwright Expert"]
    },
    {
        title: "Data & Systems",
        icon: <Database className="size-6 text-indigo-500" />,
        color: "bg-indigo-500/10",
        skills: ["Database Design", "Prisma Expert", "Schema Validation", "Performance Profiling"]
    }
]

export default function Skills() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors gap-2">
                            <ChevronLeft className="size-4" />
                            Voltar para Home
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                <Brain className="size-6 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black tracking-tight uppercase">IA Nucleus</h1>
                                <p className="text-muted-foreground">Explorando as capacidades expandidas do Jarvis</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card">
                        <Zap className="size-4 text-orange-500 animate-pulse" />
                        <span className="text-sm font-medium">133 Skills Habilitadas</span>
                    </div>
                </div>

                {/* Search Bar Placeholder (Visual Only) */}
                <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Pesquisar por uma habilidade específica..."
                        className="w-full pl-12 pr-4 py-4 rounded-3xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                </div>

                {/* Grid Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SKILL_CATEGORIES.map((category, idx) => (
                        <div key={idx} className="group p-6 rounded-3xl border border-border bg-card hover:border-primary/20 transition-all space-y-6">
                            <div className="flex items-center gap-4">
                                <div className={`size-12 rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold">{category.title}</h3>
                            </div>

                            <div className="space-y-2">
                                {category.skills.map((skill, sIdx) => (
                                    <div key={sIdx} className="flex items-center gap-3 text-sm text-muted-foreground p-2 rounded-xl hover:bg-accent transition-colors">
                                        <div className="size-1.5 rounded-full bg-primary/40" />
                                        {skill}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border border-dashed border-border rounded-xl hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center gap-2">
                                <Terminal className="size-3" />
                                Ver Comandos CLI
                            </button>
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="p-8 rounded-3xl border border-dashed border-border bg-accent/30 flex flex-col md:flex-row items-center gap-8 justify-between">
                    <div className="flex items-center gap-6">
                        <div className="size-16 rounded-full border border-border bg-card flex items-center justify-center p-4">
                            <Cpu className="size-8 text-muted-foreground" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">Arquitetura Agêntica</h4>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                Minhas habilidades são baseadas no Antigravity Kit v4, permitindo orquestração multi-agente e automação de ponta a ponta.
                            </p>
                        </div>
                    </div>
                    <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
                        Atualizar Skills
                    </button>
                </div>
            </div>
        </div>
    )
}
