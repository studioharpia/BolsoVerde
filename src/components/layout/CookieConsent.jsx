import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ChevronRight } from 'lucide-react'

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Permitir reset via URL para facilitar testes: ?resetCookies=true
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.get('resetCookies') === 'true') {
            localStorage.removeItem('bolsoverde-cookie-consent')
            window.location.search = '' // Limpa o parâmetro e recarrega
            return
        }

        const consent = localStorage.getItem('bolsoverde-cookie-consent')
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('bolsoverde-cookie-consent', 'true')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-8 left-0 right-0 z-[100] animate-in fade-in slide-in-from-bottom-8 duration-700 pointer-events-none">
            <div className="container mx-auto px-6 pointer-events-auto">
                <Card className="bg-background/80 backdrop-blur-xl border-primary/10 shadow-2xl p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden group w-full">
                    <div className="absolute -top-24 -right-24 size-96 bg-primary/5 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
                        <div className="space-y-2 flex-1 text-center md:text-left">
                            <h3 className="font-black text-lg md:text-xl tracking-tight">Nós usamos cookies 🍪</h3>
                            <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed font-medium max-w-3xl">
                                Para melhorar sua experiência no BolsoVerde, usamos cookies para análise e personalização.
                                Fique tranquilo: seus dados financeiros são processados localmente e nunca saem do seu navegador.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                            <Button
                                onClick={handleAccept}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 h-10 md:h-12 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 w-full md:min-w-[180px]"
                            >
                                Aceitar Tudo
                            </Button>
                            <Link
                                to="/privacy"
                                className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                            >
                                Política de Privacidade <ChevronRight className="size-3" />
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
