import { type Variants } from "motion/react";

export const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const leftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -200,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const rightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 200,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const bottomRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const upRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const skillVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      delay: index * 0.2,
    },
  }),
};

export const projectCardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      delay: index * 0.1,
    },
  }),
};
