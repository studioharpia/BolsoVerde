import { Link, useLocation, Outlet } from 'react-router-dom'
import { cn } from '../../services/utils'
import { navigation } from './navigation'

export default function StyleguideLayout() {
    const { pathname } = useLocation()

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-card p-6 flex flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto">
                <div>
                    <Link to="/styleguide" className="text-xl font-bold text-primary">
                        Keystone DS
                    </Link>
                </div>

                <nav className="flex flex-col gap-6">
                    {navigation.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                {section.title}
                            </h3>
                            <ul className="flex flex-col gap-1">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            to={item.href}
                                            className={cn(
                                                "block px-3 py-2 rounded-md text-sm transition-colors",
                                                pathname === item.href
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-accent hover:text-accent-foreground"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 ml-64 p-10 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}
