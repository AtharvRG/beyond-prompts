import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const judgesList = [
    { id: "01", role: "AI Research Lead", entity: "Top Tier Lab" },
    { id: "02", role: "Principal Engineer", entity: "Tech Giant" },
    { id: "03", role: "Venture Partner", entity: "Tier 1 VC" },
    { id: "04", role: "Founder & CEO", entity: "AI Unicorn" },
    { id: "05", role: "Chief Scientist", entity: "To Be Revealed" },
];

export default function Judges() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".judge-header", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        });

        gsap.from(".judge-row", {
            scrollTrigger: {
                trigger: ".judges-list",
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="judges" className="w-full py-24 px-6 md:px-12 bg-bg-secondary">
            <div className="max-w-[1400px] mx-auto">

                {/* Section Header */}
                <div className="judge-header mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <p className="font-sans text-accent uppercase tracking-widest text-xs font-semibold mb-4">
                            [ 03 // The Panel ]
                        </p>
                        <h2 className="font-gambino text-5xl md:text-7xl uppercase tracking-tighter text-text-primary">
                            The <span className="font-serif italic font-light lowercase text-accent text-6xl md:text-8xl tracking-tight">Jury.</span>
                        </h2>
                    </div>
                    <p className="font-sans text-text-muted max-w-sm text-base md:text-lg">
                        5-7 elite industry leaders. You won't be pitching to junior associates; you will be defending your architecture to the best in the field.
                    </p>
                </div>

                {/* Editorial List */}
                <div className="judges-list border-t border-border-light">
                    {judgesList.map((judge) => (
                        <div
                            key={judge.id}
                            className="judge-row group flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-12 border-b border-border-light hover:bg-text-primary transition-colors duration-500 cursor-default px-4 md:px-8 -mx-4 md:-mx-8"
                        >
                            <div className="flex items-center gap-6 md:gap-12 mb-4 md:mb-0">
                                <span className="font-sans text-sm text-text-muted group-hover:text-bg-secondary/50 transition-colors duration-500">
                                    {judge.id}
                                </span>
                                <h3 className="font-gambino text-3xl md:text-5xl uppercase tracking-tighter text-text-primary group-hover:text-bg-primary transition-colors duration-500">
                                    Judge <span className="font-serif italic font-light lowercase text-accent group-hover:text-bg-primary transition-colors duration-500">Redacted</span>
                                </h3>
                            </div>

                            <div className="flex flex-col md:items-end text-left md:text-right ml-12 md:ml-0">
                                <span className="font-sans text-sm uppercase tracking-widest text-text-primary font-semibold group-hover:text-bg-primary transition-colors duration-500">
                                    {judge.role}
                                </span>
                                <span className="font-sans text-sm text-text-muted group-hover:text-bg-secondary/70 transition-colors duration-500">
                                    {judge.entity}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}