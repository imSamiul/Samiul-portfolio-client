import { motion, useAnimation, useInView } from "motion/react";
import React, { useEffect, useRef } from "react";

type SkillRevealProps = {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLElement>["className"];
  index?: number;
};
const skillVariants = {
  hidden: {
    opacity: 0,
    x: -100, // Start from the right
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      delay: index * 0.2, // Stagger effect based on index
    },
  }),
};

function SkillReveal({ children, className, index }: SkillRevealProps) {
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
      variants={skillVariants}
      initial="hidden"
      animate={controls}
      custom={index} // Pass index to variants
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default SkillReveal;
