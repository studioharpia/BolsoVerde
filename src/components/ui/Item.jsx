import * as React from "react"
import { cn } from "../../services/utils"
import { ChevronRight } from "lucide-react"

const Item = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-all hover:bg-accent/5",
            className
        )}
        {...props}
    >
        {children}
    </div>
))
Item.displayName = "Item"

const ItemIcon = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground", className)}
        {...props}
    />
))
ItemIcon.displayName = "ItemIcon"

const ItemContent = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-1 flex-col gap-0.5", className)}
        {...props}
    />
))
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h4
        ref={ref}
        className={cn("text-sm font-semibold leading-none text-foreground", className)}
        {...props}
    />
))
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
ItemDescription.displayName = "ItemDescription"

const ItemAction = React.forwardRef(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("ml-auto flex items-center gap-2", className)}
        {...props}
    >
        {children}
    </div>
))
ItemAction.displayName = "ItemAction"

const ItemChevron = React.forwardRef(({ className, ...props }, ref) => (
    <ChevronRight
        ref={ref}
        className={cn("size-4 text-muted-foreground/50", className)}
        {...props}
    />
))
ItemChevron.displayName = "ItemChevron"

export {
    Item,
    ItemIcon,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemAction,
    ItemChevron
}
