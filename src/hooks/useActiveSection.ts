import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in view so the nav can show where you are.
 *
 * Uses a 1px activation line sitting just below the fixed header, expressed as
 * an IntersectionObserver rootMargin. Because the sections are contiguous,
 * exactly one of them crosses that line at any scroll position, which makes
 * "active" unambiguous without measuring on every scroll frame.
 */
export const useActiveSection = (ids: string[], offset = 64) => {
  const [activeId, setActiveId] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key.split(',')
    const line = offset + 80

    // The observer only reports sections whose intersection *changed*, so the
    // state of every section is tracked here rather than being derived from a
    // single callback's entries.
    const intersecting = new Map<string, boolean>()
    let observed: HTMLElement[] = []
    let observer: IntersectionObserver | null = null

    const resolve = () => {
      const active = sectionIds.find((id) => intersecting.get(id))
      if (active) {
        setActiveId(active)
        return
      }

      // Nothing crosses the line: we're either above the first section, or in a
      // final section too short to reach it. Fall back to the last section that
      // starts above the line.
      let last: string | null = null
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) last = id
      }
      setActiveId(last)
    }

    const connect = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

      observer?.disconnect()
      intersecting.clear()
      observed = elements

      if (elements.length === 0) {
        resolve()
        return
      }

      const bottom = Math.max(0, window.innerHeight - line - 1)
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => intersecting.set(entry.target.id, entry.isIntersecting))
          resolve()
        },
        { rootMargin: `-${line}px 0px -${bottom}px 0px`, threshold: 0 }
      )

      elements.forEach((el) => observer?.observe(el))
    }

    connect()

    // Sections below the fold are lazy-loaded, so several of them do not exist
    // when this first runs. Without re-attaching, they would never be observed
    // and the active item would freeze on the last section that did exist.
    const watcher = new MutationObserver(() => {
      const current = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

      const changed =
        current.length !== observed.length || current.some((el, i) => el !== observed[i])

      if (changed) connect()
      if (current.length === sectionIds.length) watcher.disconnect()
    })

    watcher.observe(document.body, { childList: true, subtree: true })

    // rootMargin is fixed at construction, so the band must be rebuilt when the
    // viewport height changes.
    let resizeFrame = 0
    const onResize = () => {
      if (resizeFrame !== 0) return
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0
        connect()
      })
    }

    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      if (resizeFrame !== 0) window.cancelAnimationFrame(resizeFrame)
      window.removeEventListener('resize', onResize)
      watcher.disconnect()
      observer?.disconnect()
    }
  }, [key, offset])

  return activeId
}
