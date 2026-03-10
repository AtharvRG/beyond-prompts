import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MobileHeroBackground from './MobileHeroBackground';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 1.2 });

        tl.from(".hero-title-line", {
            y: 150,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            transformOrigin: "bottom left"
        })
            .from(".hero-fade", {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.6");
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-[100dvh] flex flex-col justify-center px-6 md:px-12 pt-24 pb-12 overflow-hidden">

            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-60">
                <MobileHeroBackground
                    color="#8C3A2A"
                    dotSize={6}
                    speed={0.06}
                    edgeFade={0.18}
                />
            </div>


            {/* Content (z-10 ensures it sits above the canvas) */}
            <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-12 pointer-events-none">

                {/* Left Side: Massive Typography */}
                <div className="flex flex-col w-full md:w-2/3 pointer-events-auto">
                    <div className="hero-fade mb-6 md:mb-10 flex items-center gap-3 font-sans text-xs md:text-sm uppercase tracking-widest text-accent font-semibold">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                        Filter for the Outliers
                    </div>

                    <h1 className="flex flex-col gap-0 md:gap-2">
                        <div className="overflow-hidden pt-6 -mt-6 pb-2">
                            <div className="hero-title-line font-gambino text-[12vw] md:text-[8vw] leading-[0.85] uppercase tracking-tighter text-text-primary">
                                Beyond
                            </div>
                        </div>
                        <div className="overflow-hidden pt-6 -mt-6 pb-4 md:pb-8">
                            <div className="hero-title-line font-serif italic font-light text-[13vw] md:text-[9vw] leading-[0.85] lowercase tracking-tight text-accent ml-0 md:ml-12">
                                prompts.
                            </div>
                        </div>
                    </h1>
                </div>

                {/* Right Side: Details & CTA */}
                <div className="w-full md:w-1/3 flex flex-col justify-end pb-2 md:pb-8 pointer-events-auto">
                    {/* The Glassmorphic Editorial Box */}
                    <div className="hero-fade bg-bg-primary/85 dark:bg-bg-secondary/85 backdrop-blur-md border border-border-light p-8 md:p-10 shadow-2xl">
                        <p className="font-sans text-base md:text-lg text-text-muted leading-relaxed mb-8 max-w-sm">
                            48 hours of pure, undistracted agentic building. This is an exclusive, highly curated, and fiercely competitive crucible.
                        </p>

                        <div className="flex flex-col gap-4 border-t border-border-light pt-6">
                            <div className="flex justify-between items-center font-sans text-sm uppercase tracking-widest">
                                <span className="text-text-muted">Dates</span>
                                <span className="font-semibold text-text-primary">10 – 12 April 2026</span>
                            </div>
                            <div className="flex justify-between items-center font-sans text-sm uppercase tracking-widest">
                                <span className="text-text-muted">Capacity</span>
                                <span className="font-semibold text-text-primary">60 + 10 Buffer</span>
                            </div>
                            <div className="flex justify-between items-center font-sans text-sm uppercase tracking-widest">
                                <span className="text-text-muted">Prize Pool</span>
                                <span className="font-semibold text-text-primary">₹ 3,00,000</span>
                            </div>
                            <div className="flex justify-between items-center font-sans text-sm uppercase tracking-widest">
                                <span className="text-text-muted">Format</span>
                                <span className="font-semibold text-text-primary">Full Residential</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}