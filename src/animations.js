export const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24, mass: 0.8 }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export const tabPanel = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.18, ease: [0.7, 0, 0.84, 0] }
  }
};

export const wordReveal = {
  hidden: { opacity: 0, y: 12, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] }
  }
};

export const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
};

export const cardHover = {
  y: -5,
  transition: { type: 'spring', stiffness: 320, damping: 22 }
};
