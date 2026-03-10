"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";

interface NavbarProps { children: React.ReactNode; className?: string; }
interface NavBodyProps { children: React.ReactNode; className?: string; visible?: boolean; }
interface NavItemsProps {
    items: { name: string; link: string; }[];
    className?: string;
    onItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, link: string) => void;
}
interface MobileNavProps { children: React.ReactNode; className?: string; visible?: boolean; }
interface MobileNavHeaderProps { children: React.ReactNode; className?: string; }
interface MobileNavMenuProps { children: React.ReactNode; className?: string; isOpen: boolean; onClose: () => void; }

export const Navbar = ({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const [visible, setVisible] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) setVisible(true);
        else setVisible(false);
    });

    return (
        <motion.div ref={ref} className={cn("fixed inset-x-0 top-6 z-[100] w-full", className)}>
            {React.Children.map(children, (child) =>
                React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible }) : child
            )}
        </motion.div>
    );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
    return (
        <motion.div
            initial={false}
            animate={{
                maxWidth: visible ? "750px" : "1400px",
                y: visible ? 10 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "relative z-[60] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full px-6 py-4 lg:flex",
                visible ? "bg-bg-primary/90 dark:bg-bg-secondary/90 backdrop-blur-md border border-border-light shadow-2xl" : "bg-transparent border border-transparent",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);
    return (
        <motion.div onMouseLeave={() => setHovered(null)} className={cn("absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex", className)}>
            {items.map((item, idx) => (
                <a
                    key={`link-${idx}`}
                    href={item.link}
                    onMouseEnter={() => setHovered(idx)}
                    onClick={(e) => onItemClick?.(e, item.link)}
                    className="relative px-4 py-2 text-text-muted hover:text-text-primary transition-colors font-sans uppercase tracking-widest text-xs font-semibold"
                >
                    {hovered === idx && (
                        <motion.div layoutId="hovered" className="absolute inset-0 h-full w-full rounded-full bg-text-primary/5 dark:bg-text-primary/10" />
                    )}
                    <span className="relative z-20">{item.name}</span>
                </a>
            ))}
        </motion.div>
    );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
    return (
        <motion.div
            initial={false}
            animate={{
                width: visible ? "90%" : "100%",
                borderRadius: visible ? "2rem" : "0px",
                y: visible ? 10 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "relative z-50 mx-auto flex w-full flex-col items-center justify-between px-6 py-4 lg:hidden",
                visible ? "bg-bg-primary/90 dark:bg-bg-secondary/90 backdrop-blur-md border border-border-light shadow-2xl" : "bg-transparent border border-transparent",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>{children}</div>
);

export const MobileNavMenu = ({ children, className, isOpen }: MobileNavMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={cn("absolute inset-x-0 top-full mt-4 z-50 flex w-full flex-col items-center justify-start gap-6 rounded-2xl bg-bg-primary dark:bg-bg-secondary border border-border-light px-4 py-8 shadow-2xl", className)}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void; }) => {
    return isOpen ? <IconX className="text-text-primary cursor-pointer" onClick={onClick} /> : <IconMenu2 className="text-text-primary cursor-pointer" onClick={onClick} />;
};