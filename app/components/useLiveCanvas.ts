"use client"

import { type RefObject, useEffect, useRef } from "react"

export type LiveCanvasHandlers = {
  /** Runs after the backing store is sized. Use it to prime pixels that persist between frames. */
  onResize?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dpr: number) => void
  /** Runs once per animation frame, and once after every resize so the panel is never blank. */
  onFrame: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dpr: number) => void
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Drives a canvas animation that stays sharp on HiDPI, follows element resizes,
 * runs only while on screen, and settles to a single static frame when the
 * viewer has asked for reduced motion.
 */
export function useLiveCanvas(
  ref: RefObject<HTMLCanvasElement | null>,
  handlers: LiveCanvasHandlers,
) {
  const saved = useRef(handlers)
  saved.current = handlers

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduceMotion = prefersReducedMotion()
    let raf = 0

    const frame = () => {
      saved.current.onFrame(ctx, canvas, dpr)
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (!raf && !reduceMotion) raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width === w && canvas.height === h) return
      canvas.width = w
      canvas.height = h
      saved.current.onResize?.(ctx, canvas, dpr)
      saved.current.onFrame(ctx, canvas, dpr)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Only burn frames while the card is actually on screen.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0,
    })
    io.observe(canvas)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
    }
  }, [ref])
}
