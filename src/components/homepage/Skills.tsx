import ReactIcon from "../../assets/react.svg";
import JSIcon from "../../assets/javascript-js.svg";
import HTMLIcon from "../../assets/html-5.svg";
import CSSIcon from "../../assets/css-3.png";
import NodeJSICon from "../../assets/node-js.svg";
import TailwindCSSIcon from "../../assets/tailwind-css.svg";

import TypeScriptIcon from "../../assets/typescript-icon.svg";
import ExpressJSIcon from "../../assets/Express.svg";
import MongoDBIcon from "../../assets/mongodb-original.svg";
import MongooseIcon from "../../assets/Mongoose.js.svg";
import TanstackIcon from "../../assets/logo-color-600w-Bx4vtR8J.png";
import FigmaIcon from "../../assets/figma.svg";
import JWTIcon from "../../assets/icons8-jwt.svg";
import PassportJSIcon from "../../assets/passport-seeklogo.svg";

function Skills() {
  return (
    <div className="my-5">
      <h1 className="text-xl md:text-3xl font-bold font-Montserrat mb-5">
        Skills
      </h1>
      <div className="grid  grid-cols-2 md:grid-cols-5 gap-3">
        <div className=" border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={HTMLIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>HTML5</p>
        </div>
        <div className=" border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={CSSIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>CSS</p>
        </div>
        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={TailwindCSSIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>Tailwind CSS</p>
        </div>

        <div className=" border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium ">
          <img
            src={JSIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>JavaScript</p>
        </div>
        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={TypeScriptIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>TypeScript</p>
        </div>
        <div className="border border-[#a8dadc] p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={ReactIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>React.JS</p>
        </div>

        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium  ">
          <img
            src={NodeJSICon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>Node.js</p>
        </div>
        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={ExpressJSIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>Express.JS</p>
        </div>
        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={MongoDBIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>MongoDB</p>
        </div>
        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={MongooseIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>Mongoose</p>
        </div>
        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={TanstackIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>Tanstack Query</p>
        </div>
        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={TanstackIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>Tanstack Router</p>
        </div>

        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={FigmaIcon}
            alt="react-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>Figma</p>
        </div>

        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img src={JWTIcon} alt="jwt-icon" className="h-5 w-5 md:h-7 md:w-7" />
          <p>JWT</p>
        </div>
        <div className="border-2 border-[#a8dadc] p-2  md:p-3 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
          <img
            src={PassportJSIcon}
            alt="jwt-icon"
            className="h-5 w-5 md:h-7 md:w-7"
          />
          <p>PassportJS</p>
        </div>
      </div>
    </div>
  );
}

export default Skills;
