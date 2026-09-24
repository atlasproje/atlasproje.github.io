import type { CSSProperties } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageLink } from '../components/PageLink';
import { useServices } from '../lib/services';
import { CtaBand, PageHero } from '../components/Blocks';
import { Glyph } from '../components/Glyphs';
import { ButtonLink, Container, Eyebrow, Reveal, Rich, Stamp, StarGlyph } from '../components/ui';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

/** Two compass circles — the physical and the digital — and the lens where they overlap. */
const Venn = () => (
  <svg viewBox="0 0 480 320" className="drawing w-full" aria-hidden>
    <g filter="url(#rough)" fill="none" strokeLinecap="round">
      <path d="M240 62.53 A120 120 0 0 1 240 257.47 A120 120 0 0 1 240 62.53 Z" className="fade fill-gold" fillOpacity=".85" style={i(4)} />
      <circle cx={170} cy={160} r={120} className="ln stroke-navy" strokeWidth="1.5" pathLength={1} style={i(0)} />
      <circle cx={310} cy={160} r={120} className="ln stroke-navy" strokeWidth="1.5" pathLength={1} style={i(2)} />
      <circle cx={170} cy={160} r={3} className="fade fill-navy" style={i(3)} />
      <circle cx={310} cy={160} r={3} className="fade fill-navy" style={i(3)} />
      <line x1={170} y1={160} x2={310} y2={160} className="ln stroke-oxblood" strokeWidth="1" pathLength={1} style={i(5)} />
    </g>
    <g className="fade" style={i(6)}>
      <text x={112} y={166} textAnchor="middle" className="fill-navy font-display" fontSize="30" fontStyle="italic">
        Ø
      </text>
      <text x={368} y={166} textAnchor="middle" className="fill-navy font-mono" fontSize="22">
        {'</>'}
      </text>
      <path
        transform="translate(240 200)"
        d="M0 -12 L3.2 -4.8 L12 0 L3.2 4.8 L0 12 L-3.2 4.8 L-12 0 L-3.2 -4.8 Z"
        className="fill-oxblood"
      />
    </g>
  </svg>
);

export const Services = () => {
  const { t } = useLanguage();
  const services = useServices();

  const pillars = [
    { label: t('svc.b1_label'), title: t('svc.b1_title'), desc: t('svc.b1_desc'), pad: 'lg:pt-12' },
    { label: t('svc.b2_label'), title: t('svc.b2_title'), desc: t('svc.b2_desc'), pad: 'lg:pt-28' },
    { label: t('svc.b3_label'), title: t('svc.b3_title'), desc: t('svc.b3_desc'), pad: 'lg:pt-20' },
  ];

  const features = [t('svc.feat1'), t('svc.feat2'), t('svc.feat3'), t('svc.feat4'), t('svc.feat5')];

  return (
    <>
      <PageHero
        n="02"
        crumb={t('bc.services')}
        label={t('svc.hero_label')}
        title={t('svc.hero_title')}
        sub={t('svc.hero_sub')}
        aside={
          <ol className="border-t border-navy/15">
            {services.map((s) => (
              <li key={s.id} className="border-b border-navy/15">
                <PageLink to="services" section={s.id} className="group flex items-baseline gap-3 py-2.5 text-[0.9rem] text-ink-soft hover:text-navy">
                  <span className="eyebrow text-gold">{s.num}</span>
                  <span className="u-grow">{s.title}</span>
                </PageLink>
              </li>
            ))}
          </ol>
        }
      />

      {/* Three strengths, deliberately out of step */}
      <section className="border-y border-navy/15 bg-sand-light/70">
        <Container className="grid lg:grid-cols-3">
          {pillars.map((p, idx) => (
            <Reveal
              key={p.title}
              delay={idx * 120}
              className={`border-navy/15 py-12 lg:pb-16 lg:pr-10 ${p.pad} ${idx > 0 ? 'border-t lg:border-l lg:border-t-0 lg:pl-10' : ''}`}
            >
              <p className="eyebrow text-gold">{p.label}</p>
              <h2 className="display mt-4 text-[2rem] leading-[1.05] text-navy">{p.title}</h2>
              <p className="mt-4 text-[0.97rem] leading-relaxed text-ink-soft">{p.desc}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      {/* Chapters */}
      <section className="py-24 lg:py-36">
        <Container className="space-y-28 lg:space-y-40">
          {services.map((svc, idx) => {
            const flip = idx % 2 === 1;
            return (
              <article key={svc.id} id={svc.id} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:gap-8">
                <div className={`lg:col-span-4 ${flip ? 'lg:order-2 lg:col-start-10' : ''}`}>
                  <Reveal className="lg:sticky lg:top-32">
                    <span aria-hidden className="outline-num block text-[clamp(6rem,13vw,12rem)]">
                      {svc.num}
                    </span>
                    <Glyph name={svc.glyph} className="mt-8 h-28 w-28" />
                  </Reveal>
                </div>

                <div className={`lg:col-span-7 ${flip ? 'lg:order-1 lg:col-start-2' : 'lg:col-start-6'}`}>
                  <Reveal>
                    {svc.upcoming ? <Stamp>{svc.badge}</Stamp> : <p className="eyebrow text-gold">{svc.badge}</p>}
                    <h2 className="display mt-5 text-[clamp(2.3rem,4.6vw,4rem)] text-navy">{svc.title}</h2>
                    <p className="lede mt-7">{svc.desc}</p>
                  </Reveal>
                  <Reveal delay={120}>
                    <h3 className="eyebrow mt-14 text-ink-soft">{t('svc.scope_h')}</h3>
                    <ol className="mt-4 border-t border-navy/20">
                      {svc.bullets.map((b, n) => (
                        <li key={b} className="flex items-baseline gap-6 border-b border-navy/15 py-5">
                          <span className="w-6 shrink-0 font-display italic text-gold">{String.fromCharCode(97 + n)}.</span>
                          <span className="text-[1.08rem] text-ink">{b}</span>
                        </li>
                      ))}
                    </ol>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </Container>
      </section>

      {/* Integrated — the overlap */}
      <section id="integrated" className="scroll-mt-20 border-t border-navy/15 bg-sand-light/70 py-24 lg:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <Eyebrow n="05">{t('svc.b3_label')}</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.3rem,4.4vw,3.8rem)] text-navy">
              <Rich html={t('svc.intg_h')} />
            </h2>
            <div className="mt-10 max-w-md">
              <Venn />
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7 lg:pt-24">
            <p className="lede">{t('svc.intg_p')}</p>
            <h3 className="eyebrow mt-12 text-ink-soft">{t('svc.feat_h')}</h3>
            <ul className="mt-4 border-t border-navy/20">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-4 border-b border-navy/15 py-4 text-[1.02rem]">
                  <StarGlyph className="h-3 w-3 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink to="contact">{t('svc.intg_btn')}</ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        label={t('svc.cta_label')}
        title={t('svc.cta_title')}
        sub={t('svc.cta_sub')}
        primary={{ to: 'contact', label: t('svc.cta_btn') }}
      />
    </>
  );
};
