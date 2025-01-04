import { createFileRoute } from "@tanstack/react-router";
import firstProfileImage from "../assets/first-profile-image.jpg";
import { LuBadgeCheck } from "react-icons/lu";
import { FaFeatherPointed } from "react-icons/fa6";
import { TbTransformPointTopLeft } from "react-icons/tb";
import BottomReveal from "../components/motion/BottomReveal";

export const Route = createFileRoute("/about")({
  component: AboutComponent,
});

const bottomRevealVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function AboutComponent() {
  return (
    <>
      <BottomReveal variants={bottomRevealVariants}>
        <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
          <div className="sticky top-0 bg-white py-2 md:py-5">
            <h1 className="text-center text-3xl font-bold mb-5 text-primary">
              About me
            </h1>
          </div>

          <div className=" flex flex-col-reverse  items-center gap-5 px-4 py-8 lg:flex-row lg:gap-10 lg:px-16">
            <div className="text-center lg:text-left">
              <h2 className="text-xl md:text-2xl  font-semibold lg:text-3xl font-Montserrat">
                "Turning Ideas into Seamless Web Solutions"
              </h2>
              <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg lg:leading-8">
                Hi, I'm{" "}
                <span className="text-lg font-medium text-primary">
                  Samiul Karim Prodhan
                </span>
                , a full-stack web developer specializing in the MERN stack
                (MongoDB, Express.js, React.js, and Node.js). With a passion for
                innovation and problem-solving, I design and build web
                applications that are not only functional but also scalable,
                user-friendly, and visually appealing.
              </p>
            </div>

            <img
              src={firstProfileImage}
              alt="first-profile-image"
              className="w-full max-w-xs rounded-lg shadow-md lg:max-w-md"
            />
          </div>

          <div className="py-4 md:py-8">
            <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
              My Journey
            </h2>
            <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              My journey into web development began in 2020 during my first
              semester at university. What started as curiosity quickly turned
              into a passion. By 2023, during my final semester, I was actively
              building full-stack projects, exploring new tools, and honing my
              skills. I watch tutorials videos, read blogs, and work on side
              projects to keep my skills sharp. I work on different tools of web
              development. First I started with HTML then CSS. After that I
              learn css framework Tailwind, Bootstrap. Then I learn JavaScript
              then React.JS. I also learn Node.JS to build full-stack website. I
              also learn Express.JS, MongoDB, Mongoose to build full-stack
              website. I also learn Redux toolkit, React Context API to manage
              state effectively. I also learn how to integrate authentication
              systems with JWT, Passport.js, and OAuth. I also learn how to
              build RESTful APIs. I also learn how to build secure and scalable
              back-end systems with Node.js, Express.js, MongoDB, and Mongoose.
              I also learn how to build dynamic, responsive front-end interfaces
              using React, TypeScript, Tailwind, and Bootstrap. Recently I learn
              about TypeScript. I am a big fan of TypeScript. I also a big fan
              of TanStack Query previously known as React Query which is a data
              fetching library for React. I also know React Router which is a
              collection of navigational components that compose declaratively
              with your application. Then I get to know Tanstack Router which is
              alternative to React Router but the benefit of Tanstack Router is
              it is type safe and encourage to use typescript. Recently, I also
              get to know Zod which is used to data validation. I also know how
              to use Axios to make HTTP requests. I am trying to learning
              technologies daily.
            </p>
          </div>

          <div className="py-4 md:py-8">
            <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
              What I Offer
            </h2>
            <div className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              <p>
                I offer a complete suite of web development services, including:
              </p>
              <div>
                <div className="flex items-center gap-2 px-2">
                  <FaFeatherPointed className="w-4 h-4  flex-shrink-0" />
                  <p className="py-2 font-medium">
                    Building dynamic, responsive front-end interfaces using
                  </p>
                </div>
                <div className="px-4  md:px-6">
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      React
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Tailwind, and Bootstrap.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      DaisyUI
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      TypeScript
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      React Router
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Tanstack Router
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Tanstack Query
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Redux Toolkit
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Tanstack Table (React Table)
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 px-2">
                  <FaFeatherPointed className="w-4 h-4  flex-shrink-0" />
                  <p className="py-2 font-medium">
                    Creating secure and scalable back-end systems using
                  </p>
                </div>
                <div className="px-4  md:px-6">
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Node.JS
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Express.JS
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      MongoDB
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Mongoose
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 px-2">
                  <FaFeatherPointed className="w-4 h-4  flex-shrink-0" />
                  <p className="py-2 font-medium">
                    Developing RESTful APIs and integrating authentication
                    systems with
                  </p>
                </div>
                <div className="px-4  md:px-6">
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">JWT</span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Passport.JS
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      OAuth
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Axios/Fetch
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 px-2">
                  <FaFeatherPointed className="w-4 h-4  flex-shrink-0" />
                  <p className="py-2 font-medium">
                    Managing state effectively with
                  </p>
                </div>
                <div className="px-4  md:px-6">
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      Redux Toolkit
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-2">
                    <LuBadgeCheck className="w-4 h-4  flex-shrink-0" />
                    <span className="text-sm md:text-base lg:text-lg">
                      React Context API
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-4 md:py-8">
            <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
              Why Me?
            </h2>
            <div className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              <p>I bring more than just technical expertise to the table:</p>
              <div className="flex items-center gap-2 p-2">
                <TbTransformPointTopLeft className="w-4 h-4  flex-shrink-0" />
                <p>
                  <span className="font-medium">Problem-Solving Mindset:</span>{" "}
                  I excel at analyzing challenges, debugging issues, and finding
                  efficient solutions.
                </p>
              </div>
              <div className="flex items-center gap-2 p-2">
                <TbTransformPointTopLeft className="w-4 h-4  flex-shrink-0" />
                <p>
                  <span className="font-medium"> Continuous Learner:</span> I
                  stay updated with emerging tools and technologies to keep my
                  skills sharp.
                </p>
              </div>
              <div className="flex items-center  gap-2 p-2">
                <TbTransformPointTopLeft className="w-4 h-4  flex-shrink-0" />
                <p>
                  <span className="font-medium">Commitment to Excellence:</span>{" "}
                  I approach every project with attention to detail, ensuring
                  high-quality results. By choosing me, you're partnering with
                  someone who's not just a coder but a collaborator focused on
                  your success.
                </p>
              </div>
            </div>
          </div>

          <div className="py-4 md:py-8">
            <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
              Beyond Code
            </h2>
            <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              I am based in Bangladesh, where I've spent years honing my skills
              and exploring the ever-evolving world of technology. Beyond
              coding, I enjoy a range of activities that fuel my creativity and
              passion.
              <br></br> When I'm not writing code, you'll often find me solving
              Rubik's Cubes, diving into tech blogs and videos, or reading about
              the latest advancements in web development. I consider myself an
              extrovert and enjoy engaging in conversations. Interestingly, I
              always manage to find a common topic with anyone I talk to—be it
              about technology, movies, series, sports, or anime.<br></br> I am
              a PC enthusiast who enjoys staying up-to-date on the latest
              computer components through YouTube and Facebook groups. I'm also
              a gamer, primarily playing story-driven PC games that allow me to
              immerse myself in the role of a character. One of my favorite
              games is Uncharted 4.<br></br> In my leisure time, I enjoy
              watching anime, series, or movies. Additionally, I have a passion
              for working with electrical tools. I own a soldering iron and
              often try fixing broken items or building DIY projects. While my
              experiments don't always succeed, I thoroughly enjoy the process
              of tinkering and creating.
              <br></br> I also enjoy reading books and spending time with
              friends. My evenings are usually spent hanging out with friends,
              taking short tours around our local area, and sharing lively
              conversations over tea at a nearby stall. I find joy in connecting
              with people and discussing various topics.<br></br> In terms of
              education, I have had the privilege of experiencing different
              schools throughout my academic journey. I completed my SSC in 2016
              from Collectorate Adarsha Shikkha Niketan in Panchagarh and my HSC
              in 2018 from Cantonment Public School and College. In 2020, I
              enrolled at Daffodil International University to study Computer
              Science and Engineering and graduated in March 2024.
            </p>
          </div>
          <div className="py-4 md:py-8">
            <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
              Currently
            </h2>
            <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              Currently I am learning about Next.JS which is a React framework.
            </p>
          </div>
          <div className="py-4 md:py-8">
            <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
              Contact Me
            </h2>
            <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              <a href="mailto:samiulkarimprodhan@gmail.com">
                Email: samiulkarimprodhan@gmail.com
              </a>
            </p>
            <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              Linkedin:{" "}
              <a href="https://www.linkedin.com/in/imsamiul3041/">
                Samiul Karim Prodhan
              </a>
            </p>
            <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              Whatsapp:{" "}
              <a href="https://wa.me/+8801517868247">Samiul Karim Prodhan</a>
            </p>
            <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              Telegram:{" "}
              <a href="https://t.me/samiul_karim_shrabon">Samiul Karim</a>
            </p>
            <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
              Facebook:{" "}
              <a href="https://www.facebook.com/samiul.karim.shrabon/">
                Samiul Karim Shrabon
              </a>
            </p>
          </div>
        </div>
      </BottomReveal>
    </>
  );
}
