"use client"

import { useId, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown, ExternalLink } from "lucide-react"

type Props = {
  /** Figma prototype share link (figma.com/proto/...). */
  href: string
  label: string
  caption: string
}

const EASE = [0.22, 1, 0.36, 1] as const

export default function ExperiencePrototype({ href, label, caption }: Props) {
  const panelId = useId()
  const reduceMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  /* The Figma embed is a full app (several MB of JS), so it mounts on the
     first open rather than on page load, and stays mounted after that so
     re-opening keeps the visitor's place in the prototype. */
  const [mounted, setMounted] = useState(false)

  const embedSrc = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(href)}`

  function toggle() {
    if (!expanded) setMounted(true)
    setExpanded(!expanded)
  }

  return (
    <div className="mt-6 border-t border-border pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="group flex items-center gap-2 rounded-sm text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          {label}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Open in Figma
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        style={{ overflowAnchor: "none" }}
        inert={!expanded}
        className="overflow-hidden"
      >
        <div className="pt-4">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-muted sm:aspect-video">
            {mounted && (
              <iframe
                src={embedSrc}
                title={caption}
                allowFullScreen
                className="h-full w-full"
              />
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{caption}</p>
        </div>
      </motion.div>
    </div>
  )
}
