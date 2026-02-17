import * as React from 'react'
import {
    MessageSquare,
    Camera,
    Send,
    Loader2,
    CheckCircle2,
    User,
    Phone,
    Mail,
    AlertTriangle,
    RefreshCw
} from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/Dialog'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Textarea'
import { Label } from '../ui/Label'
import { Badge } from '../ui/Badge'
import { cn } from '../../services/utils'

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001')
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1500

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const sendWithRetry = async (payload) => {
    let lastError = null

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 15000)

            const response = await fetch(`${API_URL}/api/send-feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            })

            clearTimeout(timeout)

            const result = await response.json()

            if (result.success) return { success: true, id: result.id }

            lastError = result.error || 'Erro ao enviar feedback'
            if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt)
        } catch (error) {
            lastError = error.name === 'AbortError'
                ? 'Servidor demorou para responder'
                : error.message || 'Falha de conexão'
            if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt)
        }
    }

    return { success: false, error: lastError }
}

export const FeedbackModal = ({ open, onOpenChange, screenshot }) => {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [submitError, setSubmitError] = React.useState(null)
    const [errors, setErrors] = React.useState({})
    const [formData, setFormData] = React.useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    })

    React.useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setIsSuccess(false)
                setSubmitError(null)
                setErrors({})
                setFormData({ name: '', phone: '', email: '', message: '' })
            }, 300)
        }
    }, [open])

    const maskPhone = (value) => {
        if (!value) return ""
        value = value.replace(/\D/g, "")
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d{5})(\d)/, "$1-$2")
        return value.substring(0, 15)
    }

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const handlePhoneChange = (e) => {
        const maskedValue = maskPhone(e.target.value)
        setFormData({ ...formData, phone: maskedValue })
        if (errors.phone) setErrors({ ...errors, phone: false })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitError(null)

        const newErrors = {}
        if (!formData.name.trim()) newErrors.name = true
        if (formData.phone.length < 14) newErrors.phone = true
        if (!validateEmail(formData.email)) newErrors.email = true
        if (!formData.message.trim()) newErrors.message = true

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsSubmitting(true)

        console.log('[Feedback] Screenshot presente:', !!screenshot, screenshot ? `(${Math.round(screenshot.length / 1024)}KB)` : '')
        const result = await sendWithRetry({ ...formData, screenshot })

        if (result.success) {
            setIsSuccess(true)
            setTimeout(() => onOpenChange(false), 2000)
        } else {
            setSubmitError(result.error)
        }

        setIsSubmitting(false)
    }

    const handleRetry = () => {
        setSubmitError(null)
        handleSubmit(new Event('submit'))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] border-none bg-background/95 backdrop-blur-xl p-0 overflow-hidden rounded-[3rem] shadow-2xl">
                <div className="relative">
                    {/* Header */}
                    <div className="bg-primary p-8 text-primary-foreground relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 scale-150">
                            <MessageSquare size={120} />
                        </div>
                        <DialogHeader className="relative z-10 space-y-2">
                            <DialogTitle className="text-3xl font-black tracking-tight leading-none">
                                Enviar Feedback
                            </DialogTitle>
                            <DialogDescription className="text-primary-foreground/80 font-medium text-base">
                                Sua opinião ajuda o BolsoVerde a crescer.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    {isSuccess ? (
                        <div className="p-12 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <CheckCircle2 className="size-12" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black tracking-tight">Valeu pelo feedback!</h3>
                                <p className="text-muted-foreground font-medium">A mensagem foi enviada para nossa equipe.</p>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">

                            {submitError && (
                                <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 flex items-start gap-3">
                                    <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-bold text-destructive">Falha ao enviar</p>
                                        <p className="text-xs text-muted-foreground">{submitError}</p>
                                        <p className="text-xs text-muted-foreground">Verifique se o servidor está rodando (<code className="bg-secondary px-1 rounded">npm run dev</code> na raiz do projeto).</p>
                                    </div>
                                    <button type="button" onClick={handleRetry} className="text-destructive hover:text-destructive/80 transition-colors">
                                        <RefreshCw className="size-4" />
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-[10px]">
                                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">
                                        Nome <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <User className={cn("absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors", errors.name ? "text-destructive" : "text-muted-foreground")} />
                                        <Input
                                            id="name"
                                            placeholder="Seu nome"
                                            className={cn(
                                                "pl-12 rounded-2xl h-12 font-medium transition-all border",
                                                errors.name
                                                    ? "bg-destructive/10 border-destructive focus-visible:border-destructive animate-in shake-1"
                                                    : "bg-secondary/50 border-border hover:border-primary focus-visible:border-primary focus-visible:animate-pulse-border"
                                            )}
                                            value={formData.name}
                                            onChange={e => {
                                                setFormData({ ...formData, name: e.target.value })
                                                if (errors.name) setErrors({ ...errors, name: false })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-[10px]">
                                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">
                                        Telefone <span className="text-destructive">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Phone className={cn("absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors", errors.phone ? "text-destructive" : "text-muted-foreground")} />
                                        <Input
                                            id="phone"
                                            placeholder="(00) 00000-0000"
                                            className={cn(
                                                "pl-12 rounded-2xl h-12 font-medium transition-all border",
                                                errors.phone
                                                    ? "bg-destructive/10 border-destructive focus-visible:border-destructive"
                                                    : "bg-secondary/50 border-border hover:border-primary focus-visible:border-primary focus-visible:animate-pulse-border"
                                            )}
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-[10px]">
                                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">
                                    E-mail <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Mail className={cn("absolute left-4 top-1/2 -translate-y-1/2 size-4 transition-colors", errors.email ? "text-destructive" : "text-muted-foreground")} />
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="seu@email.com"
                                        className={cn(
                                            "pl-12 rounded-2xl h-12 font-medium transition-all border",
                                            errors.email
                                                ? "bg-destructive/10 border-destructive focus-visible:border-destructive"
                                                : "bg-secondary/50 border-border hover:border-primary focus-visible:border-primary focus-visible:animate-pulse-border"
                                        )}
                                        value={formData.email}
                                        onChange={e => {
                                            setFormData({ ...formData, email: e.target.value })
                                            if (errors.email) setErrors({ ...errors, email: false })
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-[10px]">
                                <Label htmlFor="message" className="text-xs font-black uppercase tracking-widest opacity-60 ml-1">
                                    Mensagem <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Textarea
                                        id="message"
                                        placeholder="Como podemos melhorar?"
                                        className={cn(
                                            "px-6 pt-3 rounded-3xl min-h-[120px] font-medium transition-all border resize-none focus-visible:ring-0",
                                            errors.message
                                                ? "bg-destructive/10 border-destructive focus-visible:border-destructive"
                                                : "bg-secondary/50 border-border hover:border-primary focus-visible:border-primary focus-visible:animate-pulse-border"
                                        )}
                                        value={formData.message}
                                        onChange={e => {
                                            setFormData({ ...formData, message: e.target.value })
                                            if (errors.message) setErrors({ ...errors, message: false })
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Preview do Print */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Anexo Automático</span>
                                    {screenshot && <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[10px]">Print Pronto</Badge>}
                                </div>
                                <div className="bg-secondary/50 rounded-3xl p-3 border border-dashed border-border flex items-center gap-4">
                                    <div className="size-16 rounded-xl bg-background overflow-hidden border border-border flex items-center justify-center shrink-0">
                                        {screenshot ? (
                                            <img src={screenshot} alt="Preview" className="w-full h-full object-cover opacity-60" />
                                        ) : (
                                            <Camera className="size-6 text-muted-foreground animate-pulse" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-xs font-bold text-foreground">Captura de tela</p>
                                        <p className="text-[10px] text-muted-foreground leading-tight italic">Vamos anexar um print da sua tela atual para nos ajudar a entender o contexto.</p>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 rounded-2xl font-black text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group transition-all"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        ENVIANDO...
                                    </>
                                ) : (
                                    <>
                                        ENVIAR FEEDBACK
                                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
