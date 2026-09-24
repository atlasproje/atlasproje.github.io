import type { ReactNode } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageLink } from './PageLink';
import type { Page } from '../lib/router';
import { ButtonLink, Container, Reveal, Rich } from './ui';

/** Opening spread for inner pages. */
export const PageHero = ({
  n,
  crumb,
  label,
  title,
  sub,
  aside,
}: {
  n: string;
  crumb: string;
  label: string;
  title: string;
  sub: string;
  aside?: ReactNode;
}) => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pt-10 lg:pb-24">
      <Container>
        <Reveal>
          <nav aria-label="Breadcrumb" className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-soft">
            <span className="text-gold">N° {n}</span>
            <span aria-hidden className="h-px w-10 bg-navy/30" />
            <PageLink to="home" className="u-grow hover:text-navy">
              {t('bc.home')}
            </PageLink>
            <span aria-hidden>/</span>
            <span className="text-navy" aria-current="page">
              {crumb}
            </span>
          </nav>
        </Reveal>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={80} className="lg:col-span-9">
            <p className="font-display text-lg italic text-oxblood">{label}</p>
            <h1 className="display display-mark mt-3 text-[clamp(2.9rem,7.6vw,7.4rem)] text-navy">
              <Rich html={title} />
            </h1>
          </Reveal>
          {aside && (
            <Reveal delay={240} className="lg:col-span-3 lg:self-end">
              {aside}
            </Reveal>
          )}
        </div>

        <Reveal delay={160} className="mt-10 max-w-2xl lg:ml-[25%] lg:mt-14">
          <p className="lede">{sub}</p>
        </Reveal>
      </Container>
    </section>
  );
};

/** Concentric pointed arches, echoing the doorway in the Atlas mark. */
export const Arches = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 320 440" className={className} aria-hidden fill="none" stroke="currentColor" filter="url(#rough)">
    {[0, 28, 56, 84].map((d) => (
      <path
        key={d}
        d={`M${d} 440 V${190 + d * 0.6} C${d} ${100 + d * 0.9} ${80 + d * 0.5} ${40 + d * 0.9} 160 ${d} C${240 - d * 0.5} ${40 + d * 0.9} ${320 - d} ${100 + d * 0.9} ${320 - d} ${190 + d * 0.6} V440`}
        strokeWidth="1.2"
      />
    ))}
  </svg>
);

/** Oxblood closing band — the one loud moment on each page. */
export const CtaBand = ({
  label,
  title,
  sub,
  primary,
  secondary,
}: {
  label: string;
  title: string;
  sub: string;
  primary: { to: Page; label: string };
  secondary?: { to: Page; label: string };
}) => (
  <section className="on-dark relative overflow-hidden bg-oxblood text-paper">
    <Arches className="pointer-events-none absolute -bottom-24 right-[-6%] h-[125%] text-paper/15 sm:right-[4%]" />
    <Container className="relative py-24 lg:py-32">
      <Reveal className="max-w-4xl">
        <p className="font-display text-lg italic text-sand">{label}</p>
        <h2 className="display mt-4 text-[clamp(2.6rem,6.4vw,5.8rem)] [&_em]:!text-sand">
          <Rich html={title} />
        </h2>
      </Reveal>
      <Reveal delay={120} className="mt-10 grid gap-10 lg:grid-cols-12">
        <p className="text-[1.05rem] leading-relaxed text-paper/80 lg:col-span-5 lg:col-start-4">{sub}</p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-4 lg:self-end">
          <ButtonLink to={primary.to} variant="light">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <PageLink to={secondary.to} className="u-link text-[0.95rem] font-medium text-paper">
              {secondary.label}
            </PageLink>
          )}
        </div>
      </Reveal>
    </Container>
  </section>
);
