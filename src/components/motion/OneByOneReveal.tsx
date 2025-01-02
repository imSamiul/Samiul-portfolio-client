import { motion, useAnimation, useInView } from "motion/react";
import React, { useEffect, useRef } from "react";

type OneByOneRevealProps = {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLElement>["className"];
  index?: number;
  variants: {
    hidden: {
      opacity: number;
      x: number;
    };
    visible: (index: number) => {
      opacity: number;
      x: number;
      transition: {
        type: string;
        stiffness: number;
        delay: number;
      };
    };
  };
};

function OneByOneReveal({
  children,
  className,
  index,
  variants,
}: OneByOneRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-5% 0px -5% 0px",
  }); // Trigger animations repeatedly on scroll
  const controls = useAnimation();

  useEffect(() => {
    console.log("Is in view:", isInView);
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
      custom={index} // Pass index to variants
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default OneByOneReveal;
