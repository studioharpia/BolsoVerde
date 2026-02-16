import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../services/utils"

const Spinner = React.forwardRef(({ className, size = "md", ...props }, ref) => {
    const sizeMap = {
        xs: "size-3",
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-12"
    }

    return (
        <Loader2
            ref={ref}
            className={cn(
                "animate-spin text-muted-foreground/60",
                sizeMap[size] || sizeMap.md,
                className
            )}
            {...props}
        />
    )
})
Spinner.displayName = "Spinner"

export { Spinner }
