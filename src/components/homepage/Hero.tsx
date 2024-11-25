import image from "../../assets/developer.png";

import { getResume } from "../../services/resumeApis";
import download from "downloadjs";

function Hero() {
  async function handleDownloadResume() {
    const resumeData = await getResume();
    const blob = new Blob([resumeData], { type: "application/pdf" });
    download(blob, "test.pdf");
  }
  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-10">
      <div className="flex-[3] md:flex-1">
        <p className="text-lg md:text-xl md:my-5">Hello, Myself</p>
        <h1 className=" text-2xl md:text-4xl font-bold font-Montserrat text-[#e63946] my-3 md:my-5">
          Md. Samiul Karim Prodhan
        </h1>
        <h1 className="text-2xl md:text-4xl font-bold font-Montserrat text-[#1d3557] my-3 md:my-5">
          I build responsive & eye catching website.
        </h1>
        <p className="text-lg md:text-xl mb-5">
          I'm full-stack developer specialized in React.js. The main focus is
          front-end, but I also use Node.Js to build a responsive full-stack
          website.
        </p>
        <button
          className="btn sm:btn-sm md:btn-md lg:btn-lg btn-outline "
          onClick={handleDownloadResume}
        >
          Download Resume
        </button>
      </div>
      <div className="flex-[2] md:flex-1 flex justify-center">
        <img
          src={image}
          alt="developer-image"
          className="w-1/3 h-1/3 md:h-3/4 md:w-3/4 lg:h-auto lg:w-auto"
        />
      </div>
    </div>
  );
}

export default Hero;
