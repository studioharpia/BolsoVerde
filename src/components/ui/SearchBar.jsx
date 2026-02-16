import * as React from "react"
import { Search } from "lucide-react"
import { cn } from "../../services/utils"

const SearchBar = React.forwardRef(({ className, icon: Icon = Search, results, ...props }, ref) => {
    return (
        <div className={cn("relative flex items-center w-full", className)}>
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground/60">
                <Icon className="size-4" />
            </div>
            <input
                ref={ref}
                type="text"
                className={cn(
                    "flex h-10 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm shadow-sm transition-all placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    results && "pr-24", // Make space for the results text
                    className
                )}
                {...props}
            />
            {results && (
                <div className="absolute right-4 flex items-center pointer-events-none text-xs text-muted-foreground/70 font-medium">
                    {results}
                </div>
            )}
        </div>
    )
})
SearchBar.displayName = "SearchBar"

export { SearchBar }
