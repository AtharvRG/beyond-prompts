import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Structure() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const boxes = gsap.utils.toArray('.bento-box');

        gsap.from(boxes, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%", // Triggers when the top of the section hits 75% down the viewport
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
        });

        // Section header animation
        gsap.from(".structure-header", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="structure" className="w-full py-24 px-6 md:px-12 bg-bg-secondary">
            <div className="max-w-[1400px] mx-auto">

                {/* Section Header */}
                <div className="structure-header mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-light pb-8">
                    <div>
                        <p className="font-sans text-accent uppercase tracking-widest text-xs font-semibold mb-4">
                            [ 01 // The Architecture ]
                        </p>
                        <h2 className="font-gambino text-5xl md:text-7xl uppercase tracking-tighter text-text-primary">
                            Format & <br /> <span className="font-serif italic font-light lowercase text-accent text-6xl md:text-8xl tracking-tight">Rules.</span>
                        </h2>
                    </div>
                    <p className="font-sans text-text-muted max-w-sm text-base md:text-lg">
                        Meticulously crafted for maximum innovation. We are looking for builders who don't just use LLMs, but bend them.
                    </p>
                </div>

                {/* Editorial Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[auto]">

                    {/* Box 1: 48 Hours (Large, spans 2 rows) */}
                    <div className="bento-box md:col-span-2 md:row-span-2 bg-bg-primary p-8 md:p-12 border border-border-light flex flex-col justify-between group hover:border-text-primary/30 transition-colors duration-500">
                        <div className="mb-20 md:mb-32">
                            <p className="font-sans text-xs text-text-muted uppercase tracking-widest mb-4">The Sprint</p>
                            <h3 className="font-gambino text-7xl md:text-[8rem] leading-[0.85] uppercase tracking-tighter text-text-primary">
                                48 <br /> Hours
                            </h3>
                        </div>
                        <div>
                            <p className="font-sans text-lg md:text-xl text-text-muted max-w-md leading-relaxed">
                                A non-stop innovation sprint. No distractions, just pure, undistracted agentic building.
                            </p>
                        </div>
                    </div>

                    {/* Box 2: Capacity */}
                    <div className="bento-box md:col-span-1 bg-bg-primary p-8 md:p-10 border border-border-light flex flex-col justify-between group hover:border-text-primary/30 transition-colors duration-500">
                        <div className="mb-12">
                            <p className="font-sans text-xs text-text-muted uppercase tracking-widest mb-4">Capacity</p>
                            <h3 className="font-serif italic text-5xl md:text-6xl text-text-primary tracking-tight">
                                60 + 10 <br /> <span className="font-sans not-italic text-3xl uppercase tracking-tighter font-medium text-accent">Buffer</span>
                            </h3>
                        </div>
                        <p className="font-sans text-sm text-text-muted leading-relaxed">
                            Strictly limited to 60 top-tier teams with 10 on standby. Highly exclusive.
                        </p>
                    </div>

                    {/* Box 3: Residential */}
                    <div className="bento-box md:col-span-1 bg-bg-primary p-8 md:p-10 border border-border-light flex flex-col justify-between group hover:border-text-primary/30 transition-colors duration-500">
                        <div className="mb-12">
                            <p className="font-sans text-xs text-text-muted uppercase tracking-widest mb-4">Logistics</p>
                            <h3 className="font-gambino text-4xl md:text-5xl uppercase tracking-tighter text-text-primary">
                                Full <br /> <span className="text-accent">Residential</span>
                            </h3>
                        </div>
                        <p className="font-sans text-sm text-text-muted leading-relaxed">
                            All-inclusive accommodations provided on-site. We handle the logistics so your cognitive load is 100% dedicated to building.
                        </p>
                    </div>

                    {/* Box 4: Screening (Wide) */}
                    <div className="bento-box md:col-span-1 bg-text-primary text-bg-primary p-8 md:p-10 border border-text-primary flex flex-col justify-between group">
                        <div className="mb-12">
                            <p className="font-sans text-xs text-bg-secondary/70 uppercase tracking-widest mb-4">Admission</p>
                            <h3 className="font-serif italic text-5xl md:text-6xl tracking-tight">
                                Screening.
                            </h3>
                        </div>
                        <p className="font-sans text-sm text-bg-secondary/80 leading-relaxed">
                            Open to everyone, but heavily gated. Submit a 45s - 1m video pitch. We evaluate clarity, ambition, and audacity.
                        </p>
                    </div>

                    {/* Box 5: The Gauntlet (Wide) */}
                    <div className="bento-box md:col-span-2 bg-bg-primary p-8 md:p-10 border border-border-light flex flex-col md:flex-row justify-between md:items-end gap-8 group hover:border-text-primary/30 transition-colors duration-500">
                        <div className="flex-1">
                            <p className="font-sans text-xs text-text-muted uppercase tracking-widest mb-4">The Gauntlet</p>
                            <h3 className="font-gambino text-5xl md:text-6xl uppercase tracking-tighter text-text-primary leading-none">
                                MVP <span className="font-serif italic font-light lowercase text-accent tracking-tight text-6xl md:text-7xl">to</span> Final
                            </h3>
                        </div>
                        <p className="font-sans text-sm text-text-muted leading-relaxed max-w-sm flex-1">
                            Survive the initial MVP evaluation to reach the final round. Defend your architecture in front of our elite panel of 5-7 judges.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}