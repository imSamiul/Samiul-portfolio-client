import Image, { type StaticImageData } from 'next/image';
import { CompassIcon, LayersIcon, ServerIcon, WrenchIcon } from 'lucide-react';

import BootstrapIcon from '@/assets/bootstrap.png';
import CSSIcon from '@/assets/css-3.png';
import ExpressJSIcon from '@/assets/Express.svg';
import FigmaIcon from '@/assets/figma.svg';
import FirebaseIcon from '@/assets/firebase.png';
import GitIcon from '@/assets/git.svg';
import GithubIcon from '@/assets/github.svg';
import HTMLIcon from '@/assets/html-5.svg';
import JSIcon from '@/assets/javascript-js.svg';
import JWTIcon from '@/assets/icons8-jwt.svg';
import MongoDBIcon from '@/assets/mongodb-original.svg';
import MongooseIcon from '@/assets/Mongoose.js.svg';
import MotionIcon from '@/assets/motion.png';
import NextJSIcon from '@/assets/next-js.svg';
import NodeJSICon from '@/assets/node-js.svg';
import PassportJSIcon from '@/assets/passport-seeklogo.svg';
import ReactIcon from '@/assets/react.svg';
import ReactRouterIcon from '@/assets/react-router.svg';
import ReduxToolkitIcon from '@/assets/redux.svg';
import TailwindCSSIcon from '@/assets/tailwind-css.svg';
import TanstackIcon from '@/assets/logo-color-600w-Bx4vtR8J.png';
import TypeScriptIcon from '@/assets/typescript-icon.svg';

import Marquee from '@/components/shared/motion/Marquee';
import Reveal from '@/components/shared/motion/Reveal';
import SpotlightCard from '@/components/shared/motion/SpotlightCard';
import SectionHeading from '@/components/shared/SectionHeading';

type Skill = { icon: StaticImageData; name: string };

type SkillGroup = {
  title: string;
  blurb: string;
  Icon: typeof LayersIcon;
  skills: Skill[];
  /** Frontend is the strongest column, so it gets the wide cell. */
  wide?: boolean;
};

const GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    blurb:
      'Where I spend most of my time — component architecture, data fetching and motion.',
    Icon: LayersIcon,
    wide: true,
    skills: [
      { icon: ReactIcon, name: 'React' },
      { icon: NextJSIcon, name: 'Next.js' },
      { icon: TypeScriptIcon, name: 'TypeScript' },
      { icon: JSIcon, name: 'JavaScript' },
      { icon: TailwindCSSIcon, name: 'Tailwind CSS' },
      { icon: TanstackIcon, name: 'TanStack Query' },
      { icon: TanstackIcon, name: 'TanStack Table' },
      { icon: ReduxToolkitIcon, name: 'Redux Toolkit' },
      { icon: ReactRouterIcon, name: 'React Router' },
      { icon: MotionIcon, name: 'Motion' },
      { icon: HTMLIcon, name: 'HTML5' },
      { icon: CSSIcon, name: 'CSS' },
      { icon: BootstrapIcon, name: 'Bootstrap' },
    ],
  },
  {
    title: 'Backend',
    blurb: 'REST APIs, auth and the database behind them.',
    Icon: ServerIcon,
    skills: [
      { icon: NodeJSICon, name: 'Node.js' },
      { icon: ExpressJSIcon, name: 'Express' },
      { icon: MongoDBIcon, name: 'MongoDB' },
      { icon: MongooseIcon, name: 'Mongoose' },
      { icon: JWTIcon, name: 'JWT' },
      { icon: PassportJSIcon, name: 'Passport.js' },
      { icon: FirebaseIcon, name: 'Firebase' },
    ],
  },
  {
    title: 'Tools',
    blurb: 'Day-to-day workflow.',
    Icon: WrenchIcon,
    skills: [
      { icon: GitIcon, name: 'Git' },
      { icon: GithubIcon, name: 'GitHub' },
      { icon: FigmaIcon, name: 'Figma' },
    ],
  },
];

// Plain text on purpose: these do not have a logo yet, and the list changes
// often enough that it should not need an asset each time.
const EXPLORING = [
  'React Server Components',
  'Next.js caching & revalidation',
  'Zod contracts',
  'TanStack Router',
];

const MARQUEE_LOGOS: Skill[] = [
  { icon: ReactIcon, name: 'React' },
  { icon: NextJSIcon, name: 'Next.js' },
  { icon: TypeScriptIcon, name: 'TypeScript' },
  { icon: TailwindCSSIcon, name: 'Tailwind CSS' },
  { icon: NodeJSICon, name: 'Node.js' },
  { icon: ExpressJSIcon, name: 'Express' },
  { icon: MongoDBIcon, name: 'MongoDB' },
  { icon: TanstackIcon, name: 'TanStack Query' },
  { icon: ReduxToolkitIcon, name: 'Redux Toolkit' },
  { icon: MotionIcon, name: 'Motion' },
  { icon: GitIcon, name: 'Git' },
  { icon: FigmaIcon, name: 'Figma' },
];

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <li className="flex items-center gap-2 rounded-lg border bg-background/60 px-3 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-background">
      <Image
        src={skill.icon}
        alt=""
        aria-hidden="true"
        className="size-5 shrink-0"
      />
      {skill.name}
    </li>
  );
}

/** Logo strip that sits directly under the hero, before any heading. */
export function SkillMarquee() {
  return (
    <div className="border-y bg-muted/40 py-5">
      <Marquee className="container-page">
        {MARQUEE_LOGOS.map((logo) => (
          <span
            key={logo.name}
            className="flex items-center gap-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground"
          >
            <Image
              src={logo.icon}
              alt=""
              aria-hidden="true"
              className="size-6 shrink-0"
            />
            {logo.name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="container-page section-y"
    >
      <SectionHeading
        eyebrow="Skills"
        title={<span id="skills-heading">The stack I ship with</span>}
        description="Grouped by where it sits in the app, not by how many logos fit on a row."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GROUPS.map((group, index) => (
          <Reveal
            key={group.title}
            index={index}
            variant="scale"
            className={group.wide ? 'md:col-span-2' : undefined}
          >
            <SpotlightCard className="h-full p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <group.Icon className="size-4" />
                </span>
                <h3 className="text-lg font-semibold">{group.title}</h3>
              </div>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">
                {group.blurb}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}

        <Reveal
          index={GROUPS.length}
          variant="scale"
          className="md:col-span-2 lg:col-span-2"
        >
          <SpotlightCard className="h-full p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-secondary/25 text-secondary-foreground dark:text-secondary">
                <CompassIcon className="size-4" />
              </span>
              <h3 className="text-lg font-semibold">Currently exploring</h3>
            </div>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">
              What this site is teaching me right now.
            </p>
            <ul className="mt-5 space-y-2">
              {EXPLORING.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-secondary"
                  />
                  {topic}
                </li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

export default Skills;
