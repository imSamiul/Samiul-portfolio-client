'use client';

import {
  ArrowDownIcon,
  ArrowRightIcon,
  DownloadIcon,
  MapPinIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'motion/react';
import { FaGithub } from 'react-icons/fa6';

import profileImage from '@/assets/first-profile-image.jpg';
import { siteConfig } from '@/lib/site';
import { RESUME_DOWNLOAD_URL } from '@/services/apis/resumeApis';
import { REVEAL_EASE } from '@/components/shared/motion/variants';
import { Button, buttonVariants } from '@/components/ui/button';

const EASE = REVEAL_EASE;

// Everything on the left cascades in one pass: parent staggers, children rise.
const column: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// The name is animated word by word; the wrapper clips so each word rises
// out of its own line rather than fading in place.
const word: Variants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.6, ease: EASE } },
};

const FACTS = [
  { label: 'Based in', value: siteConfig.location },
  { label: 'Focus', value: 'React · Next.js · Node' },
  { label: 'Since', value: '2020' },
];

function Hero({ hasResume }: { hasResume: boolean }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Backdrop: dot grid plus two brand glows, all behind the content. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dots" />
        <div className="glow -top-32 left-1/2 size-[28rem] -translate-x-[70%] bg-primary/25 dark:bg-primary/15" />
        <div className="glow top-1/3 right-0 size-[24rem] translate-x-1/3 bg-accent/30 dark:bg-accent/15" />
      </div>

      <div className="container-page grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <motion.div
          variants={column}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1"
        >
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3"
          >
            <p className="eyebrow">{siteConfig.jobTitle}</p>
            {siteConfig.openToWork && (
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/15 px-3 py-1 font-mono text-xs font-medium text-secondary-foreground dark:text-secondary">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-secondary" />
                </span>
                Open to work
              </span>
            )}
          </motion.div>

          <h1
            id="hero-heading"
            className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {siteConfig.shortName.split(' ').map((part) => (
              <span
                key={part}
                className="mr-[0.25em] inline-block overflow-hidden pb-[0.1em] align-top"
              >
                <motion.span variants={word} className="inline-block">
                  {part}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-xl font-medium text-pretty sm:text-2xl lg:text-3xl"
          >
            I build <span className="marker">fast</span>, responsive web apps
            with React &amp; Node.
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base text-pretty text-muted-foreground sm:text-lg"
          >
            Full-stack developer from Bangladesh. Frontend first — React,
            Next.js and TypeScript — with Node.js, Express and MongoDB behind
            it. I care about the details: type-safe APIs, real 404s, fast first
            paint.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="group h-11 px-6">
              <Link href="/projects">
                View projects
                <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            {/*
              A link, not a button: the browser follows the redirect and saves
              the file. No `download` attribute — it is ignored cross-origin,
              and the Content-Disposition header already sets the filename.
              Rendered only when the API has a resume, so nobody lands on its
              error envelope.
            */}
            {hasResume && (
              <a
                href={RESUME_DOWNLOAD_URL}
                className={buttonVariants({
                  size: 'lg',
                  variant: 'outline',
                  className: 'h-11 px-6',
                })}
              >
                <DownloadIcon />
                Resume
              </a>
            )}
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={`${siteConfig.name} on GitHub`}
              className={buttonVariants({
                size: 'icon-lg',
                variant: 'ghost',
                className: 'size-11',
              })}
            >
              <FaGithub className="size-5" />
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t pt-6"
          >
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow text-[0.65rem]">{fact.label}</dt>
                <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="order-1 mx-auto w-full max-w-xs sm:max-w-sm lg:order-2 lg:max-w-md"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-primary/40 via-accent/30 to-secondary/40 blur-2xl dark:from-primary/30 dark:via-accent/20 dark:to-secondary/20"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border bg-card shadow-2xl shadow-primary/15">
              <Image
                src={profileImage}
                alt={`${siteConfig.name}, ${siteConfig.jobTitle.toLowerCase()}`}
                className="aspect-4/5 h-auto w-full object-cover object-top"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 24rem, 28rem"
                placeholder="blur"
                priority
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
              className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border bg-background/90 px-3 py-2 text-xs font-medium shadow-lg shadow-primary/10 backdrop-blur sm:-left-8"
            >
              <MapPinIcon className="size-3.5 text-primary" />
              {siteConfig.location}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#skills"
        aria-label="Scroll to skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground lg:block"
      >
        <ArrowDownIcon className="size-5 animate-bounce" />
      </motion.a>
    </section>
  );
}

export default Hero;
