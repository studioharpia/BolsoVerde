import * as React from "react"
import { cn } from "../../services/utils"

const EmptyState = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center animate-in fade-in-50 duration-500",
            className
        )}
        {...props}
    />
))
EmptyState.displayName = "EmptyState"

const EmptyStateIcon = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl bg-muted/50 mb-4",
            className
        )}
        {...props}
    />
))
EmptyStateIcon.displayName = "EmptyStateIcon"

const EmptyStateTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold tracking-tight mb-2", className)}
        {...props}
    />
))
EmptyStateTitle.displayName = "EmptyStateTitle"

const EmptyStateDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground max-w-[320px] mb-6", className)}
        {...props}
    />
))
EmptyStateDescription.displayName = "EmptyStateDescription"

const EmptyStateActions = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-wrap items-center justify-center gap-3", className)}
        {...props}
    />
))
EmptyStateActions.displayName = "EmptyStateActions"

export {
    EmptyState,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateDescription,
    EmptyStateActions,
}
