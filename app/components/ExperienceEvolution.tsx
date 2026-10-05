"use client"

import { useId, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react"

const EASE = [0.22, 1, 0.36, 1] as const

type Stage = {
  /** Full-resolution image, opened in a new tab. */
  src: string
  /** Small preview shown inline. */
  thumb: string
  title: string
  caption: string
}

type Props = {
  label: string
  /** Why the artifact mattered and how it was produced. */
  summary: string[]
  stages: Stage[]
}

function StageFigure({ stage, step }: { stage: Stage; step: number }) {
  return (
    <figure className="min-w-0">
      <div className="relative">
        {step > 1 && (
          /* Decorative: the step numbers carry the order. Sits in the grid gap,
             centred on the tile rather than the tile-plus-caption. */
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary/70 sm:left-auto sm:right-full sm:top-1/2 sm:mr-1.5 sm:-translate-y-1/2 sm:translate-x-0"
            aria-hidden="true"
          >
            <ArrowDown className="h-4 w-4 sm:hidden" />
            <ArrowRight className="hidden h-4 w-4 sm:block" />
          </div>
        )}
        <a
          href={stage.src}
          target="_blank"
          rel="noopener noreferrer"
          className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border border-border bg-white p-1 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          <img
            src={stage.thumb}
            alt={`${stage.title}: ${stage.caption}`}
            loading="lazy"
            decoding="async"
            className="max-h-full max-w-full object-contain"
          />
          <span className="sr-only">(opens full size in a new tab)</span>
        </a>
      </div>
      <figcaption className="mt-2">
        <p className="text-sm font-medium text-foreground">
          <span className="mr-1.5 tabular-nums text-primary">{step}.</span>
          {stage.title}
        </p>
        <p className="text-xs text-muted-foreground">{stage.caption}</p>
      </figcaption>
    </figure>
  )
}

export default function ExperienceEvolution({ label, summary, stages }: Props) {
  const panelId = useId()
  const reduceMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mt-6 border-t border-border pt-5">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
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

      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        style={{ overflowAnchor: "none" }}
        inert={!expanded}
        className="overflow-hidden"
      >
        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          {summary.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* One row from sm up; stacked on phones, where three tiles would be unreadable. */}
        <div className="mt-4 grid grid-cols-1 gap-x-7 gap-y-8 sm:grid-cols-3">
          {stages.map((stage, i) => (
            <StageFigure key={stage.src} stage={stage} step={i + 1} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
