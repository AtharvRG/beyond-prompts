import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Prizes() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Reveal the header
        gsap.from(".prize-header", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });

        // Stagger the prize cards
        gsap.from(".prize-card", {
            scrollTrigger: {
                trigger: ".prize-grid",
                start: "top 75%",
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
        });

        // Subtle Parallax on the massive numbers
        gsap.to(".massive-number", {
            scrollTrigger: {
                trigger: ".prize-grid",
                start: "top bottom",
                end: "bottom top",
                scrub: 1, // Smooth scrubbing
            },
            y: -40, // Moves slightly up as you scroll down
            ease: "none",
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="prizes" className="w-full py-24 px-6 md:px-12 bg-bg-primary">
            <div className="max-w-[1400px] mx-auto">

                {/* Section Header */}
                <div className="prize-header mb-16 md:mb-24 border-b border-border-light pb-8">
                    <p className="font-sans text-accent uppercase tracking-widest text-xs font-semibold mb-4">
                        [ 02 // The Bounty ]
                    </p>
                    <h2 className="font-gambino text-5xl md:text-7xl uppercase tracking-tighter text-text-primary">
                        Rewards & <br />
                        <span className="font-serif italic font-light lowercase text-accent text-6xl md:text-8xl tracking-tight">Allocation.</span>
                    </h2>
                </div>

                {/* Massive Data Cards */}
                <div className="prize-grid grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

                    {/* Cash Prize Pool Card */}
                    <div className="prize-card bg-bg-secondary p-8 md:p-16 flex flex-col justify-between group overflow-hidden relative border border-border-light hover:border-text-primary/30 transition-colors duration-500 min-h-[50vh] md:min-h-[60vh]">
                        <div className="flex justify-between items-start mb-20 relative z-10">
                            <h3 className="font-gambino text-2xl md:text-3xl text-text-primary uppercase tracking-tighter w-1/2 leading-tight">
                                Cash <br /> Prize Pool
                            </h3>
                            {/* Minimalist Graphic Element */}
                            <div className="w-3 h-3 bg-accent rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <div className="pt-8 -mt-8">
                                <p className="massive-number font-serif italic font-light text-[22vw] lg:text-[14vw] leading-[0.8] text-text-primary tracking-tighter drop-shadow-sm">
                                    <span className="font-sans not-italic text-[12vw] lg:text-[8vw] align-top mr-2 text-accent">₹</span>3-5L
                                </p>
                            </div>
                            <p className="font-sans text-xs md:text-sm text-text-muted uppercase tracking-widest mt-8 font-medium">
                                Awarded to top finalists
                            </p>
                        </div>
                    </div>

                    {/* Sponsorship Card */}
                    <div className="prize-card bg-text-primary text-bg-primary p-8 md:p-16 flex flex-col justify-between group overflow-hidden relative border border-text-primary min-h-[50vh] md:min-h-[60vh]">
                        <div className="flex justify-between items-start mb-20 relative z-10">
                            <h3 className="font-gambino text-2xl md:text-3xl text-bg-secondary uppercase tracking-tighter w-1/2 leading-tight">
                                Total <br /> Sponsorship
                            </h3>
                            {/* Minimalist Graphic Element */}
                            <div className="w-12 h-[1px] bg-accent group-hover:w-24 transition-all duration-500 ease-out"></div>
                        </div>

                        <div className="relative z-10 mt-auto">
                            <div className="pt-8 -mt-8">
                                <p className="massive-number font-serif italic font-light text-[22vw] lg:text-[14vw] leading-[0.8] text-bg-primary tracking-tighter drop-shadow-sm">
                                    <span className="font-sans not-italic text-[12vw] lg:text-[8vw] align-top mr-2 text-accent">₹</span>10L
                                </p>
                            </div>
                            <p className="font-sans text-xs md:text-sm text-bg-secondary/70 uppercase tracking-widest mt-8 font-medium">
                                Partnership value & resources
                            </p>
                        </div>
                    </div>

                </div>

                {/* Global Banner / CTA */}
                <div className="prize-header mt-16 md:mt-24 border border-border-light p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-bg-secondary">
                    <div className="flex flex-col text-center md:text-left">
                        <h4 className="font-gambino text-2xl md:text-3xl text-text-primary uppercase tracking-tighter">Beyond Prompts</h4>
                        <span className="font-serif italic text-text-muted text-xl md:text-2xl mt-2">An exclusive, curated event.</span>
                    </div>
                    <a
                        href="https://forms.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-10 py-4 bg-text-primary text-bg-primary font-sans text-sm font-medium uppercase tracking-widest rounded-full hover:bg-accent hover:text-bg-primary transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                    >
                        Apply For Hackathon
                    </a>
                </div>

            </div>
        </section>
    );
}