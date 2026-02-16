import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, Clock, Server, Database, ShieldCheck, Cpu } from 'lucide-react'
import { Badge } from '../components/ui/Badge'

const systems = [
    {
        name: "Security & Authentication",
        status: "operational",
        uptime: "100%",
        description: "No current issues.",
        icon: ShieldCheck,
        history: Array.from({ length: 40 }, () => Math.random() > 0.05 ? 'up' : 'minor')
    },
    {
        name: "API Layer",
        status: "operational",
        uptime: "99.98%",
        description: "Normal latency.",
        icon: Cpu,
        history: Array.from({ length: 40 }, () => Math.random() > 0.1 ? 'up' : (Math.random() > 0.5 ? 'minor' : 'down'))
    },
    {
        name: "PostgreSQL Database",
        status: "operational",
        uptime: "100%",
        description: "Connected & Synced.",
        icon: Database,
        history: Array.from({ length: 40 }, () => 'up')
    },
    {
        name: "Asset Storage",
        status: "maintenance",
        uptime: "98.5%",
        description: "Scheduled upgrade in progress.",
        icon: Server,
        history: Array.from({ length: 40 }, (_, i) => i > 35 ? 'maintenance' : 'up')
    }
]

export default function Status() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 sm:p-12 lg:p-20">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex flex-col gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit group"
                    >
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        Voltar ao Início
                    </Link>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black tracking-tight">Status do Sistema</h1>
                            <p className="text-muted-foreground">Monitoramento em tempo real da infraestrutura Jarvis IA.</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium animate-pulse">
                            <CheckCircle2 className="size-4" />
                            Alguns sistemas em manutenção
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {systems.map((system) => (
                        <div key={system.name} className="p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-sm space-y-6 hover:border-primary/20 transition-all group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <system.icon className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{system.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-muted-foreground">Uptime: {system.uptime}</span>
                                            <span className="text-muted-foreground/30">•</span>
                                            <span className="text-xs text-muted-foreground">{system.description}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge
                                    variant={system.status === 'operational' ? 'default' : system.status === 'maintenance' ? 'secondary' : 'destructive'}
                                    className="capitalize"
                                >
                                    {system.status}
                                </Badge>
                            </div>

                            {/* Uptime Bar Graph */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    <span>Histórico de 90 dias</span>
                                    <span>100% Estável</span>
                                </div>
                                <div className="flex gap-1 h-8 items-end">
                                    {system.history.map((state, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-full transition-all hover:scale-y-125 cursor-help ${state === 'up' ? 'h-6 bg-emerald-500/40 hover:bg-emerald-500' :
                                                    state === 'minor' ? 'h-4 bg-amber-500/40 hover:bg-amber-500' :
                                                        state === 'maintenance' ? 'h-5 bg-blue-500/40 hover:bg-blue-500' :
                                                            'h-3 bg-destructive/40 hover:bg-destructive'
                                                }`}
                                            title={state === 'up' ? 'Operacional' : state === 'minor' ? 'Instabilidade' : 'Fora do ar'}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground/40 font-medium">
                                    <span>90 dias atrás</span>
                                    <span>Hoje</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="p-8 rounded-3xl border border-dashed border-border flex flex-col sm:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4 text-sm">
                        <Clock className="size-5" />
                        <span>Última verificação: <span className="font-bold">há 2 minutos</span></span>
                    </div>
                    <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-emerald-500" /> Operacional
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-amber-500" /> Degradado
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-blue-500" /> Manutenção
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
