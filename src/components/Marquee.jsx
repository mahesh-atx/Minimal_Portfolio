import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  wrap,
} from 'framer-motion';

/**
 * A lightweight compositor-driven marquee. Scroll direction is softened with
 * a spring so the loop reverses naturally instead of snapping direction.
 */
export default function Marquee({ children, baseVelocity = 3, className = '' }) {
  const viewportRef = useRef(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const isInView = useInView(viewportRef, { amount: 0.1 });
  const { scrollY } = useScroll();
  const baseX = useMotionValue(0);
  const initialDirection = baseVelocity < 0 ? -1 : 1;
  const targetDirection = useMotionValue(initialDirection);
  const smoothDirection = useSpring(targetDirection, {
    stiffness: 170,
    damping: 28,
    mass: 0.45,
  });
  const x = useTransform(baseX, (value) => `${wrap(-25, 0, value)}%`);
  const speed = Math.max(Math.abs(baseVelocity), 0.25) * 1.15;

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined || latest === previous) return;

    const scrollDirection = latest > previous ? 1 : -1;
    targetDirection.set(initialDirection * scrollDirection);
  });

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion.current || !isInView) return;

    const safeDelta = Math.min(delta, 50);
    baseX.set(baseX.get() + speed * smoothDirection.get() * (safeDelta / 1000));
  });

  return (
    <div ref={viewportRef} className={`overflow-hidden ${className}`}>
      <motion.div className="flex w-max items-center" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
