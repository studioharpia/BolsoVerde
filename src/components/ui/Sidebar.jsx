import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, PanelLeft } from "lucide-react"
import { cn } from "../../services/utils"

// Context for sidebar state
const SidebarContext = React.createContext(null)

function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

const SidebarProvider = React.forwardRef(({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    children,
    ...props
}, ref) => {
    const [open, setOpen] = React.useState(defaultOpen)

    const toggleSidebar = React.useCallback(() => {
        setOpen((prev) => !prev)
    }, [])

    return (
        <SidebarContext.Provider value={{ open, toggleSidebar }}>
            <div
                ref={ref}
                className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
                {...props}
            >
                {children}
            </div>
        </SidebarContext.Provider>
    )
})
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef(({ className, children, ...props }, ref) => {
    const { open } = useSidebar()

    return (
        <div
            ref={ref}
            className={cn(
                "relative flex h-full flex-col bg-card/50 border-r border-border transition-all duration-300 ease-in-out",
                open ? "w-64" : "w-20",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
Sidebar.displayName = "Sidebar"

const SidebarHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col gap-2 p-4", className)} {...props} />
)
const SidebarContent = ({ className, ...props }) => (
    <div className={cn("flex-1 overflow-auto py-2", className)} {...props} />
)
const SidebarFooter = ({ className, ...props }) => (
    <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)

const SidebarSection = ({ title, children, className }) => {
    const { open } = useSidebar()
    return (
        <div className={cn("px-4 py-2", className)}>
            {open && title && <h3 className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">{title}</h3>}
            <div className="flex flex-col gap-1">
                {children}
            </div>
        </div>
    )
}

const SidebarItem = React.forwardRef(({
    icon: Icon,
    label,
    active,
    className,
    children,
    hasSubmenu,
    ...props
}, ref) => {
    const { open } = useSidebar()

    return (
        <div className="group relative">
            <button
                ref={ref}
                className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-all hover:bg-accent/50 hover:text-accent-foreground",
                    active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                    !open && "justify-center",
                    className
                )}
                {...props}
            >
                {Icon && <Icon className="size-4 shrink-0" />}
                {open && <span className="flex-1 truncate text-left">{label}</span>}
                {open && hasSubmenu && <ChevronRight className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5" />}
            </button>
            {children}
        </div>
    )
})
SidebarItem.displayName = "SidebarItem"

const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()
    return (
        <button
            ref={ref}
            onClick={toggleSidebar}
            className={cn("flex size-8 items-center justify-center rounded-md hover:bg-accent", className)}
            {...props}
        >
            <PanelLeft className="size-4" />
        </button>
    )
})
SidebarTrigger.displayName = "SidebarTrigger"

export {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarSection,
    useSidebar
}
