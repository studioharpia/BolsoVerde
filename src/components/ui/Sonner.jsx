import { Toaster as Sonner } from "sonner"
import { cn } from "../../services/utils"

const Toaster = ({
    ...props
}) => {
    return (
        <Sonner
            theme="light"
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl group-[.toaster]:p-4",
                    description: "group-[.toast]:text-muted-foreground group-[.toast]:text-xs",
                    actionButton:
                        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:font-medium",
                    cancelButton:
                        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-md group-[.toast]:px-2 group-[.toast]:py-1 group-[.toast]:text-xs",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }
