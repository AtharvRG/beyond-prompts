import { useEffect, useRef } from 'react';

/**
 * Lightweight Canvas 2D halftone background.
 * Performance budget: < 2ms per frame.
 *  - Quarter-resolution canvas (0.25x CSS pixels)
 *  - Throttled to ~8fps (the drift is barely perceptible)
 *  - Pauses entirely when offscreen
 *  - fillRect instead of arc (10x cheaper)
 *  - Single-octave noise (skip second octave)
 */

interface Props {
    color?: string;
    dotSize?: number;
    speed?: number;
    edgeFade?: number;
}

// Cheap pseudo-random hash
function hash(x: number, y: number): number {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
}

// Single-octave 2D value noise
function noise2D(x: number, y: number): number {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const n00 = hash(ix, iy);
    const n10 = hash(ix + 1, iy);
    const n01 = hash(ix, iy + 1);
    const n11 = hash(ix + 1, iy + 1);
    const nx0 = n00 + (n10 - n00) * sx;
    const nx1 = n01 + (n11 - n01) * sx;
    return nx0 + (nx1 - nx0) * sy;
}

export default function MobileHeroBackground({
    color = '#8C3A2A',
    dotSize = 6,
    speed = 0.08,
    edgeFade = 0.15,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const visibleRef = useRef(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        // Quarter resolution — 4x fewer pixels to compute
        const SCALE = 0.25;
        let w = 0;
        let h = 0;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            w = Math.floor(rect.width * SCALE);
            h = Math.floor(rect.height * SCALE);
            canvas.width = w;
            canvas.height = h;
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        let time = Math.random() * 1000;
        let lastFrame = 0;
        // 8fps is enough — the noise drifts so slowly it's imperceptible
        const FRAME_INTERVAL = 1000 / 8;

        const draw = (timestamp: number) => {
            if (!visibleRef.current) return;
            rafRef.current = requestAnimationFrame(draw);

            if (timestamp - lastFrame < FRAME_INTERVAL) return;
            lastFrame = timestamp;

            time += speed;
            ctx.clearRect(0, 0, w, h);

            const step = Math.max(dotSize * SCALE * 2, 3);
            const cols = Math.ceil(w / step) + 1;
            const rows = Math.ceil(h / step) + 1;
            const noiseScale = 0.06;
            const invW = 1 / w;
            const invH = 1 / h;
            const invEdge = 1 / edgeFade;

            for (let row = 0; row < rows; row++) {
                const cy = row * step + step * 0.5;
                const ny = cy * invH;
                const edgeY = Math.min(ny, 1 - ny);

                for (let col = 0; col < cols; col++) {
                    const cx = col * step + step * 0.5;

                    // Single octave only — skip fbm2 for perf
                    const n = noise2D(
                        col * noiseScale + time * 0.3,
                        row * noiseScale + time * 0.15
                    );
                    const coverage = n * 1.4 - 0.45;
                    if (coverage <= 0.05) continue;

                    const nx = cx * invW;
                    const edgeDist = Math.min(nx, edgeY, 1 - nx);
                    const fade = Math.min(edgeDist * invEdge, 1);

                    const size = Math.min(coverage, 1) * step * 0.7;
                    const alpha = Math.min(coverage, 1) * fade * 0.85;
                    if (alpha < 0.03 || size < 0.5) continue;

                    // fillRect is ~10x cheaper than beginPath+arc+fill
                    ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                    ctx.fillRect(cx - size * 0.5, cy - size * 0.5, size, size);
                }
            }
        };

        // Pause rendering when offscreen
        const io = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = visibleRef.current;
                visibleRef.current = entry.isIntersecting;
                if (!wasVisible && visibleRef.current) {
                    lastFrame = performance.now();
                    rafRef.current = requestAnimationFrame(draw);
                }
            },
            { threshold: 0 }
        );
        io.observe(canvas);

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(rafRef.current);
            ro.disconnect();
            io.disconnect();
        };
    }, [color, dotSize, speed, edgeFade]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ imageRendering: 'pixelated' }}
        />
    );
}
