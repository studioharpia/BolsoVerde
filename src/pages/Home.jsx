import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Upload,
    PieChart as PieIcon,
    BarChart3,
    ShieldCheck,
    Zap,
    TrendingUp,
    Wallet,
    Trash2,
    RefreshCw,
    Star,
    ArrowUpRight,
    Users,
    Activity,
    Lock,
    CalendarDays,
    ArrowDownRight,
    ArrowUpLeft,
    Plus,
    Minus
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend
} from 'recharts'
import { ChartContainer } from '../components/ui/Chart'
import { parseFile } from '../services/fileParser'
import { summarizeData } from '../services/categorizer'

const formatBRL = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const Navbar = ({ reset }) => (
    <nav className="container mx-auto px-6 h-20 flex justify-between items-center absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <Wallet className="size-5 text-primary-foreground" />
            </div>
            BolsoVerde
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-muted-foreground">
            <Link to="/updates" className="hover:text-primary transition-colors">Updates</Link>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="ghost" className="rounded-full px-6 font-bold" onClick={reset}>
                Novo Cálculo
            </Button>
            <Button variant="outline" className="rounded-full px-6 font-bold border-2" onClick={() => window.location.href = '#'}>
                Como Funciona
            </Button>
        </div>
    </nav>
)

export default function Home() {
    const [status, setStatus] = useState('initial')
    const [fileName, setFileName] = useState('')
    const [dashboardData, setDashboardData] = useState({
        transactions: [],
        pieData: [],
        barData: [],
        barLabel: 'por dia',
        totalSpent: 0,
        totalReceived: 0,
        transactionCount: 0
    })

    useEffect(() => {
        if (status === 'completed') {
            const reportSection = document.getElementById('report-section')
            if (reportSection) {
                reportSection.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [status])

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        if (file) {
            setFileName(file.name)
            setStatus('processing')

            try {
                const rawTransactions = await parseFile(file)
                const summary = summarizeData(rawTransactions)

                setTimeout(() => {
                    setDashboardData(summary)
                    setStatus('completed')
                }, 1500)
            } catch (error) {
                console.error("Erro ao processar arquivo:", error)
                alert("Ops! Não conseguimos ler este arquivo.")
                setStatus('initial')
            }
        }
    }

    const reset = () => {
        setStatus('initial')
        setFileName('')
    }

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar reset={reset} />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="container mx-auto px-4 py-12">
                    <div className="bg-primary/5 rounded-[3.5rem] p-8 md:p-20 flex flex-col items-center text-center space-y-12 relative overflow-hidden border border-primary/10">
                        <div className="absolute -top-24 -right-24 size-64 bg-primary/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-24 -left-24 size-64 bg-emerald-500/5 rounded-full blur-3xl" />

                        <div className="space-y-6 max-w-4xl relative z-10">
                            <Badge className="rounded-full bg-primary/10 text-primary border-none px-4 py-1 font-bold text-xs uppercase tracking-widest">
                                Inteligência Financeira 2.0
                            </Badge>
                            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-balance">
                                Seus gastos sob controle <span className="text-primary italic">em 1 minuto.</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
                                Suba seu extrato e entenda cada centavo automaticamente.
                                Sem senhas bancárias, sem planilhas manuais.
                            </p>
                        </div>

                        {/* Upload Area */}
                        <div className="w-full max-w-xl relative group z-10 scale-100 hover:scale-[1.02] transition-transform duration-500">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-background rounded-[2.5rem] p-4 flex flex-col md:flex-row items-center gap-4 shadow-2xl border border-border">
                                <div className="flex-1 w-full relative">
                                    <input
                                        type="file"
                                        accept=".csv,.pdf"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-secondary/50 border border-dashed border-border group-hover:border-primary/50 transition-colors">
                                        <div className="size-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                                            <Upload className="size-6" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-foreground">Importar Extrato</p>
                                            <p className="text-xs text-muted-foreground">Arraste seu CSV ou PDF aqui</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full md:w-auto h-16 px-10 rounded-3xl font-black text-lg gap-2 shadow-xl shadow-primary/20">
                                    Analisar Grátis <ArrowUpRight className="size-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter"><ShieldCheck className="size-6" /> Segurança Bancária</div>
                            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter"><Lock className="size-6" /> 100% Privado</div>
                            <div className="flex items-center gap-2 font-bold text-xl tracking-tighter underline">Open Finance Ready</div>
                        </div>
                    </div>
                </section>

                {/* Processing State - Inline */}
                {status === 'processing' && (
                    <section className="container mx-auto px-6 py-20 flex flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in duration-500">
                        <div className="relative">
                            <div className="size-24 rounded-[2.5rem] bg-secondary flex items-center justify-center relative overflow-hidden">
                                <RefreshCw className="size-10 text-primary animate-spin" />
                            </div>
                            <div className="absolute -inset-4 border-2 border-dashed border-primary/20 rounded-[3rem] animate-[spin_10s_linear_infinite]" />
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-black tracking-tight">Processando seu extrato...</h2>
                            <p className="text-muted-foreground italic tracking-tight">Extraindo dados de: {fileName}</p>
                        </div>
                    </section>
                )}

                {/* Dashboard Section - Inline */}
                {status === 'completed' && (
                    <section id="report-section" className="container mx-auto px-6 py-20 space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
                        {/* Header do Relatório */}
                        <div className="bg-primary/5 rounded-[3rem] p-8 md:p-12 border border-primary/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Badge className="rounded-full bg-primary text-primary-foreground px-4 py-1 font-bold uppercase tracking-widest text-[10px]">Relatório Gerado</Badge>
                                    <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground hover:text-destructive font-bold rounded-full h-8 px-3">
                                        <Trash2 className="size-4 mr-2" /> Limpar
                                    </Button>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">Sua Saúde Financeira</h2>
                                <p className="text-muted-foreground text-lg italic">Resultados reais de: {fileName}</p>
                            </div>
                            <div className="flex gap-4 flex-wrap">
                                <div className="px-8 py-4 bg-background border rounded-[2rem] shadow-xl shadow-primary/5 text-center">
                                    <p className="text-[10px] text-muted-foreground uppercase font-black mb-1 leading-none tracking-widest opacity-50">Total Gasto</p>
                                    <p className="text-3xl font-black text-red-500 italic flex items-center gap-2">
                                        <ArrowDownRight className="size-5" />
                                        {formatBRL(dashboardData.totalSpent)}
                                    </p>
                                </div>
                                <div className="px-8 py-4 bg-background border rounded-[2rem] shadow-xl shadow-primary/5 text-center">
                                    <p className="text-[10px] text-muted-foreground uppercase font-black mb-1 leading-none tracking-widest opacity-50">Recebido</p>
                                    <p className="text-3xl font-black text-primary italic flex items-center gap-2">
                                        <ArrowUpLeft className="size-5" />
                                        {formatBRL(dashboardData.totalReceived)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 2 Gráficos lado a lado */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                            {/* Gráfico Pie - Categorias */}
                            <Card className="rounded-[2.5rem] overflow-hidden border-border bg-card shadow-2xl shadow-primary/5">
                                <CardHeader className="p-8 pb-0">
                                    <CardTitle className="text-xl font-black flex items-center gap-3">
                                        <PieIcon className="size-5 text-primary" />
                                        Categorias de Gasto
                                    </CardTitle>
                                    <CardDescription>Onde seu dinheiro está indo</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[380px] p-6 pt-2">
                                    <ChartContainer>
                                        <PieChart>
                                            <Pie
                                                data={dashboardData.pieData}
                                                cx="50%"
                                                cy="45%"
                                                innerRadius={70}
                                                outerRadius={110}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {dashboardData.pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} className="stroke-background stroke-[3px]" />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                content={({ active, payload }) => {
                                                    if (!active || !payload?.length) return null
                                                    return (
                                                        <div className="rounded-xl border bg-card p-3 shadow-lg">
                                                            <p className="text-xs font-black">{payload[0].name}</p>
                                                            <p className="text-sm font-bold text-primary">{formatBRL(payload[0].value)}</p>
                                                        </div>
                                                    )
                                                }}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={56}
                                                iconType="circle"
                                                formatter={(value) => <span className="text-xs font-bold text-foreground">{value}</span>}
                                            />
                                        </PieChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>

                            {/* Gráfico Bar - Volume Temporal */}
                            <Card className="rounded-[2.5rem] overflow-hidden border-border bg-card shadow-2xl shadow-primary/5">
                                <CardHeader className="p-8 pb-0">
                                    <CardTitle className="text-xl font-black flex items-center gap-3">
                                        <CalendarDays className="size-5 text-primary" />
                                        Volume de Gastos
                                    </CardTitle>
                                    <CardDescription>Gastos {dashboardData.barLabel}</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[380px] p-6 pt-2">
                                    <ChartContainer>
                                        <BarChart data={dashboardData.barData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                                            <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="hsl(var(--border))" />
                                            <XAxis
                                                dataKey="label"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                                                interval={dashboardData.barData.length > 15 ? Math.floor(dashboardData.barData.length / 8) : 0}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                                                tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`}
                                                width={50}
                                            />
                                            <RechartsTooltip
                                                content={({ active, payload, label }) => {
                                                    if (!active || !payload?.length) return null
                                                    return (
                                                        <div className="rounded-xl border bg-card p-3 shadow-lg">
                                                            <p className="text-xs font-black text-muted-foreground">{label}</p>
                                                            <p className="text-sm font-bold text-primary">{formatBRL(payload[0].value)}</p>
                                                        </div>
                                                    )
                                                }}
                                            />
                                            <Bar
                                                dataKey="valor"
                                                fill="hsl(var(--primary))"
                                                radius={[8, 8, 4, 4]}
                                                maxBarSize={40}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Listagem Full-Width */}
                        <Card className="rounded-[2.5rem] overflow-hidden border-border bg-card shadow-2xl shadow-primary/5">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-xl font-black flex items-center gap-3">
                                    <BarChart3 className="size-5 text-primary" />
                                    Extrato Detalhado
                                </CardTitle>
                                <CardDescription>{dashboardData.transactionCount} transações identificadas</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-8">
                                {/* Header da tabela */}
                                <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50 border-b border-border">
                                    <span>Descrição</span>
                                    <span className="w-24 text-center">Categoria</span>
                                    <span className="w-24 text-center">Data</span>
                                    <span className="w-28 text-right">Valor</span>
                                </div>
                                <div className="divide-y divide-border/50 max-h-[500px] overflow-y-auto">
                                    {dashboardData.transactions.map((t, i) => (
                                        <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 hover:bg-secondary/20 transition-colors">
                                            <span className="text-sm font-bold text-foreground truncate" title={t.description}>
                                                {t.description}
                                            </span>
                                            <span className="w-24 text-center">
                                                <Badge variant="outline" className="text-[10px] font-bold rounded-full px-2 py-0.5">
                                                    {t.category}
                                                </Badge>
                                            </span>
                                            <span className="w-24 text-center text-xs text-muted-foreground font-medium">
                                                {t.date}
                                            </span>
                                            <span className={`w-28 text-right text-sm font-black flex items-center justify-end gap-1 ${t.amount < 0 ? 'text-red-500' : 'text-primary'}`}>
                                                {t.amount < 0 ? <Minus className="size-3" /> : <Plus className="size-3" />}
                                                {formatBRL(Math.abs(t.amount))}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {/* Social Proof Numbers */}
                <section className="container mx-auto px-6 py-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {[
                            { label: "Usuários Ativos", val: "+50k", icon: Users },
                            { label: "Gastos Analisados", val: "R$ 15M+", icon: Activity },
                            { label: "Economia Gerada", val: "22%", icon: TrendingUp },
                            { label: "Avaliação App", val: "4.9/5", icon: Star },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-2 group">
                                <div className="size-12 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <stat.icon className="size-6" />
                                </div>
                                <div className="text-3xl font-black tracking-tighter">{stat.val}</div>
                                <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-50">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-secondary/30 py-32 rounded-t-[5rem]">
                    <div className="container mx-auto px-6 space-y-20 text-center md:text-left">
                        <div className="text-center space-y-4 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-balance">Por que escolher o BolsoVerde?</h2>
                            <p className="text-muted-foreground text-lg md:text-xl">Unimos tecnologia de ponta e simplicidade para você dominar suas finanças.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Smart Categorization", desc: "Nossa IA aprende com seus hábitos e categoriza automaticamente cada transação.", icon: Zap },
                                { title: "Zero Data Leak", desc: "Seus dados financeiros são processados localmente e nunca são vendidos.", icon: ShieldCheck },
                                { title: "Insight Dashboard", desc: "Visualize seus padrões de consumo com gráficos profissionais e intuitivos.", icon: BarChart3 },
                            ].map((feature, i) => (
                                <Card key={i} className="p-10 rounded-[2.5rem] border-none shadow-xl shadow-primary/5 hover:-translate-y-2 transition-transform duration-500 bg-card/50 backdrop-blur-sm">
                                    <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                        <feature.icon className="size-8" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">{feature.desc}</p>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="container mx-auto px-6 py-32">
                    <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-center text-primary-foreground space-y-8 relative overflow-hidden shadow-2xl shadow-primary/30">
                        <div className="absolute top-0 right-0 size-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">Comece a economizar <br />hoje mesmo.</h2>
                        <p className="text-primary-foreground/80 text-xl font-medium max-w-xl mx-auto">
                            Junte-se a milhares de pessoas que já transformaram sua relação com o dinheiro.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4 relative z-10">
                            <Button className="bg-white text-primary hover:bg-white/90 h-16 px-12 rounded-full font-black text-lg shadow-2xl">
                                Analisar meu CSV agora
                            </Button>
                            <Button variant="outline" className="border-white/20 hover:bg-white/10 h-16 px-12 rounded-full font-bold text-lg text-white">
                                Ver Tutorial
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 grayscale hover:opacity-100 transition-all">
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
                    <Wallet className="size-5 text-primary" /> BolsoVerde
                </div>
                <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest">
                    <Link to="#" className="hover:text-primary transition-colors">Politica de Privacidade</Link>
                    <Link to="#" className="hover:text-primary transition-colors">Termos de Uso</Link>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest">© 2026 BolsoVerde. Powered by Harpia IA.</p>
            </footer>
        </div>
    )
}
