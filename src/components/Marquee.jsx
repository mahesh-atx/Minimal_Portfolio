import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from 'framer-motion';

/**
 * Scroll-velocity marquee: drifts slowly when idle and speeds up
 * (or reverses) as the user scrolls — awwwards-style.
 */
export default function Marquee({ children, baseVelocity = 3, className = '' }) {
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  // Four copies of the content; x wraps across one copy (25%) for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const directionFactor = useRef(1);

  // Subtle skew driven by scroll velocity — the signature awards-site touch.
  const skewX = useTransform(smoothVelocity, [-1500, 1500], [-3, 3], { clamp: true });

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion.current) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();

    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max items-center" style={{ x, skewX }}>
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
