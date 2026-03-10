import { ReactLenis } from 'lenis/react';
import type { LenisOptions } from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisOptions: LenisOptions = {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        syncTouch: false,
        infinite: false,
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}