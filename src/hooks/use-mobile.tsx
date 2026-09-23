import * as React from "react"

const DESKTOP_WIDTH = 1280
const DESKTOP_HEIGHT = 800

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIsMobile = () => {
      const { innerWidth, innerHeight } = window
      // If width and height are both at least desktop thresholds, it's desktop
      const isDesktop = innerWidth >= DESKTOP_WIDTH && innerHeight >= DESKTOP_HEIGHT
      setIsMobile(!isDesktop)
    }

    // Initial check
    checkIsMobile()

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return !!isMobile
}
