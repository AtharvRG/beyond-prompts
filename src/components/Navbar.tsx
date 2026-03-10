import { useState } from 'react';
import { useLenis } from 'lenis/react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggleButton from './ThemeToggleButton';
import { Navbar as NavBase, NavBody, NavItems, MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle } from './ui/resizable-navbar';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const lenis = useLenis();

    const navItems = [
        { name: 'Structure', link: '#structure' },
        { name: 'Prizes', link: '#prizes' },
        { name: 'Judges', link: '#judges' },
    ];

    // Cinematic Fade Navigation
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
        e.preventDefault();
        setIsOpen(false);
        setIsFading(true); // Trigger fade out

        setTimeout(() => {
            if (lenis) {
                lenis.scrollTo(link, { immediate: true }); // Jump instantly while hidden
            } else {
                document.querySelector(link)?.scrollIntoView();
            }
            // Fade back in
            setTimeout(() => setIsFading(false), 100);
        }, 400); // Wait for screen to go black/beige
    };

    return (
        <>
            {/* The Cinematic Page Transition Overlay */}
            <AnimatePresence>
                {isFading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[999] bg-bg-primary"
                    />
                )}
            </AnimatePresence>

            <NavBase>
                {/* Desktop View */}
                <NavBody>
                    <div>
                    <a href="#" className="flex items-center gap-2 font-gambino text-2xl uppercase tracking-tight text-text-primary z-20">
                        <img src="/logo.png" alt="Beyond Prompts logo" className="h-8 w-auto" />
                        Beyond<span className="text-accent">.</span>
                    </a>
                    </div>  

                    <NavItems items={navItems} onItemClick={handleNavClick} />

                    <div className="flex items-center gap-4 z-20">
                        <ThemeToggleButton />
                        <a
                            href="https://forms.google.com"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-2.5 bg-text-primary text-bg-primary font-sans text-xs font-bold uppercase tracking-widest rounded-full hover:bg-accent hover:text-bg-primary transition-all duration-300"
                        >
                            Apply Now
                        </a>
                    </div>
                </NavBody>

                {/* Mobile View */}
                <MobileNav>
                    <MobileNavHeader>
                        <a href="#" className="flex items-center gap-2 font-gambino text-2xl uppercase tracking-tight text-text-primary">
                            <img src="/logo.png" alt="Beyond Prompts logo" className="h-8 w-auto" />
                            Beyond<span className="text-accent">.</span>
                        </a>
                        <div className="flex items-center gap-4">
                            <ThemeToggleButton />
                            <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
                        </div>
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        {navItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                onClick={(e) => handleNavClick(e, item.link)}
                                className="font-gambino text-4xl uppercase tracking-tighter text-text-primary hover:text-accent transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="https://forms.google.com"
                            className="mt-4 px-8 py-4 bg-text-primary text-bg-primary font-sans text-sm font-bold uppercase tracking-widest rounded-full w-full text-center"
                        >
                            Apply For Hackathon
                        </a>
                    </MobileNavMenu>
                </MobileNav>
            </NavBase>
        </>
    );
}