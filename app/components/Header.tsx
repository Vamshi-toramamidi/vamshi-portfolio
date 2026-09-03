"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Bars3Icon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline"

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [menuOpen])

  return (
    <header className="animate-slide-down sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <Link href="/" className="-m-1.5 shrink-0 p-1.5">
          <span className="sr-only">Vamshi Toramamidi</span>
          <span className="text-xl font-bold">VT</span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-x-8 lg:gap-x-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold leading-6 text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {mounted ? (
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          ) : (
            <div className="h-9 w-9" aria-hidden="true" />
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-full p-2 text-foreground transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
          >
            {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
      >
        <div className="space-y-1 px-4 pb-4 pt-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
