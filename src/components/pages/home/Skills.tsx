"use client";

import BootstrapIcon from "../../../assets/bootstrap.png";
import CSSIcon from "../../../assets/css-3.png";
import ExpressJSIcon from "../../../assets/Express.svg";
import FigmaIcon from "../../../assets/figma.svg";
import FirebaseIcon from "../../../assets/firebase.png";
import GitIcon from "../../../assets/git.svg";
import GithubIcon from "../../../assets/github.svg";
import HTMLIcon from "../../../assets/html-5.svg";
import JSIcon from "../../../assets/javascript-js.svg";
import JWTIcon from "../../../assets/icons8-jwt.svg";
import MongoDBIcon from "../../../assets/mongodb-original.svg";
import MongooseIcon from "../../../assets/Mongoose.js.svg";
import MotionIcon from "../../../assets/motion.png";
import NextJSIcon from "../../../assets/next-js.svg";
import NodeJSICon from "../../../assets/node-js.svg";
import PassportJSIcon from "../../../assets/passport-seeklogo.svg";
import ReactIcon from "../../../assets/react.svg";
import ReactRouterIcon from "../../../assets/react-router.svg";
import ReduxToolkitIcon from "../../../assets/redux.svg";
import TailwindCSSIcon from "../../../assets/tailwind-css.svg";
import TanstackIcon from "../../../assets/logo-color-600w-Bx4vtR8J.png";
import TypeScriptIcon from "../../../assets/typescript-icon.svg";

import Reveal from "../../shared/motion/Reveal";
import { headingVariants, skillVariants } from "../../shared/motion/variants";

const skills = [
  { imageSrc: HTMLIcon, skillName: "HTML5" },
  { imageSrc: CSSIcon, skillName: "CSS" },
  { imageSrc: TailwindCSSIcon, skillName: "Tailwind CSS" },
  { imageSrc: BootstrapIcon, skillName: "Bootstrap" },
  { imageSrc: JSIcon, skillName: "JavaScript" },
  { imageSrc: TypeScriptIcon, skillName: "TypeScript" },
  { imageSrc: ReactIcon, skillName: "React.JS" },
  { imageSrc: ReduxToolkitIcon, skillName: "Redux Toolkit" },
  { imageSrc: NodeJSICon, skillName: "Node.js" },
  { imageSrc: ExpressJSIcon, skillName: "Express.JS" },
  { imageSrc: MongoDBIcon, skillName: "MongoDB" },
  { imageSrc: MongooseIcon, skillName: "Mongoose" },
  { imageSrc: FirebaseIcon, skillName: "Firebase" },
  { imageSrc: ReactRouterIcon, skillName: "React Router" },
  { imageSrc: TanstackIcon, skillName: "Tanstack Query" },
  { imageSrc: TanstackIcon, skillName: "Tanstack Router" },
  { imageSrc: TanstackIcon, skillName: "Tanstack Table" },
  { imageSrc: GitIcon, skillName: "Git" },
  { imageSrc: GithubIcon, skillName: "Github" },
  { imageSrc: FigmaIcon, skillName: "Figma" },
  { imageSrc: JWTIcon, skillName: "JWT" },
  { imageSrc: PassportJSIcon, skillName: "PassportJS" },
  { imageSrc: MotionIcon, skillName: "Motion" },
  { imageSrc: NextJSIcon, skillName: "Next.JS" },
];

function Skills() {
  return (
    <div className="py-4 md:py-8">
      <Reveal variants={headingVariants} margin="-10% 0px -20% 0px">
        <h2 className="text-2xl md:text-3xl  font-semibold  font-Montserrat ">
          Skills
        </h2>
      </Reveal>
      <div className="mt-3 py-2 lg:mt-5 grid grid-cols-2 md:grid-cols-5 gap-3">
        {skills.map((skill, index) => (
          <Reveal
            key={skill.skillName}
            index={index}
            variants={skillVariants}
          >
            <div className="h-full border-2 border-[#a8dadc] p-2 md:p-4 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
              <img
                src={skill.imageSrc.src}
                alt={`${skill.skillName} icon`}
                className="h-5 w-5 md:h-7 md:w-7"
              />
              <p>{skill.skillName}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default Skills;
