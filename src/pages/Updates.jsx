import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import { changelogEntries } from '../data/changelogData'
import { Badge } from '../components/ui/Badge'
import { Separator } from '../components/ui/Separator'

const typeConfig = {
    feature: { label: "Feature", variant: "default", color: "#3b82f6" }, // primary
    fix: { label: "Fix", variant: "destructive", color: "#ef4444" }, // destructive
    improvement: { label: "Improvement", variant: "secondary", color: "#f59e0b" }, // warning/secondary
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
                    // If the item has passed the "scrolled head" (startOffset)
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
        <div className="min-h-screen bg-background">
            <div className="container max-w-3xl mx-auto px-4 py-24">
                {/* Intro */}
                <section className="mb-20 text-center">
                    <h1 className="text-5xl font-bold tracking-tight mb-4 text-foreground">
                        Updates
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                        Acompanhe em tempo real a evolução do ecossistema e novas funcionalidades.
                    </p>
                </section>

                {/* Timeline Container */}
                <div className="relative pl-8 sm:pl-0" ref={timelineRef}>
                    {/* Background Line (Gray) */}
                    <div className="absolute left-[7px] sm:left-[111px] top-2 bottom-4 w-[2px] bg-border rounded-full" />

                    {/* Progress Line - Color matches current dot */}
                    <div
                        className="absolute left-[7px] sm:left-[111px] top-2 w-[2px] rounded-full transition-all duration-300 ease-out z-20"
                        style={{
                            height: `${progress * 100}%`,
                            maxHeight: 'calc(100% - 16px)',
                            backgroundColor: lineColor
                        }}
                    />

                    {sortedDates.map((date, dateIndex) => (
                        <div key={date} className="relative mb-16 last:mb-0">
                            {/* Date Label */}
                            <div className="sm:absolute sm:-left-44 sm:w-40 flex flex-col items-start sm:items-end pt-1 mb-4 sm:mb-0 text-foreground">
                                <span className="text-xs font-bold tabular-nums uppercase tracking-widest opacity-40 whitespace-nowrap">
                                    {formatDate(date)}
                                </span>
                            </div>

                            {/* Entries for this date */}
                            <div className="space-y-10">
                                {groupedEntries[date].map((entry, entryIndex) => {
                                    const config = typeConfig[entry.type] || typeConfig.feature
                                    // Calculate global index for refs
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
                                                    className="size-3 rounded-full ring-4 ring-background transition-colors duration-300"
                                                    style={{ backgroundColor: config.color }}
                                                />
                                            </div>

                                            {/* Content Card */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <h2 className="text-xl font-semibold text-foreground leading-tight">
                                                        {entry.title}
                                                    </h2>
                                                    <Badge variant={config.variant} className="text-[10px] h-5 shrink-0">
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
                                                    <div key={category} className="mb-4 last:mb-0">
                                                        <p className="text-sm font-bold text-foreground/80 mb-2">
                                                            {category}
                                                        </p>
                                                        <ul className="space-y-2">
                                                            {texts.map((text, i) => (
                                                                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                                                                    <span className="mt-2 size-1.5 rounded-full bg-border shrink-0" />
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

                {/* Footer */}
                <div className="mt-32 pt-16 border-t border-border/50 text-center">
                    <p className="text-sm text-muted-foreground">
                        BolsoVerde — Calculadora de Gastos Inteligente
                    </p>
                </div>
            </div>
        </div>
    )
}
