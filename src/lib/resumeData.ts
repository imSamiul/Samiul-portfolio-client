/**
 * Static resume content. The percentages the old page rendered as progress
 * bars are kept as the source of truth but shown as three honest tiers —
 * nobody can tell "JavaScript 75%" from "80%", but "working" versus
 * "familiar" is a claim a reviewer can hold me to.
 */
export type SkillLevel = 'proficient' | 'working' | 'familiar';

export const SKILL_LEVELS: {
  id: SkillLevel;
  label: string;
  description: string;
}[] = [
  {
    id: 'proficient',
    label: 'Proficient',
    description: 'Daily driver — I can architect and debug with it unaided.',
  },
  {
    id: 'working',
    label: 'Working',
    description: 'Shipped with it; comfortable, still learning the corners.',
  },
  {
    id: 'familiar',
    label: 'Familiar',
    description: 'Used it in coursework or a side project.',
  },
];

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'language', label: 'Languages' },
  { id: 'database', label: 'Databases' },
  { id: 'auth', label: 'Auth' },
  { id: 'tools', label: 'Tools' },
] as const;

export type SkillCategory = (typeof SKILL_CATEGORIES)[number]['id'];

type Skill = {
  name: string;
  /** 0–100 self-assessment; only ever surfaced through `levelOf`. */
  score: number;
  categories: Exclude<SkillCategory, 'all'>[];
};

const SKILLS: Skill[] = [
  { name: 'HTML', score: 95, categories: ['frontend', 'language'] },
  { name: 'CSS', score: 90, categories: ['frontend', 'language'] },
  { name: 'Tailwind CSS', score: 95, categories: ['frontend'] },
  { name: 'Bootstrap', score: 40, categories: ['frontend'] },
  { name: 'JavaScript', score: 75, categories: ['frontend', 'language'] },
  { name: 'TypeScript', score: 65, categories: ['frontend', 'language'] },
  { name: 'React', score: 90, categories: ['frontend'] },
  { name: 'Next.js', score: 80, categories: ['frontend', 'backend'] },
  { name: 'Redux Toolkit', score: 65, categories: ['frontend'] },
  { name: 'TanStack Query', score: 70, categories: ['frontend'] },
  { name: 'TanStack Table', score: 65, categories: ['frontend'] },
  { name: 'Motion', score: 70, categories: ['frontend'] },
  { name: 'Axios', score: 75, categories: ['frontend'] },
  { name: 'RESTful APIs', score: 90, categories: ['backend'] },
  { name: 'Node.js', score: 55, categories: ['backend'] },
  { name: 'Express', score: 65, categories: ['backend'] },
  { name: 'MongoDB', score: 70, categories: ['backend', 'database'] },
  { name: 'Mongoose', score: 65, categories: ['backend', 'database'] },
  { name: 'Firebase', score: 40, categories: ['database'] },
  { name: 'JWT', score: 80, categories: ['auth', 'backend'] },
  { name: 'OAuth', score: 70, categories: ['auth'] },
  { name: 'Passport.js', score: 80, categories: ['auth', 'backend'] },
  { name: 'Git & GitHub', score: 55, categories: ['tools'] },
  { name: 'Postman', score: 75, categories: ['tools'] },
  { name: 'Figma', score: 70, categories: ['tools'] },
  { name: 'Bash', score: 35, categories: ['tools', 'language'] },
  { name: 'C', score: 87, categories: ['language'] },
  { name: 'Java', score: 33, categories: ['language'] },
  { name: 'Python', score: 30, categories: ['language'] },
];

function levelOf(score: number): SkillLevel {
  if (score >= 75) return 'proficient';
  if (score >= 55) return 'working';
  return 'familiar';
}

export const skillsData = SKILLS.map(({ name, score, categories }) => ({
  name,
  categories,
  level: levelOf(score),
}));

export type ResumeSkill = (typeof skillsData)[number];

/**
 * Work history for the resume Experience section. Bullets stay honest to
 * production work (shipped / contributed) rather than sole ownership.
 */
export type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  /** Short stack line under the role. */
  stack: string;
  current?: boolean;
  bullets: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: 'May 2025 – Present',
    company: 'Mojaru Education Technologies',
    role: 'Jr. Software Engineer (Full-Stack)',
    stack: 'Next.js · React · Node.js · Express · MongoDB',
    current: true,
    bullets: [
      'Primary contributor on the internal Education ERP (React + Node): shipped production modules for pre-assessment, complain register, reporting, and EFT v2.',
      'Built admission cancel, payment gateway configuration, dialer campaigns, and campaign management across frontend and backend.',
      'Improved ops tooling with hierarchy RBAC, leaderboard/search filters, CCR collection metrics, and lead / active-member analytics.',
      'Shipped student-facing Next.js LMS features still live in production: Speed Master competition, enrollment/payment UX, and the Homework module.',
      'Hardened day-to-day workflows: user deactivation hierarchy rules, admission ACL for support/academic, and assessment release/status correctness.',
    ],
  },
];

export const EDUCATION = [
  {
    period: '2020 – 2024',
    institution: 'Daffodil International University',
    detail: 'B.Sc. in Computer Science and Engineering',
  },
  {
    period: '2016 – 2018',
    institution: 'Cantonment Public School and College',
    detail: 'Higher Secondary Certificate',
  },
  {
    period: '2016',
    institution: 'Collectorate Adarsha Shiksha Niketon, Panchagarh',
    detail: 'Secondary School Certificate',
  },
];

type Course = { courseCode: string; courseName: string };

/**
 * The handful a hiring engineer actually scans for. Everything else is still
 * listed, behind a disclosure, so the page stays honest and stays short.
 */
export const RELEVANT_COURSES: Course[] = [
  { courseCode: 'CSE414', courseName: 'Web Engineering' },
  { courseCode: 'CSE333', courseName: 'Software Engineering' },
  { courseCode: 'CSE311', courseName: 'Database Management System' },
  { courseCode: 'CSE134', courseName: 'Data Structure' },
  { courseCode: 'CSE214', courseName: 'Algorithm' },
  { courseCode: 'CSE221', courseName: 'Object Oriented Programming' },
  { courseCode: 'CSE323', courseName: 'Operating Systems' },
  { courseCode: 'CSE313', courseName: 'Computer Networks' },
  { courseCode: 'CSE423', courseName: 'Information Security' },
  { courseCode: 'CSE325', courseName: 'System Analysis and Design' },
];

export const courses: Course[] = [
  { courseCode: 'CSE123', courseName: 'Problem Solving Lab' },
  { courseCode: 'CSE122', courseName: 'Programming and Problem Solving' },
  { courseCode: 'CSE136', courseName: 'Software Project I' },
  { courseCode: 'CSE135', courseName: 'Data Structure Lab' },
  { courseCode: 'CSE134', courseName: 'Data Structure' },
  { courseCode: 'CSE216', courseName: 'Software Project II' },
  { courseCode: 'CSE222', courseName: 'Object Oriented Programming Lab' },
  { courseCode: 'CSE221', courseName: 'Object Oriented Programming' },
  { courseCode: 'ACT211', courseName: 'Financial and Managerial Accounting' },
  { courseCode: 'CSE226', courseName: 'Software Project III' },
  { courseCode: 'CSE225', courseName: 'Data Communication' },
  { courseCode: 'CSE215', courseName: 'Algorithm Lab' },
  { courseCode: 'CSE214', courseName: 'Algorithm' },
  { courseCode: 'STA221', courseName: 'Statistics and Probability' },
  {
    courseCode: 'CSE232',
    courseName: 'Microprocessor, Embedded Systems, and IoT Lab',
  },
  {
    courseCode: 'CSE231',
    courseName: 'Microprocessor, Embedded Systems, and IoT',
  },
  { courseCode: 'CSE234', courseName: 'Object Oriented Programming II Lab' },
  { courseCode: 'CSE233', courseName: 'Object Oriented Programming II' },
  { courseCode: 'CSE237', courseName: 'Software Project IV' },
  { courseCode: 'CSE317', courseName: 'Software Project V' },
  { courseCode: 'CSE316', courseName: 'Artificial Intelligence Lab' },
  { courseCode: 'CSE315', courseName: 'Artificial Intelligence' },
  { courseCode: 'CSE314', courseName: 'Computer Networks Lab' },
  { courseCode: 'CSE313', courseName: 'Computer Networks' },
  { courseCode: 'CSE312', courseName: 'Database Management System Lab' },
  { courseCode: 'CSE311', courseName: 'Database Management System' },
  { courseCode: 'CSE322', courseName: 'Data Mining and Machine Learning Lab' },
  { courseCode: 'CSE321', courseName: 'Data Mining and Machine Learning' },
  { courseCode: 'CSE325', courseName: 'System Analysis and Design' },
  { courseCode: 'CSE336', courseName: 'Software Project VI' },
  {
    courseCode: 'CSE335',
    courseName: 'Pervasive Computing and Mobile App Development Lab',
  },
  { courseCode: 'CSE334', courseName: 'Pervasive Computing' },
  { courseCode: 'CSE332', courseName: 'Compiler Design Lab' },
  { courseCode: 'CSE331', courseName: 'Compiler Design' },
  { courseCode: 'CSE324', courseName: 'Operating Systems Lab' },
  { courseCode: 'CSE323', courseName: 'Operating Systems' },
  { courseCode: 'CSE333', courseName: 'Software Engineering' },
  { courseCode: 'CSE414', courseName: 'Web Engineering' },
  { courseCode: 'CSE415', courseName: 'Web Engineering Lab' },
  { courseCode: 'CSE427', courseName: 'Digital Image Processing' },
  { courseCode: 'CSE423', courseName: 'Information Security' },
  { courseCode: 'CSE422', courseName: 'Computer Graphics Lab' },
  { courseCode: 'CSE421', courseName: 'Computer Graphics' },
  { courseCode: 'CSE413', courseName: 'Big Data and IoT Lab' },
  { courseCode: 'CSE412', courseName: 'Big Data and IoT' },
  {
    courseCode: 'CSE411',
    courseName: 'Computer Architecture and Organization',
  },
  { courseCode: 'CSE499', courseName: 'Project / Internship (Phase I)' },
];
