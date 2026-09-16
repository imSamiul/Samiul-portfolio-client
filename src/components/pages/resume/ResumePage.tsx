"use client";

import { Line } from "rc-progress";
import { Fragment, useState, type MouseEvent } from "react";
import { FaUniversity } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";

import { buttonTools, courses, skillsData } from "../../../db/resumeData";
import { siteConfig } from "../../../config/site";
import Reveal from "../../shared/motion/Reveal";
import {
  bottomRevealVariants,
  upRevealVariants,
} from "../../shared/motion/variants";

const SECTIONS = [
  { id: "profileSummary", label: "Profile Summary" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "courses", label: "Courses" },
  { id: "reference", label: "Reference" },
];

const EDUCATION = [
  {
    institution: "Daffodil International University",
    detail: "Bachelor of Science in Computer Science and Engineering (2020-2024)",
  },
  {
    institution: "Cantonment Public School and College",
    detail: "Higher Secondary School Certificate (2016-2018)",
  },
  {
    institution: "Collectorate Adarsha Shiksha Niketon",
    detail: "Secondary School Certificate (2016)",
  },
];

function ResumePage() {
  const [activeCategory, setActiveCategory] = useState("allSkills");

  const visibleSkills = skillsData.filter((skill) =>
    skill.category.includes(activeCategory),
  );

  function handleSectionJump(
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }
    const stickyHeaderHeight =
      document.querySelector(".sticky")?.clientHeight || 0;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - stickyHeaderHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <Reveal variants={bottomRevealVariants}>
        <div className="sticky top-0   py-2">
          <h1 className="text-center text-3xl font-bold mb-5 text-primary">
            Resume
          </h1>
          <div className="flex gap-2 md:gap-4 justify-center items-center flex-wrap ">
            {SECTIONS.map((section, index) => (
              <Fragment key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(event) => handleSectionJump(event, section.id)}
                >
                  {section.label}
                </a>
                {index !== SECTIONS.length - 1 && <RxDividerVertical />}
              </Fragment>
            ))}
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
              <a href={`mailto:${siteConfig.email}`}>
                Email: {siteConfig.email}
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
            {EDUCATION.map((education) => (
              <div className="my-2" key={education.institution}>
                <div className="flex items-center gap-2">
                  <FaUniversity className="w-4 h-4  flex-shrink-0" />
                  <h3 className="text-base md:text-lg  font-semibold ">
                    {education.institution}
                  </h3>
                </div>
                <p className=" text-base leading-6 lg:text-lg ">
                  {education.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal variants={bottomRevealVariants}>
        <div className="py-4 md:py-8" id="skills">
          <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
            Skills
          </h2>

          <div className="my-2 md:my-4 flex gap-2 flex-wrap">
            {buttonTools.map((tool) => (
              <button
                key={tool}
                className={`btn btn-sm md:btn-am lg:btn-md  ${tool === activeCategory ? "btn-primary " : ""}`}
                onClick={() => setActiveCategory(tool)}
              >
                {tool}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleSkills.map((skill) => (
              <Reveal key={skill.tools} variants={upRevealVariants}>
                <div className="space-y-2">
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
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal variants={bottomRevealVariants}>
        <div className="py-4 md:py-8" id="courses">
          <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat text-accent">
            Course
          </h2>
          <div className="mt-2 md:mt-4">
            <p className=" text-base leading-6 lg:text-lg ">
              {courses.map((course, index) => (
                <Fragment key={course.courseCode}>
                  <span className="font-semibold">{course.courseCode} - </span>
                  {course.courseName}
                  {index !== courses.length - 1 && ", "}
                </Fragment>
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
      </Reveal>
    </div>
  );
}

export default ResumePage;
