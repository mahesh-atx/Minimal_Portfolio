import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);

  const dotX = useSpring(x, { stiffness: 1500, damping: 50, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1500, damping: 50, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      if (e.target.closest('a, button')) setHovering(true);
    };
    const out = (e) => {
      if (e.target.closest('a, button')) setHovering(false);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        className="cursor-follower cursor-dot fixed top-0 left-0 w-[8px] h-[8px] ml-[-4px] mt-[-4px] rounded-full bg-black pointer-events-none z-[100]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        className="cursor-follower cursor-ring fixed top-0 left-0 w-[36px] h-[36px] ml-[-18px] mt-[-18px] rounded-full border border-black/40 pointer-events-none z-[100]"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 1 : 0.45 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}
