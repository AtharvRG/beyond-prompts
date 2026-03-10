"use client"
import React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

interface ThemeToggleAnimationProps {
    showLabel?: boolean
    className?: string
}

export default function ThemeToggleButton({
    showLabel = false,
    className
}: ThemeToggleAnimationProps) {
    const { resolvedTheme, setTheme } = useTheme()
    const btnRef = React.useRef<HTMLButtonElement>(null)

    const toggleTheme = React.useCallback(() => {
        const isDark = resolvedTheme === "dark"
        const newTheme = isDark ? "light" : "dark"

        // ── Position the circle origin at the button ──
        const btn = btnRef.current
        let cx = window.innerWidth - 40
        let cy = 40
        if (btn) {
            const r = btn.getBoundingClientRect()
            cx = r.left + r.width / 2
            cy = r.top + r.height / 2
        }
        document.documentElement.style.setProperty("--vt-x", `${cx}px`)
        document.documentElement.style.setProperty("--vt-y", `${cy}px`)

        // ── Fallback for browsers without View Transitions ──
        if (!document.startViewTransition) {
            setTheme(newTheme)
            return
        }

        // Mark as transitioning to suppress CSS transitions via the
        // html.vt-transitioning rule in index.css
        document.documentElement.classList.add("vt-transitioning")

        // ── Start the view transition ──
        const transition = document.startViewTransition(() => {
            // flushSync guarantees React commits the DOM update
            // synchronously so the browser captures the correct
            // "new" snapshot for the cross-fade / clip-path reveal.
            flushSync(() => {
                setTheme(newTheme)
            })
        })

        transition.ready.then(() => {
            // Calculate max radius needed to cover the entire viewport
            const maxR = Math.hypot(
                Math.max(cx, window.innerWidth - cx),
                Math.max(cy, window.innerHeight - cy)
            )

            // Animate --vt-radius which the CSS mask-image reads.
            // The radial-gradient fades over the last 50px → soft edge.
            document.documentElement.animate(
                { '--vt-radius': [`0px`, `${maxR + 60}px`] },
                {
                    duration: 1800,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    fill: "forwards",
                    pseudoElement: "::view-transition-new(root)"
                }
            )
        })

        // Clean up only after the transition is completely done.
        // This prevents the flash-back that occurred when next-themes
        // cleanup (removing its injected <style>) ran during the
        // view-transition, briefly reverting the visible snapshot.
        transition.finished.then(() => {
            document.documentElement.classList.remove("vt-transitioning")
        })
    }, [resolvedTheme, setTheme])

    return (
        <button
            ref={btnRef}
            onClick={toggleTheme}
            className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-text-primary/10 transition-colors group",
                className
            )}
            aria-label="Toggle Theme"
        >
            <SunIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-text-primary" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-text-primary" />
            {showLabel && (
                <span className="sr-only">Toggle theme</span>
            )}
        </button>
    )
}