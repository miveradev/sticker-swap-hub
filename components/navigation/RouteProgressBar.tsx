"use client"

import { useEffect, useRef, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"

function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const barRef = useRef<HTMLDivElement>(null)
  const pendingRef = useRef(false)
  const widthRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  function setWidth(w: number) {
    widthRef.current = w
    if (barRef.current) barRef.current.style.width = `${w}%`
  }

  function setOpacity(o: number) {
    if (barRef.current) barRef.current.style.opacity = `${o}`
  }

  function clearPending() {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Stored in refs so effects don't need them as dependencies
  const startRef = useRef(() => {
    if (pendingRef.current) return
    pendingRef.current = true
    clearPending()
    setOpacity(1)
    setWidth(8)
    intervalRef.current = setInterval(() => {
      const w = widthRef.current
      if (w >= 90) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        return
      }
      setWidth(w + Math.max(0.5, (90 - w) * 0.12))
    }, 200)
  })

  const doneRef = useRef(() => {
    if (!pendingRef.current) return
    pendingRef.current = false
    clearPending()
    setWidth(100)
    const t1 = setTimeout(() => {
      setOpacity(0)
      const t2 = setTimeout(() => setWidth(0), 300)
      timeoutsRef.current.push(t2)
    }, 100)
    timeoutsRef.current.push(t1)
  })

  // Finish bar when the new route finishes rendering
  useEffect(() => {
    doneRef.current()
  }, [pathname, searchParams])

  // Intercept pushState to detect navigation start
  useEffect(() => {
    const origPush = window.history.pushState.bind(window.history)

    window.history.pushState = (
      ...args: Parameters<typeof window.history.pushState>
    ) => {
      startRef.current()
      return origPush(...args)
    }

    const onPopState = () => startRef.current()
    window.addEventListener("popstate", onPopState)

    return () => {
      window.history.pushState = origPush
      window.removeEventListener("popstate", onPopState)
      clearPending()
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      ref={barRef}
      className="fixed top-0 left-0 h-0.5 z-[9999] pointer-events-none bg-foreground"
      style={{
        width: "0%",
        opacity: 0,
        boxShadow: "0 0 8px oklch(0.985 0 0 / 0.35)",
        transition: "width 150ms ease-out, opacity 250ms ease-out",
      }}
    />
  )
}

// useSearchParams requires a Suspense boundary in the App Router
export function RouteProgressBar() {
  return (
    <Suspense fallback={null}>
      <ProgressBar />
    </Suspense>
  )
}
