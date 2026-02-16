import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../services/utils"

const typographyVariants = cva(
    "transition-colors",
    {
        variants: {
            variant: {
                h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
                h4: "scroll-m-20 text-xl font-semibold tracking-tight",
                p: "leading-7 [&:not(:first-child)]:mt-6",
                blockquote: "mt-6 border-l-2 pl-6 italic",
                lead: "text-xl text-muted-foreground",
                large: "text-lg font-semibold",
                small: "text-sm font-medium leading-none",
                muted: "text-sm text-muted-foreground",
                code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            },
        },
        defaultVariants: {
            variant: "p",
        },
    }
)

const Typography = React.forwardRef(({ className, variant, as, ...props }, ref) => {
    const Comp = as || (
        variant === 'h1' ? 'h1' :
            variant === 'h2' ? 'h2' :
                variant === 'h3' ? 'h3' :
                    variant === 'h4' ? 'h4' :
                        variant === 'code' ? 'code' :
                            variant === 'blockquote' ? 'blockquote' :
                                'p'
    )

    return (
        <Comp
            ref={ref}
            className={cn(typographyVariants({ variant, className }))}
            {...props}
        />
    )
})
Typography.displayName = "Typography"

export { Typography, typographyVariants }
