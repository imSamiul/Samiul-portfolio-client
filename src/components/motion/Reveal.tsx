import { useInView, motion, useAnimation } from "motion/react";
import { useEffect, useRef, ReactNode, HTMLProps } from "react";

interface RevealProps {
  children: ReactNode;
  direction?: "left" | "right"; // Add direction for animation
  className?: HTMLProps<HTMLElement>["className"];
}

const Reveal = ({ children, direction = "left", className }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" }); // Trigger animations repeatedly on scroll
  const controls = useAnimation();

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100, // Move left or right based on the prop
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

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
      transition={{ duration: 0.5, delay: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
