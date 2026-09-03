"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion, useLiveCanvas } from "./useLiveCanvas"

const PANEL = "#0a0906"
const ACCENT = "#e8a33d"
const FORECAST = "#6fb3c9"

const POINTS = 62
const NOW_INDEX = 40

const hash = (i: number) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

// Deterministic weekly demand series, so the curve stays stable as it scrolls
// rather than reshuffling every frame.
const demand = (i: number) => {
  const v =
    0.3 +
    0.2 * Math.sin(i * 0.12) +
    0.11 * Math.sin(i * 0.031 + 1.2) +
    0.07 * Math.sin(i * 0.47 + 0.4) +
    0.06 * (hash(i) - 0.5) +
    0.0016 * (i % 300)
  // Keep the trace inside the plot area on the rare frame where every term aligns.
  return Math.min(0.63, Math.max(0, v))
}

export default function FoodForecastChart({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const deltaRef = useRef<HTMLSpanElement>(null)
  const offset = useRef(0)

  useLiveCanvas(canvasRef, {
    onFrame: (ctx, canvas, dpr) => {
      const W = canvas.width
      const H = canvas.height
      const pad = 10 * dpr
      const dx = (W - pad * 2) / (POINTS - 1)

      ctx.fillStyle = PANEL
      ctx.fillRect(0, 0, W, H)

      ctx.strokeStyle = "rgba(180,168,142,0.10)"
      ctx.lineWidth = 1
      for (let g = 1; g < 5; g++) {
        const y = (H / 5) * g
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      const base = Math.floor(offset.current)
      const frac = offset.current - base
      const px = (k: number) => pad + (k - frac) * dx
      const py = (k: number) => H - pad - demand(base + k) * (H - pad * 2) * 1.5
      // Interval width tracks canvas height so it reads the same at any card size.
      const spread = H * 0.045

      const nowX = px(NOW_INDEX)
      ctx.fillStyle = "rgba(111,179,201,0.05)"
      ctx.fillRect(nowX, 0, W - nowX, H)

      ctx.beginPath()
      for (let k = NOW_INDEX; k < POINTS; k++) {
        const s = (k - NOW_INDEX) / (POINTS - NOW_INDEX)
        ctx.lineTo(px(k), py(k) - s * spread)
      }
      for (let k = POINTS - 1; k >= NOW_INDEX; k--) {
        const s = (k - NOW_INDEX) / (POINTS - NOW_INDEX)
        ctx.lineTo(px(k), py(k) + s * spread)
      }
      ctx.closePath()
      ctx.fillStyle = "rgba(111,179,201,0.16)"
      ctx.fill()

      ctx.lineWidth = 2.4 * dpr
      ctx.lineJoin = "round"
      ctx.strokeStyle = ACCENT
      ctx.beginPath()
      for (let k = 0; k <= NOW_INDEX; k++) ctx.lineTo(px(k), py(k))
      ctx.stroke()

      ctx.setLineDash([7 * dpr, 6 * dpr])
      ctx.strokeStyle = FORECAST
      ctx.beginPath()
      for (let k = NOW_INDEX; k < POINTS; k++) ctx.lineTo(px(k), py(k))
      ctx.stroke()
      ctx.setLineDash([])

      ctx.strokeStyle = "rgba(233,229,221,0.45)"
      ctx.lineWidth = 1.5 * dpr
      ctx.beginPath()
      ctx.moveTo(nowX, 0)
      ctx.lineTo(nowX, H)
      ctx.stroke()

      ctx.fillStyle = ACCENT
      ctx.beginPath()
      ctx.arc(nowX, py(NOW_INDEX), 4.5 * dpr, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "rgba(232,163,61,0.35)"
      ctx.lineWidth = 2 * dpr
      ctx.beginPath()
      ctx.arc(nowX, py(NOW_INDEX), (8 + 5 * Math.sin(offset.current * 2)) * dpr, 0, Math.PI * 2)
      ctx.stroke()

      offset.current += 0.009
    },
  })

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      const delta = 0.03 + Math.random() * 0.06
      if (deltaRef.current) deltaRef.current.textContent = `+${(delta * 100).toFixed(1)}%`
    }, 1400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={`relative h-full w-full ${className}`} style={{ backgroundColor: PANEL }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Weekly food demand chart: actual demand to date, with a dashed twelve-week forecast and its confidence interval"
        className="block h-full w-full"
      />

      <div className="pointer-events-none absolute inset-0 font-mono">
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="flex gap-2.5 border border-[#262119] bg-[#0a0906]/70 px-2 py-1 text-[10px] tracking-[0.14em]">
            <span className="text-[#e8a33d]">— ACTUAL</span>
            <span className="text-[#6fb3c9]">·· FORECAST</span>
          </span>
          <span className="flex items-center gap-1.5 border border-[#2c2721] bg-[#100e0b]/80 px-2 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e8a33d]" />
            <span className="text-[10px] tracking-[0.22em] text-[#e8a33d]">SYNCED</span>
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0906] via-[#0a0906]/85 to-transparent p-3 pt-6">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold tracking-[0.06em] text-[#e8a33d]">
              REORDER → PRODUCE
            </span>
            <span className="text-[10px] tracking-[0.14em] text-[#8d8676]">12-WEEK HORIZON</span>
          </div>
          <div className="mt-1.5 text-[10px] tracking-[0.14em] text-[#8d8676]">
            DEMAND TRENDING{" "}
            <span ref={deltaRef} className="tabular-nums text-[#f5f1e8]">
              +6.2%
            </span>{" "}
            VS 4-WK MEAN
          </div>
        </div>
      </div>
    </div>
  )
}
