"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"

type Props = {
  src: string
  poster: string
  label: string
  caption: string
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function ExperienceVideo({ src, poster, label, caption }: Props) {
  /* The observer watches the always-visible toggle row, not the panel: a
     collapsed panel has zero height and would never meet an amount threshold. */
  const triggerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  /* amount: 0 fires the moment the row peeks in from the bottom, so the panel
     grows below the fold instead of shoving read content down mid-scroll. */
  const inView = useInView(triggerRef, { amount: 0 })
  const reduceMotion = useReducedMotion()

  /* Expansion latches: scrolling away never collapses it. Auto-collapse fought
     the browser's scroll anchoring — the page shrank, the anchor pulled scroll
     back, that re-triggered the observer, and the entry juddered against the
     section below it. Only the toggle closes the panel now. */
  const [reached, setReached] = useState(false)
  const [override, setOverride] = useState<boolean | null>(null)
  const expanded = override ?? reached

  useEffect(() => {
    if (inView) setReached(true)
  }, [inView])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (expanded && inView) {
      // Rejected if the browser blocks autoplay; the controls still work.
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [expanded, inView])

  return (
    <div className="mt-6 border-t border-border pt-5">
      <div ref={triggerRef}>
        <button
          type="button"
          onClick={() => setOverride(!expanded)}
          aria-expanded={expanded}
          aria-controls="uav-demo-panel"
          className="group flex items-center gap-2 rounded-sm text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          {label}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <motion.div
        id="uav-demo-panel"
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        // overflowAnchor: the browser must not re-aim scroll at this growing box.
        style={{ overflowAnchor: "none" }}
        /* inert, not aria-hidden: the collapsed panel holds a <video controls>,
           which would otherwise stay Tab-reachable behind a zero-height box. */
        inert={!expanded}
        className="overflow-hidden"
      >
        <div className="pt-4">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            width={1440}
            height={648}
            muted
            loop
            playsInline
            controls
            preload="none"
            aria-label={caption}
            className="w-full rounded-lg border border-border bg-black"
          />
          <p className="mt-2 text-sm text-muted-foreground">{caption}</p>
        </div>
      </motion.div>
    </div>
  )
}
