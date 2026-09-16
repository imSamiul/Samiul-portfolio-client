'use client';

import { motion, useScroll, useSpring } from 'motion/react';

/** Two-pixel primary line along the top edge that tracks page scroll. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;
