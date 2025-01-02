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
import BootstrapIcon from "../../assets/bootstrap.png";
import ReactRouterIcon from "../../assets/react-router.svg";
import FirebaseIcon from "../../assets/firebase.png";
import GitIcon from "../../assets/git.svg";
import GithubIcon from "../../assets/github.svg";
import ReduxToolkitIcon from "../../assets/redux.svg";

import Reveal from "../motion/Reveal";
import SkillReveal from "../motion/OneByOneReveal";
import { headingVariants } from "../motion/Variants";

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
];
const skillVariants = {
  hidden: {
    opacity: 0,
    x: -100, // Start from the right
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      delay: index * 0.2, // Stagger effect based on index
    },
  }),
};
function Skills() {
  return (
    <div className="py-4 md:py-8">
      <Reveal variants={headingVariants}>
        <h1 className="text-2xl md:text-3xl  font-semibold  font-Montserrat ">
          Skills
        </h1>
      </Reveal>
      <div className="mt-3 py-2 lg:mt-5 grid grid-cols-2 md:grid-cols-5 gap-3">
        {skills.map((skill, index) => (
          <SkillReveal key={index} index={index} variants={skillVariants}>
            <div className="h-full border-2 border-[#a8dadc] p-2 md:p-4 rounded-md flex items-center justify-center gap-2 text-lg font-medium">
              <img
                src={skill.imageSrc}
                alt={`${skill.skillName}-icon`}
                className="h-5 w-5 md:h-7 md:w-7"
              />
              <p>{skill.skillName}</p>
            </div>
          </SkillReveal>
        ))}
      </div>
    </div>
  );
}

export default Skills;
