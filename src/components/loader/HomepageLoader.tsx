import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

function HomepageLoader() {
  const [showScrollText, setShowScrollText] = useState(false);

  useEffect(() => {
    // Show "Scroll Down" text after the animation ends (5 seconds)
    const timer = setTimeout(() => {
      setShowScrollText(true);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-200">
      <AnimatePresence mode="wait">
        {/* Outer Heading */}
        {!showScrollText ? (
          <motion.h1
            key="loader"
            className="text-[14vw] text-gray-200 uppercase relative font-bold"
            initial={{
              WebkitTextStroke: "0.3vw #1d3557",
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 1 }, // Fade out over 5 seconds
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
        ) : (
          <div className="flex flex-col items-center gap-5">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-xl font-semibold text-gray-700"
            >
              Scroll Down
            </motion.h1>
            <svg
              className="animate-bounce w-6 h-6 text-gray-700 mt-2"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 4V7M7.5 14.5C4.73858 14.5 2.5 12.2614 2.5 9.5V5.5C2.5 2.73858 4.73858 0.5 7.5 0.5C10.2614 0.5 12.5 2.73858 12.5 5.5V9.5C12.5 12.2614 10.2614 14.5 7.5 14.5Z"
                stroke="#1d3557"
              />
            </svg>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomepageLoader;
