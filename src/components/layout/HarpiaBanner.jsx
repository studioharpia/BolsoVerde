export const HarpiaBanner = () => {
    return (
        <a
            href="https://harpia.digital"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block group mb-4"
        >
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-center text-center transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] border-2 border-primary animate-pulse-border relative overflow-hidden group-hover:shadow-primary/20">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-sm md:text-base font-black tracking-tight leading-tight flex items-center gap-2">
                    <span className="shrink-0">💪🏼</span>
                    Este projeto é uma iniciativa 100% gratuita. Desenvolvida por <span className="underline decoration-2 underline-offset-4 decoration-white/30 group-hover:decoration-white transition-all">harpia.digital</span> 🦅
                </p>
            </div>
        </a>
    )
}
