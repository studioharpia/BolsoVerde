import { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas'
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
            const canvas = await html2canvas(document.body, {
                scale: 0.5,
                logging: false,
                useCORS: true
            })
            setScreenshot(canvas.toDataURL('image/jpeg', 0.8))
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
        <nav className="container mx-auto px-6 h-20 flex justify-between items-center relative z-50">
            <Link to="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter hover:opacity-80 transition-opacity">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                    <Wallet className="size-5 text-primary-foreground" />
                </div>
                BolsoVerde
            </Link>

            <div className="flex items-center gap-4 md:gap-8">
                {isHome ? (
                    <>
                        <Link to="/updates" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Atualizações
                        </Link>

                        <Button
                            onClick={handleFeedbackClick}
                            className="rounded-full px-5 font-black text-xs uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 flex items-center gap-2 h-10"
                        >
                            <MessageSquarePlus className="size-4" />
                            <span className="hidden sm:inline">Enviar feedback</span>
                            <span className="sm:hidden">Feedback</span>
                        </Button>
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
