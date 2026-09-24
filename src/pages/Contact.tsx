import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/Blocks';
import { ContactForm } from '../components/ContactForm';
import { Container, Eyebrow, Reveal } from '../components/ui';

const EMAIL = 'metinunlu97@gmail.com';
const MAPS_URL = 'https://maps.google.com/?q=Reşatbey+Mahallesi+Cumhuriyet+Caddesi+Seyhan+Adana+Turkey';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

const MAIN_STREET = 'M-10 150 C 200 136, 520 148, 810 118';
const RIVER = 'M150 -10 C 210 80, 120 170, 190 250 S 250 350, 220 390';

/** Schematic sketch of the neighbourhood: the Seyhan river, Cumhuriyet Caddesi and the office. */
const SeyhanSketch = () => (
  <svg viewBox="0 0 800 380" className="drawing h-auto w-full" role="img" aria-label="Reşatbey, Seyhan / Adana — schematic">
    <defs>
      <path id="street-main" d={MAIN_STREET} />
    </defs>
    <g filter="url(#rough)" fill="none" strokeLinecap="round">
      {/* river */}
      <path d={RIVER} className="fade stroke-navy" strokeOpacity=".12" strokeWidth="46" style={i(0)} />
      <path d={RIVER} className="ln stroke-navy" strokeOpacity=".4" strokeWidth="1" pathLength={1} style={i(0)} />
      {/* minor streets */}
      {[
        'M260 -10 L300 390',
        'M390 -10 L372 390',
        'M540 -10 L590 390',
        'M680 -10 L650 390',
        'M230 250 L810 228',
        'M240 60 L810 40',
        'M240 330 L810 300',
        'M300 150 L520 390',
      ].map((d, n) => (
        <path key={d} d={d} className="ln stroke-navy" strokeOpacity=".22" strokeWidth="1" pathLength={1} style={i(n + 1)} />
      ))}
      {/* Cumhuriyet Caddesi */}
      <path d={MAIN_STREET} className="ln stroke-navy" strokeOpacity=".7" strokeWidth="2.4" pathLength={1} style={i(4)} />
      {/* bridge */}
      <path d="M140 140 L230 142 M140 156 L230 158" className="ln stroke-navy" strokeWidth="1.2" pathLength={1} style={i(6)} />
      {/* office crosshair */}
      <circle cx={456} cy={141} r={18} className="ln stroke-oxblood" strokeWidth="1.4" pathLength={1} style={i(9)} />
      <path d="M456 111 V131 M456 151 V171 M426 141 H446 M466 141 H486" className="ln stroke-oxblood" strokeWidth="1.4" pathLength={1} style={i(10)} />
    </g>
    <circle cx={456} cy={141} r={4} className="fade fill-oxblood" style={i(10)} />

    <g className="fade" style={i(11)}>
      <text className="fill-navy font-mono" fontSize="11" letterSpacing="2.4">
        <textPath href="#street-main" startOffset="62%">
          CUMHURİYET CAD.
        </textPath>
      </text>
      <text x={120} y={300} className="fill-navy/70 font-display" fontStyle="italic" fontSize="22" transform="rotate(-72 120 300)">
        Seyhan
      </text>
      <g transform="translate(476 180)">
        <rect width={196} height={46} className="fill-paper-light stroke-navy/30" />
        <text x={12} y={19} className="fill-navy font-mono" fontSize="11" letterSpacing="1.2">
          ATLAS PROJE
        </text>
        <text x={12} y={35} className="fill-ink-soft font-mono" fontSize="10">
          Gürbiçer Apt. · Asma Kat 6
        </text>
      </g>
      <text x={784} y={364} textAnchor="end" className="fill-ink-soft font-mono" fontSize="10.5" letterSpacing="1.5">
        37°00′N 35°19′E
      </text>
      <g transform="translate(752 48)">
        <path d="M0 -18 L4 0 L0 18 L-4 0 Z" className="fill-none stroke-navy" />
        <path d="M0 -18 L4 0 L-4 0 Z" className="fill-navy" />
        <text y={-24} textAnchor="middle" className="fill-navy font-display" fontStyle="italic" fontSize="13">
          N
        </text>
      </g>
    </g>
  </svg>
);

export const Contact = () => {
  const { t } = useLanguage();

  const details = [
    {
      label: t('cnt.addr_label'),
      value: (
        <address className="not-italic">
          Reşatbey Mah. Cumhuriyet Cad.
          <br />
          Gürbiçer Apt. Asma Kat No:6
          <br />
          Seyhan / Adana, Türkiye
        </address>
      ),
    },
    {
      label: t('cnt.email_lbl'),
      value: (
        <a href={`mailto:${EMAIL}`} className="u-link break-all text-navy">
          {EMAIL}
        </a>
      ),
    },
    {
      label: t('cnt.reg_label'),
      value: (
        <>
          Adana Ticaret Sicil Memurluğu
          <br />
          Sicil No: 49321
        </>
      ),
    },
    { label: t('cnt.work_label'), value: t('cnt.work_value') },
  ];

  const steps = [
    { title: t('cnt.step1_title'), text: t('cnt.step1_text') },
    { title: t('cnt.step2_title'), text: t('cnt.step2_text') },
    { title: t('cnt.step3_title'), text: t('cnt.step3_text') },
  ];

  return (
    <>
      <PageHero
        n="04"
        crumb={t('bc.contact')}
        label={t('cnt.hero_label')}
        title={t('cnt.hero_title')}
        sub={t('cnt.hero_sub')}
        aside={
          <a href={`mailto:${EMAIL}`} className="group block border-l border-navy/20 pl-4">
            <span className="eyebrow text-gold">{t('cnt.email_lbl')}</span>
            <span className="mt-2 block break-all font-display text-lg italic text-navy group-hover:text-oxblood">{EMAIL}</span>
          </a>
        }
      />

      <section className="pb-24 lg:pb-32">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-16 lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-gold">{t('cnt.info_label')}</p>
              <dl className="mt-6 border-t border-navy/20">
                {details.map((d) => (
                  <div key={d.label} className="border-b border-navy/15 py-5">
                    <dt className="eyebrow text-[0.66rem] text-ink-soft">{d.label}</dt>
                    <dd className="mt-2 leading-relaxed text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="display text-[2.2rem] text-navy">{t('cnt.next_title')}</h2>
              <ol className="mt-8 space-y-7">
                {steps.map((s, n) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="display text-[2.4rem] italic leading-[0.9] text-gold">{n + 1}</span>
                    <div>
                      <h3 className="font-medium text-navy">{s.title}</h3>
                      <p className="mt-1 text-[0.93rem] leading-relaxed text-ink-soft">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-navy/15 bg-sand-light/70 py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-6">
              <Eyebrow n="05">{t('cnt.loc_label')}</Eyebrow>
              <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,4rem)] text-navy">{t('cnt.loc_title')}</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
              <p className="text-ink-soft">{t('cnt.loc_sub')}</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-navy/35 px-5 py-3 text-[0.92rem] font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-paper"
              >
                {t('cnt.map_btn')}
                <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={150} className="mt-14 overflow-hidden border border-sand bg-paper-light">
            <SeyhanSketch />
          </Reveal>
        </Container>
      </section>
    </>
  );
};
