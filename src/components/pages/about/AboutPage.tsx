import {
  ArrowUpRightIcon,
  BrainIcon,
  CodeIcon,
  DatabaseIcon,
  GraduationCapIcon,
  KeyRoundIcon,
  LayersIcon,
  MailIcon,
  MapPinIcon,
  SparklesIcon,
  TargetIcon,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';

import profileImage from '@/assets/first-profile-image.jpg';
import { siteConfig } from '@/lib/site';
import Reveal from '@/components/shared/motion/Reveal';
import SpotlightCard from '@/components/shared/motion/SpotlightCard';
import SectionHeading from '@/components/shared/SectionHeading';
import TechBadge from '@/components/shared/TechBadge';
import Timeline, { type TimelineItem } from '@/components/shared/Timeline';
import { Button } from '@/components/ui/button';
import ContactForm from './ContactForm';

const JOURNEY: TimelineItem[] = [
  {
    period: '2020',
    title: 'First semester, first web page',
    description:
      'Started Computer Science at Daffodil International University and discovered the browser was the most fun place to see code run. HTML, CSS, then Tailwind and Bootstrap.',
  },
  {
    period: '2021 – 2022',
    title: 'JavaScript, then React',
    description:
      'Moved from static pages to real applications: JavaScript, React, React Router, Redux Toolkit, and the first projects that talked to an API.',
  },
  {
    period: '2023',
    title: 'Full stack',
    description:
      'Final-year projects needed a backend, so I built one: Node.js, Express, MongoDB and Mongoose, with JWT, Passport.js and OAuth for auth. Picked up TypeScript and TanStack Query and never put them down.',
  },
  {
    period: 'March 2024',
    title: 'Graduated — B.Sc. in CSE',
    description:
      'Left university with a portfolio of deployed full-stack apps and a habit of reading docs before tutorials.',
  },
  {
    period: 'May 2025 – Present',
    title: 'Jr. Software Engineer — Mojaru Education',
    description:
      'Full-stack on a production Education ERP and Next.js LMS: admissions, pre-assessment, campaigns, payments, reporting and hierarchy RBAC used in daily school operations. This portfolio ships alongside that work — App Router, tagged caching, and a real admin dashboard.',
    current: true,
  },
];

const SERVICES: {
  Icon: LucideIcon;
  title: string;
  text: string;
  tech: string[];
}[] = [
  {
    Icon: LayersIcon,
    title: 'Frontend interfaces',
    text: 'Responsive, accessible UIs with sensible component boundaries and motion that stays out of the way.',
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind',
      'TanStack Query',
      'Motion',
    ],
  },
  {
    Icon: DatabaseIcon,
    title: 'Backend & data',
    text: 'REST APIs with validated inputs, enveloped responses and a schema the frontend can trust.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'zod'],
  },
  {
    Icon: KeyRoundIcon,
    title: 'Auth & integration',
    text: 'Login flows that are boring in the right way: JWT, Passport.js and OAuth, wired to protected routes.',
    tech: ['JWT', 'Passport.js', 'OAuth', 'Axios'],
  },
  {
    Icon: CodeIcon,
    title: 'State & tooling',
    text: 'Server state, client state and forms each in their own lane, plus the tests that keep the contract honest.',
    tech: ['Redux Toolkit', 'Context', 'react-hook-form', 'Vitest'],
  },
];

const STRENGTHS: { Icon: LucideIcon; title: string; text: string }[] = [
  {
    Icon: TargetIcon,
    title: 'Problem-solving mindset',
    text: 'I read the error before I search for it. Debugging is analysis, not guesswork.',
  },
  {
    Icon: BrainIcon,
    title: 'Continuous learner',
    text: 'Docs first, tutorials second. I pick up new tools by building something real with them.',
  },
  {
    Icon: SparklesIcon,
    title: 'Care for the details',
    text: 'Real 404 codes, proper alt text, no layout shift. The small things are the product.',
  },
];

const UNDER_THE_HOOD = [
  'Next.js 16 App Router with React Server Components',
  'Project data cached indefinitely and revalidated by a webhook from the API',
  'Every API response parsed with zod before it reaches a component',
  'Vitest on the contract layer; ESLint and TypeScript strict on everything',
  'Admin dashboard behind JWT auth, Cloudinary for images and the PDF resume',
];

const HOBBIES = [
  "Rubik's cubes",
  'Story-driven PC games',
  'Anime & series',
  'Soldering & DIY repairs',
  'PC hardware',
  'Tea-stall conversations',
];

const CONTACTS = [
  {
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    value: siteConfig.email,
  },
  {
    label: 'LinkedIn',
    href: siteConfig.socials.linkedin,
    value: 'imsamiul3041',
  },
  { label: 'GitHub', href: siteConfig.socials.github, value: 'imSamiul' },
  {
    label: 'WhatsApp',
    href: siteConfig.socials.whatsapp,
    value: '+880 1517-868247',
  },
  {
    label: 'Telegram',
    href: siteConfig.socials.telegram,
    value: '@samiul_karim_shrabon',
  },
];

function AboutPage() {
  return (
    <>
      <section className="container-page pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
          {/* Sticky rail: the face, the facts and the contact routes. */}
          <Reveal
            variant="left"
            as="aside"
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="relative mx-auto max-w-xs lg:mx-0">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[1.75rem] bg-linear-to-br from-primary/30 via-glow/20 to-secondary/30 blur-xl"
              />
              <Image
                src={profileImage}
                alt={siteConfig.name}
                className="relative aspect-4/5 w-full rounded-3xl border object-cover object-top shadow-xl shadow-primary/10"
                sizes="(max-width: 1024px) 20rem, 20rem"
                placeholder="blur"
                priority
              />
            </div>
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <MapPinIcon className="size-4 shrink-0 text-primary" />
                <dt className="sr-only">Location</dt>
                <dd>{siteConfig.location}</dd>
              </div>
              <div className="flex items-center gap-3">
                <GraduationCapIcon className="size-4 shrink-0 text-primary" />
                <dt className="sr-only">Education</dt>
                <dd>B.Sc. CSE, Daffodil International University (2024)</dd>
              </div>
              <div className="flex items-center gap-3">
                <MailIcon className="size-4 shrink-0 text-primary" />
                <dt className="sr-only">Email</dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
            <Button asChild className="mt-6 w-full">
              <a href="#contact">Send a message</a>
            </Button>
          </Reveal>

          <div className="min-w-0 space-y-20 md:space-y-24">
            <SectionHeading
              as="h1"
              eyebrow="About me"
              title={
                <>
                  Turning ideas into <span className="marker">seamless</span>{' '}
                  web solutions
                </>
              }
              description={
                <>
                  Hi, I&apos;m{' '}
                  <span className="font-medium text-foreground">
                    {siteConfig.shortName}
                  </span>
                  , a full-stack developer working in the MERN stack and
                  Next.js. I build applications that are scalable and
                  user-friendly, and I care as much about how the code reads as
                  how the page looks.
                </>
              }
            />

            <div>
              <SectionHeading
                eyebrow="Journey"
                title="How I got here"
                description="From a first HTML page to shipping production ERP and LMS features at Mojaru."
              />
              <Timeline items={JOURNEY} className="mt-10" />
            </div>

            <div>
              <SectionHeading eyebrow="What I offer" title="Where I can help" />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {SERVICES.map((service, index) => (
                  <Reveal
                    key={service.title}
                    index={index}
                    variant="scale"
                    className="h-full"
                  >
                    <SpotlightCard className="h-full p-6">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <service.Icon className="size-5" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-pretty text-muted-foreground">
                        {service.text}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {service.tech.map((tech) => (
                          <li key={tech}>
                            <TechBadge>{tech}</TechBadge>
                          </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Why me" title="More than the stack" />
              <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                {STRENGTHS.map((strength, index) => (
                  <Reveal key={strength.title} as="li" index={index}>
                    <strength.Icon className="size-5 text-primary" />
                    <h3 className="mt-3 font-semibold">{strength.title}</h3>
                    <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                      {strength.text}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div>
              <SectionHeading
                eyebrow="Under the hood"
                title="How this site is built"
                description={
                  <>
                    The portfolio is itself a full-stack project. Both halves
                    are public:{' '}
                    <a
                      href={siteConfig.repos.client}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
                    >
                      frontend
                      <ArrowUpRightIcon className="size-3.5" />
                    </a>{' '}
                    and{' '}
                    <a
                      href={siteConfig.repos.server}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
                    >
                      API
                      <ArrowUpRightIcon className="size-3.5" />
                    </a>
                    .
                  </>
                }
              />
              <Reveal className="mt-8">
                <ul className="divide-y rounded-2xl border bg-card">
                  {UNDER_THE_HOOD.map((line, index) => (
                    <li
                      key={line}
                      className="flex items-start gap-4 px-5 py-4 text-sm"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <SectionHeading
                eyebrow="Beyond code"
                title="When the laptop is closed"
                description="I'm based in Bangladesh and an extrovert by nature — I can find a common topic with almost anyone, whether it's tech, films, sport or anime."
              />
              <Reveal className="mt-8 space-y-4 text-pretty text-muted-foreground">
                <p>
                  Off the clock you&apos;ll find me solving Rubik&apos;s cubes,
                  playing story-driven PC games (Uncharted 4 is the favourite)
                  or keeping up with PC hardware through YouTube and hardware
                  groups. I own a soldering iron and use it — fixing broken
                  things and building small DIY projects, not always
                  successfully, always enjoyably.
                </p>
                <p>
                  Evenings are for friends, short trips around the local area
                  and long conversations over tea at a nearby stall. Before
                  university I did my SSC (2016) at Collectorate Adarsha Shikkha
                  Niketan, Panchagarh, and my HSC (2018) at Cantonment Public
                  School and College.
                </p>
                <ul className="flex flex-wrap gap-2 pt-2">
                  {HOBBIES.map((hobby) => (
                    <li
                      key={hobby}
                      className="rounded-full border bg-background px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {hobby}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div id="contact" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Contact"
                title="Let's talk"
                description="Hiring, freelance or just a question about something on this site — I reply within a day."
              />
              <div className="mt-10 grid gap-10 md:grid-cols-[16rem_1fr]">
                <Reveal variant="left">
                  <ul className="space-y-4">
                    {CONTACTS.map((contact) => {
                      const external = contact.href.startsWith('http');

                      return (
                        <li key={contact.label}>
                          <p className="eyebrow text-[0.65rem]">
                            {contact.label}
                          </p>
                          <a
                            href={contact.href}
                            target={external ? '_blank' : undefined}
                            rel={
                              external ? 'me noopener noreferrer' : undefined
                            }
                            className="mt-0.5 inline-block text-sm font-medium break-all underline-offset-4 hover:text-primary hover:underline"
                          >
                            {contact.value}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
                <Reveal variant="right">
                  <div className="rounded-2xl border bg-card p-6 md:p-8">
                    <ContactForm />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
