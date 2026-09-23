import * as React from "react"

const DESKTOP_WIDTH = 424
const DESKTOP_HEIGHT = 424

export function useIsBookingModalMobileVersion() {
  const [isMobileVersion, setIsMobileVersion] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkIsMobile = () => {
      const { innerWidth, innerHeight } = window
      // If width and height are both at least desktop thresholds, it's desktop
      const isDesktop = innerWidth >= DESKTOP_WIDTH && innerHeight >= DESKTOP_HEIGHT
      setIsMobileVersion(!isDesktop);
    }

    // Initial check
    checkIsMobile();

    // Listen for resize events
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return !!isMobileVersion;
}
