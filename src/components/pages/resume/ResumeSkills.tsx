'use client';

import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useState } from 'react';

import {
  SKILL_CATEGORIES,
  SKILL_LEVELS,
  skillsData,
  type SkillCategory,
  type SkillLevel,
} from '@/lib/resumeData';
import { cn } from '@/lib/utils';

const LEVEL_STYLES: Record<SkillLevel, string> = {
  proficient: 'border-primary/30 bg-primary/10 text-primary',
  working: 'border-border bg-card text-foreground',
  familiar: 'border-dashed border-border bg-transparent text-muted-foreground',
};

/**
 * Category tabs over a chip cloud. The tabs share one `layoutId` so the
 * active pill slides; the chips animate in and out with `AnimatePresence`
 * so a filter change reads as the list reshaping rather than re-rendering.
 */
function ResumeSkills() {
  const [category, setCategory] = useState<SkillCategory>('all');

  const visible = skillsData.filter(
    (skill) => category === 'all' || skill.categories.includes(category),
  );

  return (
    <div>
      <LayoutGroup id="resume-skill-tabs">
        <div
          role="tablist"
          aria-label="Skill category"
          className="flex flex-wrap gap-1 overflow-hidden rounded-2xl border bg-muted/60 p-1"
        >
          {SKILL_CATEGORIES.map((tab) => {
            const active = tab.id === category;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(tab.id)}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="resume-skill-tab"
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <div className="mt-6 space-y-6">
        {SKILL_LEVELS.map((level) => {
          const skills = visible.filter((skill) => skill.level === level.id);

          if (skills.length === 0) {
            return null;
          }

          return (
            <div key={level.id}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-sm font-semibold">{level.label}</h3>
                <p className="text-xs text-muted-foreground">
                  {level.description}
                </p>
              </div>
              <motion.ul layout className="mt-3 flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {skills.map((skill) => (
                    <motion.li
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-sm font-medium',
                        LEVEL_STYLES[skill.level],
                      )}
                    >
                      {skill.name}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResumeSkills;
