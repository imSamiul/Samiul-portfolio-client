import { useInView, motion, useAnimation } from "motion/react";
import { useEffect, useRef, ReactNode, HTMLProps } from "react";

interface RevealProps {
  children: ReactNode;

  className?: HTMLProps<HTMLElement>["className"];

  variants: {
    hidden: {
      opacity: number;
      x: number;
    };
    visible: {
      opacity: number;
      x: number;
    };
  };
}

const Reveal = ({ children, className, variants }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -20% 0px" }); // Trigger animations repeatedly on scroll
  const controls = useAnimation();

  useEffect(() => {
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
