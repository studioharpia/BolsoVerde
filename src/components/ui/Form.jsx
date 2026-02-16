import * as React from "react"
import { cn } from "../../services/utils"
import { Label } from "./Label"

const FormItem = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
    <Label
        ref={ref}
        className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
        {...props}
    />
))
FormLabel.displayName = "FormLabel"

const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-xs text-muted-foreground", className)}
        {...props}
    />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-xs font-medium text-destructive", className)}
        {...props}
    >
        {children}
    </p>
))
FormMessage.displayName = "FormMessage"

export {
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
}
