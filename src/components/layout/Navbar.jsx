import { Link, useLocation } from 'react-router-dom'
import { Wallet, ArrowLeft } from 'lucide-react'
import { Button } from '../ui/Button'

export const Navbar = () => {
    const location = useLocation()
    const isHome = location.pathname === '/'

    return (
        <nav className="container mx-auto px-6 h-20 flex justify-between items-center relative z-50">
            <Link to="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                    <Wallet className="size-5 text-primary-foreground" />
                </div>
                BolsoVerde
            </Link>

            <div className="flex items-center gap-6">
                {isHome ? (
                    <Link to="/updates" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Atualizações
                    </Link>
                ) : (
                    <Link to="/">
                        <Button variant="ghost" className="rounded-full px-6 font-bold flex items-center gap-2 group">
                            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                            Voltar para Home
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    )
}
