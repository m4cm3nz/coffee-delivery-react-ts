import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls back to the top whenever the route changes, so navigating between
 * pages doesn't leave the user mid-scroll.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
