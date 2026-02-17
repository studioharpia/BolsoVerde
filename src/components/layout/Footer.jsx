import { Link } from 'react-router-dom'
import { Wallet } from 'lucide-react'

export const Footer = () => {
    return (
        <footer className="container mx-auto px-6 py-12 flex flex-col items-center gap-8 opacity-40 grayscale hover:opacity-100 transition-all border-t border-border/10 mt-20">
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
                <div className="size-6 rounded-md bg-primary flex items-center justify-center">
                    <Wallet className="size-4 text-primary-foreground" />
                </div>
                BolsoVerde
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
                <Link to="#" className="hover:text-primary transition-colors">Política de Privacidade</Link>
                <Link to="#" className="hover:text-primary transition-colors">Termos de Uso</Link>
                <Link to="#" className="hover:text-primary transition-colors">Contato</Link>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">© 2026 BolsoVerde. Powered by Harpia IA.</p>
        </footer>
    )
}
