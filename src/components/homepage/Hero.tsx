import image from "../../assets/developer.png";

import { getResume } from "../../services/resumeApis";
import download from "downloadjs";
import Reveal from "../motion/Reveal";
import { motion } from "motion/react";

function Hero() {
  async function handleDownloadResume() {
    const resumeData = await getResume();
    const blob = new Blob([resumeData], { type: "application/pdf" });
    download(blob, "test.pdf");
  }
  return (
    <div className="py-4 md:py-8 flex flex-col-reverse md:flex-row gap-5 md:gap-10">
      <Reveal direction="left" className=" md:flex-1">
        <p className="text-lg md:text-xl md:my-5">Hello, Myself</p>
        <h1 className=" text-2xl md:text-4xl font-bold font-Montserrat text-primary my-3 md:my-5">
          Md. Samiul Karim Prodhan
        </h1>
        <h1 className="text-2xl md:text-4xl font-bold font-Montserrat text-accent my-3 md:my-5">
          I build responsive & eye catching website.
        </h1>
        <p className="text-lg md:text-xl mb-5">
          I'm full-stack developer specialized in React.js. The main focus is
          front-end, but I also use Node.Js to build a responsive full-stack
          website.
        </p>
        <motion.button
          className="btn btn-primary sm:btn-sm md:btn-md lg:btn-lg text-white "
          onClick={handleDownloadResume}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          Download Resume
        </motion.button>
      </Reveal>

      <Reveal
        direction="right"
        className=" md:flex-1 flex justify-center items-center"
      >
        <div className=" h-2/4 w-2/4 md:h-3/4 md:w-3/4 lg:h-auto lg:w-auto">
          <img src={image} alt="developer-image" />
        </div>
      </Reveal>
    </div>
  );
}

export default Hero;
