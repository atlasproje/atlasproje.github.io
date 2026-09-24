import type { CSSProperties } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Container, Eyebrow, Reveal, Rich } from './ui';
import { LOGO_ATLAS, LOGO_TECHNEOS } from '../lib/assets';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

const IT = { x: 150, y: 168 };
const TR = { x: 426, y: 262 };
// Drawn west → east so the label along it reads left to right
const ROUTE = `M${IT.x} ${IT.y} Q 292 64 ${TR.x} ${TR.y}`;

/** A loose, hand-drawn chart of the Adana ⇄ Italy link. Not to scale — a drawing, not a map. */
const RouteMap = ({ label }: { label: string }) => (
  <svg viewBox="0 0 560 420" className="drawing w-full" role="img" aria-label="Atlas Proje (Adana, TR) — Techneos (IT)">
    <defs>
      <path id="route" d={ROUTE} />
    </defs>

    {/* graticule */}
    <g filter="url(#rough)" fill="none" stroke="currentColor" className="text-paper" strokeOpacity=".14" strokeWidth=".8">
      {[40, 120, 200, 280, 360, 440, 520].map((x, n) => (
        <path key={`m${x}`} d={`M${x} 16 Q ${x + (x - 280) * 0.16} 210 ${x} 404`} className="ln" pathLength={1} style={i(n)} />
      ))}
      {[60, 140, 220, 300, 380].map((y, n) => (
        <path key={`p${y}`} d={`M12 ${y} Q 280 ${y - 26} 548 ${y}`} className="ln" pathLength={1} style={i(n + 2)} />
      ))}
    </g>

    {/* route */}
    <g filter="url(#rough)" fill="none" strokeLinecap="round">
      <path d={ROUTE} stroke="currentColor" className="ln text-gold-light" strokeOpacity=".35" strokeWidth="1" pathLength={1} style={i(6)} />
      <path d={ROUTE} stroke="currentColor" className="fade flow text-gold-light" strokeWidth="1.8" strokeDasharray="2 8" style={i(9)} />
    </g>
    <text className="fade fill-paper/60 font-mono" fontSize="10.5" letterSpacing="2" dy="-10" textAnchor="middle" style={i(10)}>
      <textPath href="#route" startOffset="50%">
        {label.toUpperCase()}
      </textPath>
    </text>

    {/* endpoints */}
    {[
      { ...TR, logo: LOGO_ATLAS, name: 'ATLAS PROJE', place: 'ADANA · TR', lx: 76, ly: -4, dy: 40 },
      { ...IT, logo: LOGO_TECHNEOS, name: 'TECHNEOS', place: 'ITALIA · IT', lx: -76, ly: 4, dy: -40 },
    ].map((p, n) => (
      <g key={p.name} className="fade" style={i(11 + n)}>
        <circle cx={p.x} cy={p.y} r={6} className="fill-gold-light" />
        <circle cx={p.x} cy={p.y} r={6} className="pulse-ring fill-none stroke-gold-light" strokeWidth="1" />
        <circle cx={p.x + p.lx} cy={p.y + p.ly} r={25} className="fill-paper" />
        <image href={p.logo} x={p.x + p.lx - 16} y={p.y + p.ly - 16} width={32} height={32} />
        <text x={p.x} y={p.y + p.dy} textAnchor="middle" className="fill-paper font-mono" fontSize="11" letterSpacing="1.6">
          {p.name}
        </text>
        <text x={p.x} y={p.y + p.dy + 16} textAnchor="middle" className="fill-paper/55 font-mono" fontSize="10" letterSpacing="1.6">
          {p.place}
        </text>
      </g>
    ))}

    {/* compass rose */}
    <g transform="translate(500 360)" className="fade text-paper" style={i(14)} filter="url(#rough)">
      <path d="M0 -22 L4 -4 L22 0 L4 4 L0 22 L-4 4 L-22 0 L-4 -4 Z" fill="none" stroke="currentColor" strokeOpacity=".6" />
      <path d="M0 -22 L4 -4 L0 0 Z M22 0 L4 4 L0 0 Z M0 22 L-4 4 L0 0 Z M-22 0 L-4 -4 L0 0 Z" className="fill-gold-light" />
      <text y={-30} textAnchor="middle" className="fill-paper font-display" fontSize="13" fontStyle="italic">
        N
      </text>
    </g>
  </svg>
);

export const TechneosSpotlight = () => {
  const { t } = useLanguage();

  return (
    <section className="on-dark relative overflow-hidden bg-navy text-paper">
      <Container className="py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow n="03" dark>
                {t('techneos.label')}
              </Eyebrow>
              <h2 className="display mt-6 text-[clamp(2.4rem,4.8vw,4.2rem)]">
                <Rich html={t('techneos.title')} />
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-[60ch] text-[1.02rem] leading-[1.75] text-paper/75">{t('techneos.desc')}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-12 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2">
                <div>
                  <h3 className="font-display text-xl italic text-gold-light">{t('techneos.badge')}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-paper/65">{t('techneos.scope_desc')}</p>
                </div>
                <div>
                  <h3 className="font-display text-xl italic text-gold-light">{t('techneos.scope')}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-paper/65">{t('techneos.scope_detail')}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7 lg:-mr-16 lg:-mt-6">
            <RouteMap label={t('techneos.route')} />
            <p className="eyebrow mt-4 text-right text-paper/55">— {t('techneos.tagline')}</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};
