"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import download from "downloadjs";

import developerImage from "../../../assets/developer.png";
import { getResume } from "../../../services/resumeApis";
import Reveal from "../../shared/motion/Reveal";
import { leftVariants, rightVariants } from "../../shared/motion/variants";

const RESUME_FILE_NAME = "Samiul_Karim_Prodhan_Resume.pdf";

function Hero() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  async function handleDownloadResume() {
    setDownloadError(null);
    setIsDownloading(true);
    try {
      const resumeData = await getResume();
      const blob = new Blob([resumeData], { type: "application/pdf" });
      download(blob, RESUME_FILE_NAME);
    } catch (error) {
      setDownloadError(
        error instanceof Error
          ? error.message
          : "Could not download the resume right now.",
      );
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="py-4 md:py-8 flex flex-col-reverse md:flex-row gap-5 md:gap-10 ">
      <Reveal className=" md:flex-1 overflow-x-hidden" variants={leftVariants}>
        <p className="text-lg md:text-xl md:my-5">Hello, Myself</p>
        <h1 className=" text-2xl md:text-4xl font-bold font-Montserrat text-primary my-3 md:my-5">
          Md. Samiul Karim Prodhan
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold font-Montserrat text-accent my-3 md:my-5">
          I build responsive & eye catching website.
        </h2>
        <p className="text-lg md:text-xl mb-5">
          I&apos;m full-stack developer specialized in React.js. The main focus
          is front-end, but I also use Node.Js to build a responsive full-stack
          website.
        </p>
        <motion.button
          className="btn btn-primary sm:btn-sm md:btn-md lg:btn-lg "
          onClick={handleDownloadResume}
          disabled={isDownloading}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, x: 10, transition: { duration: 0.5 } }}
        >
          {isDownloading ? "Preparing Resume..." : "Download Resume"}
        </motion.button>
        {downloadError && (
          <p className="text-error mt-3" role="alert">
            {downloadError}
          </p>
        )}
      </Reveal>

      <Reveal
        variants={rightVariants}
        className=" md:flex-1 flex justify-center items-center overflow-hidden"
      >
        <div className=" h-2/4 w-2/4 md:h-3/4 md:w-3/4 lg:h-auto lg:w-auto">
          <Image
            src={developerImage}
            alt="Md. Samiul Karim Prodhan, full-stack developer"
            className="h-auto w-full"
            priority
          />
        </div>
      </Reveal>
    </div>
  );
}

export default Hero;
