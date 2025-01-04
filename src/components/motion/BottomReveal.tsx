import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

type BottomRevealProps = {
  children: React.ReactNode;
  className?: React.HTMLProps<HTMLElement>["className"];
  variants: {
    hidden: {
      opacity: number;
      y: number;
    };
    visible: {
      opacity: number;
      y: number;
    };
  };
};

function BottomReveal({ children, variants, className }: BottomRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-5% 0px -5% 0px",
  }); // Trigger animations repeatedly on scroll
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
      className={className}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export default BottomReveal;
