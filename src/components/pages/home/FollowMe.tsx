"use client";

import Image from "next/image";

import FacebookImage from "../../../assets/facebook.png";
import GithubImage from "../../../assets/github.png";
import LinkedinImage from "../../../assets/linkedin.png";
import { siteConfig } from "../../../config/site";
import Reveal from "../../shared/motion/Reveal";
import { bottomRevealVariants } from "../../shared/motion/variants";

const PROFILES = [
  { href: siteConfig.socials.github, image: GithubImage, label: "GitHub" },
  {
    href: siteConfig.socials.linkedin,
    image: LinkedinImage,
    label: "LinkedIn",
  },
  {
    href: siteConfig.socials.facebook,
    image: FacebookImage,
    label: "Facebook",
  },
];

function FollowMe() {
  return (
    <Reveal variants={bottomRevealVariants}>
      <div className="md:my-5">
        <h2 className="text-xl md:text-3xl font-bold font-Montserrat mb-5 text-center">
          Follow Me
        </h2>
        <div className="flex items-center justify-center gap-5 mt-12">
          <div className="flex  justify-center gap-5">
            {PROFILES.map((profile) => (
              <a
                key={profile.label}
                href={profile.href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={`${siteConfig.name} on ${profile.label}`}
              >
                <Image
                  src={profile.image}
                  alt={`${profile.label} profile`}
                  className="h-10 w-10 md:h-12 md:w-12"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default FollowMe;
