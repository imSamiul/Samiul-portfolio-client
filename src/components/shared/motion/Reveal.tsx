"use client";

import {
  motion,
  useAnimation,
  useInView,
  type Transition,
  type Variants,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

// Mirrors the (unexported) margin type framer-motion accepts for useInView.
type MarginValue = `${number}${"px" | "%"}`;
type ViewportMargin =
  `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

type RevealProps = {
  children: ReactNode;
  variants: Variants;
  className?: string;
  index?: number;
  margin?: ViewportMargin;
  transition?: Transition;
};

function Reveal({
  children,
  variants,
  className,
  index,
  margin = "-5% 0px -5% 0px",
  transition = { duration: 0.5, delay: 0.2 },
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      custom={index}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
