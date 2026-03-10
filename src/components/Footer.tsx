export default function Footer() {
    return (
        <footer className="relative z-50 w-full bg-text-primary text-bg-primary pt-24 pb-12 px-6 md:px-12 flex flex-col items-center overflow-hidden">
            <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center">

                {/* Final CTA */}
                <div className="text-center mb-24">
                    <p className="font-serif italic text-2xl md:text-3xl text-bg-secondary/70 mb-8">
                        Ready to bend reality?
                    </p>
                    <a
                        href="https://forms.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-12 py-5 bg-accent text-bg-primary font-sans text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-bg-primary hover:text-text-primary transition-all duration-300 transform hover:scale-105 inline-block"
                    >
                        Apply For Hackathon
                    </a>
                </div>

                {/* Massive Branding */}
                <div className="w-full flex justify-center items-center border-b border-bg-secondary/20 pb-12 mb-12">
                    <h1 className="font-gambino text-[18vw] leading-[0.75] uppercase tracking-tighter text-bg-primary text-center">
                        Beyond<span className="text-accent">.</span>
                    </h1>
                </div>

                {/* Bottom Bar */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 font-sans text-xs uppercase tracking-widest text-bg-secondary/50">
                    <p>© 2026 BEYOND PROMPTS.</p>
                    <div className="flex gap-8">
                        <a href="https://www.instagram.com/beyondprompts_?igsh=YXk4aHA3dzdvaXgy&utm_source=qr" className="hover:text-bg-primary transition-colors">Instagram</a>
                        <a href="https://x.com/beyondprompts_?s=21" className="hover:text-bg-primary transition-colors">Twitter / X</a>
                        <a href="mailto:[beyondprompts.official@gmail.com]" className="hover:text-bg-primary transition-colors">Email</a>
                        <a href="https://www.youtube.com/@BeyondPromptsOfficial" className="hover:text-bg-primary transition-colors">Youtube</a>
                    </div>
                </div>

            </div>
        </footer>
    );
}