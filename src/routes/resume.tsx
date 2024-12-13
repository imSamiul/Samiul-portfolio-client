import { createFileRoute } from "@tanstack/react-router";
import { Line } from "rc-progress";
import React, { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";

export const Route = createFileRoute("/resume")({
  component: ResumeComponent,
});

const buttonTools = [
  "allSkills",
  "frontEnd",
  "webDevelopment",
  "language",
  "framework",
  "library",
  "database",
  "backEnd",
  "tools",
  "python",
  "javascript",
];
const colors = [
  "#03071eff",
  "#6a040fff",
  "#9d0208ff",
  "#d00000ff",
  "#dc2f02ff",
  "#e85d04ff",
  "#f48c06ff",
  "#faa307ff",
  "#ffba08ff",
];

const skillsData = [
  {
    tools: "HTML",
    value: 95,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "language"],
  },
  {
    tools: "CSS",
    value: 90,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "language"],
  },
  {
    tools: "TailwindCSS",
    value: 95,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "framework"],
  },
  {
    tools: "Bootstrap",
    value: 40,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "framework"],
  },
  {
    tools: "JavaScript",
    value: 75,
    color: colors[Math.floor(Math.random() * 9)],
    category: [
      "allSkills",
      "frontEnd",
      "webDevelopment",
      "language",
      "javascript",
    ],
  },
  {
    tools: "TypeScript",
    value: 65,
    color: colors[Math.floor(Math.random() * 9)],
    category: [
      "allSkills",
      "frontEnd",
      "webDevelopment",
      "language",
      "javascript",
    ],
  },
  {
    tools: "React.JS",
    value: 90,
    color: colors[Math.floor(Math.random() * 9)],
    category: [
      "allSkills",
      "frontEnd",
      "webDevelopment",
      "library",
      "javascript",
    ],
  },

  {
    tools: "React-Router",
    value: 95,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "library"],
  },
  {
    tools: "Axios",
    value: 75,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "library"],
  },
  {
    tools: "TanStack Query",
    value: 70,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "library"],
  },
  {
    tools: "TanStack Router",
    value: 65,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "library"],
  },
  {
    tools: "RESTful APIs",
    value: 90,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment"],
  },
  {
    tools: "Firebase",
    value: 40,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "webDevelopment", "database"],
  },
  {
    tools: "Node.JS",
    value: 55,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "backEnd", "webDevelopment", "javascript"],
  },
  {
    tools: "Express.JS",
    value: 65,
    color: colors[Math.floor(Math.random() * 9)],
    category: [
      "allSkills",
      "backEnd",
      "webDevelopment",
      "framework",
      "javascript",
    ],
  },
  {
    tools: "MongoDB",
    value: 70,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "backEnd", "webDevelopment", "database"],
  },
  {
    tools: "Mongoose",
    value: 65,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "backEnd", "webDevelopment", "database", "library"],
  },
  {
    tools: "Git & GitHub",
    value: 55,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "tools"],
  },
  {
    tools: "Bash",
    value: 35,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "tools", "language"],
  },
  {
    tools: "Python",
    value: 30,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "language", "python"],
  },
  {
    tools: "C",
    value: 87,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "language"],
  },

  {
    tools: "Java",
    value: 33,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "language"],
  },
  {
    tools: "Redux Toolkit",
    value: 65,
    color: colors[Math.floor(Math.random() * 9)],
    category: ["allSkills", "frontEnd", "webDevelopment", "library"],
  },
];

const courses = [
  {
    courseCode: "CSE123",
    courseName: "Problem Solving Lab",
  },
  {
    courseCode: "CSE122",
    courseName: "Programming and Problem Solving",
  },
  {
    courseCode: "CSE136",
    courseName: "Software Project I",
  },
  {
    courseCode: "CSE135",
    courseName: "Data Structure Lab",
  },
  {
    courseCode: "CSE134",
    courseName: "Data Structure",
  },
  {
    courseCode: "CSE216",
    courseName: "Software Project II",
  },
  {
    courseCode: "CSE222",
    courseName: "Object Oriented Programming Lab",
  },
  {
    courseCode: "CSE221",
    courseName: "Object Oriented Programming",
  },
  {
    courseCode: "ACT211",
    courseName: "Financial and Managerial Accounting",
  },
  {
    courseCode: "CSE226",
    courseName: "Software Project III",
  },
  {
    courseCode: "CSE225",
    courseName: "Data Communication",
  },
  {
    courseCode: "CSE215",
    courseName: "Algorithm Lab",
  },
  {
    courseCode: "CSE214",
    courseName: "Algorithm",
  },
  {
    courseCode: "STA221",
    courseName: "Statistics and Probability",
  },
  {
    courseCode: "CSE232",
    courseName: "Microprocessor, Embedded Systems, and IoT Lab",
  },
  {
    courseCode: "CSE231",
    courseName: "Microprocessor, Embedded Systems, and IoT",
  },
  {
    courseCode: "CSE234",
    courseName: "Object Oriented Programming II Lab",
  },
  {
    courseCode: "CSE233",
    courseName: "Object Oriented Programming II",
  },
  {
    courseCode: "CSE237",
    courseName: "Software Project IV",
  },
  {
    courseCode: "CSE317",
    courseName: "Software Project V",
  },
  {
    courseCode: "CSE316",
    courseName: "Artificial Intelligence Lab",
  },
  {
    courseCode: "CSE315",
    courseName: "Artificial Intelligence",
  },
  {
    courseCode: "CSE314",
    courseName: "Computer Networks Lab",
  },
  {
    courseCode: "CSE313",
    courseName: "Computer Networks",
  },
  {
    courseCode: "CSE312",
    courseName: "Database Management System Lab",
  },
  {
    courseCode: "CSE311",
    courseName: "Database Management System",
  },
  {
    courseCode: "CSE322",
    courseName: "Data Mining and Machine Learning Lab",
  },
  {
    courseCode: "CSE321",
    courseName: "Data Mining and Machine Learning",
  },
  {
    courseCode: "CSE325",
    courseName: "System Analysis and Design",
  },
  {
    courseCode: "CSE336",
    courseName: "Software Project VI",
  },
  {
    courseCode: "CSE335",
    courseName: "Pervasive Computing and Mobile App Development Lab",
  },
  {
    courseCode: "CSE334",
    courseName: "Pervasive Computing",
  },
  {
    courseCode: "CSE332",
    courseName: "Compiler Design Lab",
  },
  {
    courseCode: "CSE331",
    courseName: "Compiler Design",
  },
  {
    courseCode: "CSE324",
    courseName: "Operating Systems Lab",
  },
  {
    courseCode: "CSE323",
    courseName: "Operating Systems",
  },
  {
    courseCode: "CSE333",
    courseName: "Software Engineering",
  },
  {
    courseCode: "CSE414",
    courseName: "Web Engineering",
  },
  {
    courseCode: "CSE415",
    courseName: "Web Engineering Lab",
  },
  {
    courseCode: "CSE427",
    courseName: "Digital Image Processing",
  },
  {
    courseCode: "CSE423",
    courseName: "Information Security",
  },
  {
    courseCode: "CSE422",
    courseName: "Computer Graphics Lab",
  },
  {
    courseCode: "CSE421",
    courseName: "Computer Graphics",
  },
  {
    courseCode: "CSE413",
    courseName: "Big Data and IoT Lab",
  },
  {
    courseCode: "CSE412",
    courseName: "Big Data and IoT",
  },
  {
    courseCode: "CSE411",
    courseName: "Computer Architecture and Organization",
  },
  {
    courseCode: "CSE499",
    courseName: "Project / Internship (Phase I)",
  },
];

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
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="container mx-auto my-3 md:my-10 px-5 md:px-10">
      <div className="sticky top-0 bg-white  py-2">
        <h1 className="text-center text-3xl font-bold mb-5">Resume</h1>
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
        <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat">
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
          I am a dedicated and passionate full-stack web developer specializing
          in the MERN stack (MongoDB, Express.js, React.js, and Node.js). With a
          solid foundation in problem-solving, debugging, and analytical
          thinking, I excel at creating scalable, user-friendly, and visually
          appealing web applications.
        </p>
      </div>
      <div className="py-4 md:py-8" id="education">
        <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat">
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
      <div className="py-4 md:py-8" id="skills">
        <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat">
          Skills
        </h2>
        <div className="my-2 md:my-4 flex gap-2 flex-wrap">
          {buttonTools.map((tool, index) => (
            <button
              key={index}
              className={`btn btn-sm md:btn-am lg:btn-md ${tool === skills.name ? "btn-primary" : ""}`}
              onClick={() => handleChangeSkills(tool)}
            >
              {tool}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.value.map((skill, index) => (
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3>{skill.tools}</h3>
                <h4>{skill.value}%</h4>
              </div>
              <Line
                key={index}
                percent={skill.value}
                strokeWidth={2}
                strokeColor={skill.color}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="py-4 md:py-8" id="courses">
        <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat">
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
        <h2 className="text-lg md:text-2xl  font-semibold lg:text-2xl font-Montserrat">
          Reference
        </h2>
        <div className="mt-2 md:mt-4">
          <p className=" text-base leading-6 lg:text-lg ">
            Available upon request
          </p>
        </div>
      </div>
    </div>
  );
}
