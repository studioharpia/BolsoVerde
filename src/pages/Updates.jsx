import { useState, useEffect, useRef } from 'react'
import { changelogEntries } from '../data/changelogData'
import { Badge } from '../components/ui/Badge'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { HarpiaBanner } from '../components/layout/HarpiaBanner'

const typeConfig = {
    feature: { label: "Feature", variant: "default", color: "#10b981" }, // emerald
    fix: { label: "Fix", variant: "destructive", color: "#ef4444" }, // destructive
    improvement: { label: "Improvement", variant: "secondary", color: "#3b82f6" }, // blue
    breaking: { label: "Breaking", variant: "outline", color: "#71717a" }, // neutral
}

function formatDate(dateStr) {
    const date = new Date(dateStr + "T12:00:00")
    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

// Group entries by date
const groupedEntries = changelogEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = []
    acc[entry.date].push(entry)
    return acc
}, {})

const sortedDates = Object.keys(groupedEntries).sort((a, b) => new Date(b) - new Date(a))

export default function Updates() {
    const [progress, setProgress] = useState(0)
    const [lineColor, setLineColor] = useState(typeConfig.feature.color)
    const timelineRef = useRef(null)
    const itemRefs = useRef([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const updateProgress = () => {
            if (!timelineRef.current) return

            const rect = timelineRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight

            // Progress start/end logic
            const startOffset = windowHeight * 0.5
            const timelineHeight = rect.height
            const scrolledHeight = startOffset - rect.top

            const p = Math.max(0, Math.min(1, scrolledHeight / timelineHeight))
            setProgress(p)

            // Find current active color based on scrolled entries
            let currentActiveColor = lineColor
            itemRefs.current.forEach((ref) => {
                if (ref) {
                    const itemRect = ref.getBoundingClientRect()
                    if (itemRect.top < startOffset) {
                        currentActiveColor = ref.dataset.color
                    }
                }
            })
            setLineColor(currentActiveColor)
        }

        window.addEventListener('scroll', updateProgress)
        setTimeout(updateProgress, 100)

        return () => window.removeEventListener('scroll', updateProgress)
    }, [lineColor])

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
                                Evolução Contínua
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-balance">
                                Notas de <span className="text-primary italic">Atualização.</span>
                            </h1>
                            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-medium">
                                Acompanhe todas as melhorias e novidades que preparamos para você dominar suas finanças.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container max-w-4xl mx-auto px-6 py-20">
                    {/* Timeline Container */}
                    <div className="relative pl-8 sm:pl-0" ref={timelineRef}>
                        {/* Background Line */}
                        <div className="absolute left-[7px] sm:left-[111px] top-2 bottom-4 w-[2px] bg-border/50 rounded-full" />

                        {/* Progress Line */}
                        <div
                            className="absolute left-[7px] sm:left-[111px] top-2 w-[2px] rounded-full transition-all duration-300 ease-out z-20"
                            style={{
                                height: `${progress * 100}%`,
                                maxHeight: 'calc(100% - 16px)',
                                backgroundColor: lineColor
                            }}
                        />

                        {sortedDates.map((date) => (
                            <div key={date} className="relative mb-24 last:mb-0">
                                {/* Date Label */}
                                <div className="sm:absolute sm:-left-44 sm:w-40 flex flex-col items-start sm:items-end pt-1 mb-6 sm:mb-0 text-foreground">
                                    <span className="text-xs font-black tabular-nums uppercase tracking-[0.2em] opacity-30 whitespace-nowrap">
                                        {formatDate(date)}
                                    </span>
                                </div>

                                {/* Entries for this date */}
                                <div className="space-y-16">
                                    {groupedEntries[date].map((entry, entryIndex) => {
                                        const config = typeConfig[entry.type] || typeConfig.feature
                                        const globalIndex = changelogEntries.findIndex(e => e === entry)

                                        return (
                                            <div
                                                key={entryIndex}
                                                className="relative pl-4 sm:pl-36 group"
                                                ref={el => itemRefs.current[globalIndex] = el}
                                                data-color={config.color}
                                            >
                                                {/* Dot on the timeline */}
                                                <div className="absolute left-[-29px] sm:left-[106px] top-1.5 z-30">
                                                    <div
                                                        className="size-3 rounded-full ring-8 ring-background transition-colors duration-500 shadow-sm"
                                                        style={{ backgroundColor: config.color }}
                                                    />
                                                </div>

                                                {/* Content Card */}
                                                <div className="flex-1 min-w-0 bg-card/40 backdrop-blur-sm border border-border/50 rounded-[2rem] p-8 hover:bg-card/60 transition-colors shadow-sm">
                                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                                        <h2 className="text-2xl font-black text-foreground leading-tight tracking-tight">
                                                            {entry.title}
                                                        </h2>
                                                        <Badge variant={config.variant} className="text-[10px] font-black uppercase tracking-widest px-3 h-5 shrink-0 border-none shadow-sm" style={{ backgroundColor: config.variant === 'default' ? config.color : undefined }}>
                                                            {config.label}
                                                        </Badge>
                                                    </div>

                                                    {/* Group items by category */}
                                                    {Object.entries(
                                                        entry.items.reduce((acc, item) => {
                                                            if (!acc[item.category]) acc[item.category] = []
                                                            acc[item.category].push(item.text)
                                                            return acc
                                                        }, {})
                                                    ).map(([category, texts]) => (
                                                        <div key={category} className="mb-6 last:mb-0">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <span className="size-1.5 rounded-full bg-primary" />
                                                                <p className="text-xs font-black uppercase tracking-widest text-primary/80">
                                                                    {category}
                                                                </p>
                                                            </div>
                                                            <ul className="space-y-3">
                                                                {texts.map((text, i) => (
                                                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed font-medium">
                                                                        <span className="mt-2.5 size-1 rounded-full bg-border shrink-0" />
                                                                        <span>{text}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

