import { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toJpeg } from 'html-to-image'
import { Wallet, ArrowLeft, MessageSquarePlus } from 'lucide-react'
import { Button } from '../ui/Button'
import { FeedbackModal } from '../modals/FeedbackModal'

export const Navbar = () => {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
    const [screenshot, setScreenshot] = useState(null)

    const handleFeedbackClick = useCallback(async () => {
        try {
            // Pequeno delay para garantir renderização
            await new Promise(r => setTimeout(r, 100))

            const dataUrl = await toJpeg(document.body, {
                quality: 0.8,
                pixelRatio: 1,
                skipAutoScale: true
            })
            setScreenshot(dataUrl)
        } catch (err) {
            console.error('Erro ao capturar tela:', err)
            setScreenshot(null)
        }
        setIsFeedbackOpen(true)
    }, [])

    const handleModalClose = useCallback((open) => {
        setIsFeedbackOpen(open)
        if (!open) {
            setTimeout(() => setScreenshot(null), 300)
        }
    }, [])

    return (
        <nav className="container mx-auto px-6 h-auto sm:h-20 py-6 sm:py-0 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 relative z-50">
            <Link
                to="/"
                className="flex items-center gap-2 font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity order-1"
            >
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                    <Wallet className="size-5 text-primary-foreground" />
                </div>
                BolsoVerde
            </Link>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 w-full sm:w-auto order-2">
                {isHome ? (
                    <>
                        <Button
                            onClick={handleFeedbackClick}
                            className="rounded-full px-5 font-black text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 flex items-center gap-2 h-10 order-1 sm:order-2 w-full sm:w-auto justify-center"
                        >
                            <MessageSquarePlus className="size-4" />
                            <span>Enviar feedback</span>
                        </Button>

                        <Link
                            to="/updates"
                            className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group order-2 sm:order-1"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Atualizações
                        </Link>
                    </>
                ) : (
                    <Link to="/">
                        <Button variant="ghost" className="rounded-full px-6 font-bold flex items-center gap-2 group">
                            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                            Voltar para Home
                        </Button>
                    </Link>
                )}
            </div>

            <FeedbackModal
                open={isFeedbackOpen}
                onOpenChange={handleModalClose}
                screenshot={screenshot}
            />
        </nav>
    )
}
