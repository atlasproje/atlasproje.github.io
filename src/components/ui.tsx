import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageLink } from './PageLink';
import type { Page } from '../lib/router';

/** Fades its children in once they scroll into view. */
export const Reveal = ({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
};

/** Renders a translation string that carries simple inline markup (<em>, <br />). */
export const Rich = ({ html, className }: { html: string; className?: string }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

/** Small mono label: "N° 02 —— What we do" */
export const Eyebrow = ({
  n,
  children,
  dark = false,
  className = '',
}: {
  n?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-paper/70' : 'text-ink-soft'} ${className}`}>
    {n && <span className={dark ? 'text-gold-light' : 'text-gold'}>N° {n}</span>}
    {n && <span aria-hidden className={`h-px w-8 ${dark ? 'bg-paper/30' : 'bg-navy/30'}`} />}
    <span>{children}</span>
  </p>
);

export const Container = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
);

/** Primary call to action — oxblood, used sparingly. */
export const ButtonLink = ({
  to,
  section,
  children,
  variant = 'primary',
}: {
  to: Page;
  section?: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'light';
}) => {
  const styles = {
    primary: 'bg-oxblood text-paper hover:bg-oxblood-deep',
    ghost: 'border border-navy/35 text-navy hover:border-navy hover:bg-navy hover:text-paper',
    light: 'bg-paper text-navy-ink hover:bg-sand',
  }[variant];

  return (
    <PageLink
      to={to}
      section={section}
      className={`group inline-flex items-center gap-2.5 rounded-full py-3.5 pl-6 pr-5 text-[0.95rem] font-medium transition-colors duration-300 ${styles}`}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 transition-transform duration-500 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45"
      />
    </PageLink>
  );
};

/** Eight-point star from the Atlas mark — used as a bullet/ornament. */
export const StarGlyph = ({ className = 'h-3 w-3' }: { className?: string }) => {
  const pts = Array.from({ length: 16 }, (_, i) => {
    const r = i % 2 === 0 ? 10 : 6.2;
    const a = (Math.PI / 8) * i - Math.PI / 2;
    return `${(12 + r * Math.cos(a)).toFixed(2)},${(12 + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <polygon points={pts} fill="currentColor" />
    </svg>
  );
};

/** Shared SVG filters (hand-drawn wobble). Rendered once at the app root. */
export const SvgDefs = () => (
  <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
    <defs>
      <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="rough-strong" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed="2" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

/** A small rubber-stamp label, slightly askew. */
export const Stamp = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <span
    className={`eyebrow inline-block -rotate-[4deg] rounded-[3px] border border-oxblood/80 px-2 py-1 text-[0.6rem] leading-none text-oxblood ${className}`}
    style={{ filter: 'url(#rough)' }}
  >
    {children}
  </span>
);
