import { motion } from "motion/react";

function HomepageLoader() {
  return (
    <motion.div
      className="flex justify-center items-center h-screen w-full bg-gray-200"
      exit={{
        opacity: 0,
        transition: { duration: 1 }, // Fade out over 5 seconds
      }}
      key="loader"
    >
      {/* Outer Heading */}

      <motion.h1
        className="text-[14vw] text-gray-200 uppercase relative font-bold"
        initial={{
          WebkitTextStroke: "0.3vw #1d3557",
          opacity: 1,
        }}
      >
        {/* Inner animated text */}
        <motion.span
          className="absolute top-0 left-0 w-0 overflow-hidden text-[#1d3557]"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "100%", "100%", "0%"] }}
          transition={{
            duration: 5, // Total animation duration
            ease: "linear",
            times: [0, 0.7, 0.9, 1], // Matches keyframe percentages
          }}
        >
          IM_Samiul
        </motion.span>
        IM_Samiul
      </motion.h1>
    </motion.div>
  );
}

export default HomepageLoader;
