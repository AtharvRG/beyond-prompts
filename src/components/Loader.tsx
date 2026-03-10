import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const words = [
    "AI NATIVE",
    "48 HOURS",
    "THE CRUCIBLE",
    "BEYOND PROMPTS"
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < words.length - 1) {
            const timeout = setTimeout(() => {
                setIndex(index + 1);
            }, index === 0 ? 1000 : 400); // First word stays a bit longer, then rapid fire
            return () => clearTimeout(timeout);
        } else {
            // After the last word, wait a moment then trigger completion
            const timeout = setTimeout(() => {
                onComplete();
            }, 1200);
            return () => clearTimeout(timeout);
        }
    }, [index, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-bg-primary text-text-primary overflow-hidden"
            initial={{ y: 0 }}
            exit={{
                y: "-100dvh",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Custom cubic-bezier for that buttery slide-up
            }}
        >
            <AnimatePresence mode="wait">
                <motion.h1
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="font-gambino text-4xl md:text-6xl lg:text-8xl uppercase tracking-tighter"
                >
                    {words[index]}
                </motion.h1>
            </AnimatePresence>
        </motion.div>
    );
}