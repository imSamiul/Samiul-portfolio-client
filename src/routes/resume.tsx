import { createFileRoute } from "@tanstack/react-router";
import { Line } from "rc-progress";
import React, { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { buttonTools, courses, skillsData } from "../db/resumeData";
import BottomReveal from "../components/motion/BottomReveal";
import OneByOneReveal from "../components/motion/OneByOneReveal";
import UpReveal from "../components/motion/UpReveal";

export const Route = createFileRoute("/resume")({
  component: ResumeComponent,
});

function ResumeComponent() {
  const [skills, setSkills] = useState({
    name: "allSkills",
    value: skillsData,
  });

  function handleChangeSkills(category: string) {
    const newSkills = skillsData.filter((skill) =>
      skill.category.includes(category)
    );
    console.log(newSkills);

    setSkills({ name: category, value: newSkills });
  }
  function onPress(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    const targetId = e.currentTarget.href.split("#")[1];
    const target = window.document.getElementById(targetId);
    const navbarHeight = document.querySelector(".sticky")?.clientHeight || 0; // Get the height of the sticky navbar

    if (target) {
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

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
  const upRevealVariants = {
    hidden: {
      opacity: 0,
      y: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <BottomReveal variants={bottomRevealVariants}>
        <div className="sticky top-0   py-2">
          <h1 className="text-center text-3xl font-bold mb-5 text-primary">
            Resume
          </h1>
          <div className="flex gap-2 md:gap-4 justify-center items-center flex-wrap ">
            <a href="#profileSummary" onClick={(e) => onPress(e)}>
              Profile Summary
            </a>
            <RxDividerVertical />
            <a href="#education" onClick={(e) => onPress(e)}>
              Education
            </a>
            <RxDividerVertical />
            <a href="#skills" onClick={(e) => onPress(e)}>
              Skills
            </a>
            <RxDividerVertical />
            <a href="#courses" onClick={(e) => onPress(e)}>
              Courses
            </a>
            <RxDividerVertical />
            <a href="#reference" onClick={(e) => onPress(e)}>
              Reference
            </a>
          </div>
        </div>

        <div className="py-4 md:py-8" id="profileSummary">
          <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
            Profile Summary
          </h2>
          <div className="my-2 md:my-4 ">
            <h3 className="text-base md:text-lg  font-semibold lg:text-lg">
              Samiul Karim Prodhan
            </h3>
            <p className=" text-base leading-6 lg:text-lg ">
              <a href="mailto:samiulkarimprodhan@gmail.com">
                Email: samiulkarimprodhan@gmail.com
              </a>
            </p>
          </div>

          <p className="mt-3 text-base leading-6 lg:mt-5 lg:text-lg ">
            I am a dedicated and passionate full-stack web developer
            specializing in the MERN stack (MongoDB, Express.js, React.js, and
            Node.js). With a solid foundation in problem-solving, debugging, and
            analytical thinking, I excel at creating scalable, user-friendly,
            and visually appealing web applications.
          </p>
        </div>
        <div className="py-4 md:py-8" id="education">
          <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
            Education
          </h2>
          <div className="mt-2 md:mt-4 px-2 md:px-4">
            <div className="my-2">
              <div className="flex items-center gap-2">
                <FaUniversity className="w-4 h-4  flex-shrink-0" />
                <h3 className="text-base md:text-lg  font-semibold ">
                  Daffodil International University
                </h3>
              </div>
              <p className=" text-base leading-6 lg:text-lg ">
                Bachelor of Science in Computer Science and Engineering
                (2020-2024)
              </p>
            </div>
            <div className="my-2">
              <div className="flex items-center gap-2">
                <FaUniversity className="w-4 h-4  flex-shrink-0" />
                <h3 className="text-base md:text-lg  font-semibold ">
                  Cantonment Public School and College
                </h3>
              </div>
              <p className=" text-base leading-6 lg:text-lg ">
                Higher Secondary School Certificate (2016-2018)
              </p>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <FaUniversity className="w-4 h-4  flex-shrink-0" />
                <h3 className="text-base md:text-lg  font-semibold ">
                  Collectorate Adarsha Shiksha Niketon
                </h3>
              </div>
              <p className=" text-base leading-6 lg:text-lg ">
                Secondary School Certificate (2016)
              </p>
            </div>
          </div>
        </div>
      </BottomReveal>
      <BottomReveal variants={bottomRevealVariants}>
        <div className="py-4 md:py-8" id="skills">
          <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
            Skills
          </h2>

          <div className="my-2 md:my-4 flex gap-2 flex-wrap">
            {buttonTools.map((tool, index) => (
              <OneByOneReveal
                key={index}
                index={index}
                variants={skillVariants}
              >
                <button
                  key={index}
                  className={`btn btn-sm md:btn-am lg:btn-md  ${tool === skills.name ? "btn-primary " : ""}`}
                  onClick={() => handleChangeSkills(tool)}
                >
                  {tool}
                </button>
              </OneByOneReveal>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.value.map((skill, index) => (
              <UpReveal key={index} variants={upRevealVariants}>
                <div className="space-y-2" key={index}>
                  <div className="flex justify-between">
                    <h3>{skill.tools}</h3>
                    <h4>{skill.value}%</h4>
                  </div>
                  <Line
                    percent={skill.value}
                    strokeWidth={2}
                    strokeColor={skill.color}
                  />
                </div>
              </UpReveal>
            ))}
          </div>
        </div>
      </BottomReveal>
      <BottomReveal variants={bottomRevealVariants}>
        <div className="py-4 md:py-8" id="courses">
          <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
            Course
          </h2>
          <div className="mt-2 md:mt-4">
            <p className=" text-base leading-6 lg:text-lg ">
              {courses.map((course, index) => (
                <React.Fragment key={index}>
                  <span className="font-semibold">{course.courseCode} - </span>
                  {course.courseName}
                  {index !== courses.length - 1 && ", "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
        <div className="py-4 md:py-8" id="reference">
          <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
            Reference
          </h2>
          <div className="mt-2 md:mt-4">
            <p className=" text-base leading-6 lg:text-lg ">
              Available upon request
            </p>
          </div>
        </div>
      </BottomReveal>
    </div>
  );
}
