"use client"

import { useEffect, useRef } from "react"

import { prefersReducedMotion, useLiveCanvas } from "./useLiveCanvas"

const BINS = 128
const CEILING_HZ = 8000

const mel = (f: number) => 2595 * Math.log10(1 + f / 700)
const MEL_MAX = mel(CEILING_HZ)
const binOf = (f: number) => (BINS * mel(f)) / MEL_MAX

const STOPS: ReadonlyArray<readonly [number, number, number, number]> = [
  [0.0, 4, 6, 10],
  [0.18, 10, 26, 40],
  [0.38, 12, 74, 92],
  [0.6, 47, 214, 195],
  [0.8, 214, 240, 170],
  [1.0, 255, 214, 102],
]

function colorAt(value: number) {
  const v = value < 0 ? 0 : value > 1 ? 1 : value
  for (let i = 1; i < STOPS.length; i++) {
    if (v <= STOPS[i][0]) {
      const [p0, r0, g0, b0] = STOPS[i - 1]
      const [p1, r1, g1, b1] = STOPS[i]
      const t = (v - p0) / (p1 - p0)
      return `rgb(${Math.round(r0 + (r1 - r0) * t)},${Math.round(g0 + (g1 - g0) * t)},${Math.round(b0 + (b1 - b0) * t)})`
    }
  }
  return "rgb(255,214,102)"
}

// A quadcopter's signature in a mel spectrogram: a blade-pass fundamental with
// a decaying harmonic stack, riding on a broadband rotor-wash noise floor.
function magnitude(bin: number, t: number) {
  const f0 = 178 + 22 * Math.sin(t * 0.6) + 34 * Math.sin(t * 0.11)
  const env = 0.52 + 0.48 * Math.pow(Math.abs(Math.sin(t * 0.055)), 0.6)
  let v = 0.07 + 0.09 * Math.random() + 0.22 * Math.exp(-Math.pow(bin - 4, 2) / 40)
  for (let h = 1; h <= 16; h++) {
    const peak = binOf(f0 * h)
    if (peak > BINS + 4) break
    const width = 1.1 + h * 0.1
    const a = env * Math.exp(-h * 0.15) * (0.85 + 0.3 * Math.sin(t * 1.9 + h * 1.3))
    v += a * Math.exp(-Math.pow(bin - peak, 2) / (2 * width * width))
  }
  v += 0.16 * env * Math.exp(-Math.pow(bin - 96, 2) / 260) * (0.6 + 0.4 * Math.random())
  return v
}

const PANEL = "#04060a"
const columnWidth = (dpr: number) => Math.max(1, Math.round(2 * dpr))

function paintColumn(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  x: number,
  col: number,
  t: number,
) {
  const h = canvas.height
  const bh = h / BINS
  ctx.fillStyle = PANEL
  ctx.fillRect(x, 0, col, h)
  for (let i = 0; i < BINS; i++) {
    ctx.fillStyle = colorAt(magnitude(i, t))
    ctx.fillRect(x, h - (i + 1) * bh, col, bh + 0.7)
  }
  ctx.fillStyle = "rgba(160,200,205,0.10)"
  for (const f of [1000, 2000, 4000]) ctx.fillRect(x, h - binOf(f) * bh, col, 1)
}

export default function UavSpectrogram({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const elapsed = useRef(0)

  useLiveCanvas(canvasRef, {
    // Fill the panel so it reads as a full capture window, animating or not.
    onResize: (ctx, canvas, dpr) => {
      const col = columnWidth(dpr)
      ctx.fillStyle = PANEL
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (let x = 0; x < canvas.width; x += col) {
        paintColumn(ctx, canvas, x, col, elapsed.current)
        elapsed.current += 0.02 * col
      }
    },
    // Scroll what is already painted one column left, then draw the new arrival.
    onFrame: (ctx, canvas, dpr) => {
      const col = columnWidth(dpr)
      ctx.drawImage(canvas, -col, 0)
      paintColumn(ctx, canvas, canvas.width - col, col, elapsed.current)
      elapsed.current += 0.02 * col
    },
  })

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      const c = 0.93 + Math.random() * 0.045
      if (confRef.current) confRef.current.textContent = c.toFixed(3)
      if (barRef.current) barRef.current.style.width = `${(c * 100).toFixed(1)}%`
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={`relative h-full w-full ${className}`} style={{ backgroundColor: PANEL }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Live mel spectrogram of a quadcopter, showing the blade-pass harmonic stack the model classifies"
        className="block h-full w-full"
      />

      <div className="pointer-events-none absolute inset-0 font-mono">
        <div className="absolute inset-y-0 right-0 w-px bg-[#eafffb]/60" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="border border-[#1d2a31] bg-[#04060a]/70 px-2 py-1 text-[10px] tracking-[0.18em] text-[#9fb3ba]">
            MEL · 128 BINS · 16 kHz
          </span>
          <span className="flex items-center gap-1.5 border border-[#1d2a31] bg-[#0b1116]/80 px-2 py-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff5d47]" />
            <span className="text-[10px] tracking-[0.22em] text-[#ffb0a4]">LIVE</span>
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#04060a] via-[#04060a]/85 to-transparent p-3 pt-6">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold tracking-[0.06em] text-[#2fd6c3]">UAV — QUADCOPTER</span>
            <span ref={confRef} className="text-sm tabular-nums text-[#eef5f7]">
              0.940
            </span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#10201f]">
            <div ref={barRef} className="h-full bg-[#2fd6c3]" style={{ width: "94%" }} />
          </div>
        </div>
      </div>
    </div>
  )
}
