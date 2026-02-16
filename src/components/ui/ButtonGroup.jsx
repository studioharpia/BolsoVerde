import * as React from "react"
import { cn } from "../../services/utils"

const ButtonGroup = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "flex",
                orientation === "horizontal" ? "flex-row" : "flex-col",
                "rounded-lg border border-border overflow-hidden",
                "[&>button]:rounded-none [&>button]:border-none [&>button]:flex-1",
                orientation === "horizontal"
                    ? "[&>button:not(:last-child)]:border-r border-border"
                    : "[&>button:not(:last-child)]:border-b border-border",
                className
            )}
            {...props}
        />
    )
})
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
