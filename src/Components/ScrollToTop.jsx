import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType, useInRouterContext } from 'react-router-dom';

// Scroll to top on route (push/replace) navigation. Avoid interfering with POP (back/forward) so browser can restore position.
function ScrollToTop() {
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : null;
  const navType = inRouter ? useNavigationType() : null;
  const lastPathRef = useRef(null);

  useEffect(() => {
    if (!inRouter || !location) return;
    const { pathname, hash } = location;
    // Skip if same path (e.g., query/hash only changes) unless hash provided
    if (lastPathRef.current === pathname && !hash) return;
    lastPathRef.current = pathname;

    // If there's a hash (#anchor), attempt smooth scroll to that element
    if (hash) {
      // Delay to allow new route content to render
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.substring(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      });
      return;
    }

    // Only auto-scroll to top for PUSH or REPLACE; allow POP (back) to restore history position.
    if (navType === 'POP') return;

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [inRouter, location, navType]);

  return null;
}

export default ScrollToTop;
