'use client';

import { CLASSES } from '@/lib/theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-8 sm:mb-12 md:mb-16">
      <h2 className={CLASSES.sectionTitle}>{title}</h2>
      <div className={CLASSES.accentBar}></div>
      {subtitle && (
        <p className={CLASSES.sectionSubtitle}>{subtitle}</p>
      )}
    </div>
  );
}
