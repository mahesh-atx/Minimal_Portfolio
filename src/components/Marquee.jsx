import { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

/**
 * CSS-driven marquee with a low-frequency scroll-direction listener.
 * The transform stays on the compositor, while direction changes only when
 * the user switches between scrolling up and down.
 */
export default function Marquee({ children, baseVelocity = 3, className = '' }) {
  const speed = Math.max(Math.abs(baseVelocity), 0.25);
  const duration = Math.max(18, 90 / speed);
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState(1);
  const lastDirection = useRef(1);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined || latest === previous) return;

    const nextDirection = latest > previous ? 1 : -1;
    if (nextDirection === lastDirection.current) return;

    lastDirection.current = nextDirection;
    setScrollDirection(nextDirection);
  });

  const animationDirection = baseVelocity * scrollDirection < 0 ? 'reverse' : 'normal';

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection,
        }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
