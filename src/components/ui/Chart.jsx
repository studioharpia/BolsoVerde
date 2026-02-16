import * as React from "react"
import { ResponsiveContainer } from "recharts"
import { cn } from "../../services/utils"

const ChartContainer = React.forwardRef(({ className, children, config, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "w-full h-full [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
                className
            )}
            {...props}
        >
            <ResponsiveContainer width="100%" height="100%">
                {children}
            </ResponsiveContainer>
        </div>
    )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ active, payload, label, hideLabel = false }) => {
    if (!active || !payload?.length) return null

    return (
        <div className="rounded-lg border border-border bg-card p-2 shadow-sm">
            {!hideLabel && <div className="mb-1 text-[10px] uppercase text-muted-foreground">{label}</div>}
            <div className="flex flex-col gap-1">
                {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: item.color || item.fill }}
                        />
                        <span className="text-xs font-medium text-card-foreground">
                            {item.name}: {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { ChartContainer, ChartTooltip }
