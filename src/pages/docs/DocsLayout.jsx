import { Link, useLocation, Outlet } from 'react-router-dom'
import { cn } from '../../services/utils'
import { docsNavigation } from './docsNavigation'
import { Search, ChevronRight, Layout as LayoutIcon } from 'lucide-react'

export default function DocsLayout() {
    const { pathname } = useLocation()

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* Minimal Header */}
            <header className="h-14 border-b border-border bg-card/30 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                            <LayoutIcon className="size-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold tracking-tight">Jarvis <span className="text-muted-foreground font-normal">Docs</span></span>
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                        <input
                            type="text"
                            placeholder="Buscar na documentação..."
                            className="bg-muted/50 border border-border rounded-full pl-9 pr-4 py-1.5 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 bg-background border border-border rounded px-1.5 text-[10px] text-muted-foreground pointer-events-none">
                            /
                        </kbd>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 container max-w-[1400px] mx-auto">
                {/* Sidebar */}
                <aside className="w-64 shrink-0 border-r border-border py-8 pr-6 hidden md:block">
                    <nav className="flex flex-col gap-8 sticky top-24">
                        {docsNavigation.map((section) => (
                            <div key={section.title}>
                                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 px-3">
                                    {section.title}
                                </h3>
                                <ul className="flex flex-col gap-0.5">
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                to={item.href}
                                                className={cn(
                                                    "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all group",
                                                    pathname === item.href
                                                        ? "bg-primary/10 text-primary font-medium"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                                )}
                                            >
                                                {item.name}
                                                {pathname === item.href && <ChevronRight className="size-3" />}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 px-6 md:px-12 py-10 min-w-0">
                    <div className="max-w-4xl mx-auto">
                        <Outlet />
                    </div>
                </main>

                {/* Right TOC (Optional, added for visual fidelity to reference) */}
                <aside className="w-56 shrink-0 py-10 pl-6 hidden xl:block">
                    <div className="sticky top-24">
                        <h4 className="text-xs font-bold mb-4">NESTA PÁGINA</h4>
                        <ul className="text-xs space-y-3 text-muted-foreground border-l border-border pl-4">
                            <li className="hover:text-primary transition-colors cursor-pointer text-primary border-l-2 border-primary -ml-[17px] pl-[15px]">Visão Geral</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Objetivos</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Próximos Passos</li>
                        </ul>
                        <button className="mt-8 text-xs flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <ChevronRight className="size-3 rotate-[-90deg]" /> Voltar ao topo
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    )
}
