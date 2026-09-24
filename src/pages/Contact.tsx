import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHero } from '../components/Blocks';
import { ContactForm } from '../components/ContactForm';
import { Container, Eyebrow, Reveal } from '../components/ui';
import { CONTACT_EMAIL as EMAIL, MAPS_URL } from '../lib/constants';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// Paths run south → north so their labels read upwards.
const ADALET = 'M350 335 L378 60';
const FUZULI = 'M440 392 C 468 262, 504 122, 524 -10';
const D400 = 'M-10 298 C 200 302, 390 326, 520 342 S 720 366, 810 376';
const RIVER = 'M708 -10 C 714 60, 772 130, 752 205 S 668 318, 612 392';
const PARK = 'M537 -10 L684 -10 C 690 60, 746 128, 728 205 C 714 262, 672 300, 636 348 L462 330 C 484 236, 514 110, 537 -10 Z';

/** Schematic sketch of the neighbourhood: Adalet Caddesi, Seyhan Merkez Park, the Seyhan river and the office. */
const SeyhanSketch = () => (
  <svg viewBox="0 0 800 380" className="drawing h-auto w-full" role="img" aria-label="Seyhan / Adana — schematic">
    <defs>
      <path id="street-adalet" d={ADALET} />
      <path id="street-fuzuli" d={FUZULI} />
      <path id="street-d400" d={D400} />
      <pattern id="park-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
        <path d="M0 0 V7" className="stroke-gold" strokeOpacity=".35" strokeWidth="1" />
      </pattern>
    </defs>
    <g filter="url(#rough)" fill="none" strokeLinecap="round">
      {/* Seyhan Merkez Park + Atatürk Parkı */}
      <path d={PARK} fill="url(#park-hatch)" className="fade" style={i(0)} />
      <path d={PARK} className="ln stroke-gold" strokeOpacity=".6" strokeWidth="1" pathLength={1} style={i(1)} />
      <rect x={24} y={62} width={116} height={92} fill="url(#park-hatch)" className="fade" style={i(0)} />
      <rect x={24} y={62} width={116} height={92} className="ln stroke-gold" strokeOpacity=".5" strokeWidth="1" pathLength={1} style={i(1)} />
      {/* park footpaths */}
      {[
        'M562 132 a 50 32 -8 1 0 100 -14 a 50 32 -8 1 0 -100 14',
        'M548 214 a 16 16 0 1 0 32 0 a 16 16 0 1 0 -32 0',
        'M520 70 C 560 96, 600 90, 640 60',
        'M506 176 C 540 170, 552 192, 548 214 M580 214 C 620 222, 660 250, 690 250',
        'M612 150 C 606 200, 580 250, 560 334',
      ].map((d, n) => (
        <path key={d} d={d} className="ln stroke-gold" strokeOpacity=".55" strokeWidth=".9" pathLength={1} style={i(n + 2)} />
      ))}
      {/* river */}
      <path d={RIVER} className="fade stroke-navy" strokeOpacity=".12" strokeWidth="46" style={i(0)} />
      <path d={RIVER} className="ln stroke-navy" strokeOpacity=".4" strokeWidth="1" pathLength={1} style={i(0)} />
      {/* minor streets */}
      {[
        'M20 -10 L40 392',
        'M146 -10 L190 392',
        'M330 -10 L290 300',
        'M410 232 L392 322',
        'M150 104 L512 28',
        'M255 84 L516 112',
        'M240 118 L506 150',
        'M250 180 L488 215',
        'M160 212 L478 256',
        'M150 250 L470 292',
        'M-10 50 L146 40',
        'M-10 226 L160 212',
        'M258 392 L280 312',
      ].map((d, n) => (
        <path key={d} d={d} className="ln stroke-navy" strokeOpacity=".22" strokeWidth="1" pathLength={1} style={i(n + 1)} />
      ))}
      {/* Fuzuli Caddesi + D400 */}
      <path d={FUZULI} className="ln stroke-navy" strokeOpacity=".45" strokeWidth="1.8" pathLength={1} style={i(3)} />
      <path d={D400} className="ln stroke-navy" strokeOpacity=".45" strokeWidth="1.8" pathLength={1} style={i(3)} />
      {/* Adalet Caddesi */}
      <path d={ADALET} className="ln stroke-navy" strokeOpacity=".7" strokeWidth="2.4" pathLength={1} style={i(4)} />
      {/* bridge */}
      <path d="M602 345 L690 355 M602 360 L690 370" className="ln stroke-navy" strokeWidth="1.2" pathLength={1} style={i(6)} />
      {/* office crosshair */}
      <circle cx={367} cy={163} r={18} className="ln stroke-oxblood" strokeWidth="1.4" pathLength={1} style={i(9)} />
      <path d="M367 133 V153 M367 173 V193 M337 163 H357 M377 163 H397" className="ln stroke-oxblood" strokeWidth="1.4" pathLength={1} style={i(10)} />
    </g>
    <circle cx={367} cy={163} r={4} className="fade fill-oxblood" style={i(10)} />

    <g className="fade" style={i(11)}>
      <text className="fill-navy font-mono" fontSize="11" letterSpacing="2.4" dy={-6}>
        <textPath href="#street-adalet" startOffset="4%">
          ADALET CAD.
        </textPath>
      </text>
      <text className="fill-navy/70 font-mono" fontSize="9" letterSpacing="2" dy={-6}>
        <textPath href="#street-fuzuli" startOffset="22%">
          FUZULİ CAD.
        </textPath>
      </text>
      <text className="fill-navy/70 font-mono" fontSize="9" letterSpacing="2" dy={-6}>
        <textPath href="#street-d400" startOffset="30%">
          D400
        </textPath>
      </text>
      <text x={200} y={87} className="fill-navy/60 font-mono" fontSize="8" letterSpacing="1.2" transform="rotate(-12 200 87)">
        STADYUM CAD.
      </text>
      <text x={390} y={137} className="fill-navy/60 font-mono" fontSize="8" letterSpacing="1.2" transform="rotate(7 390 137)">
        62012. SOKAK
      </text>
      <text x={390} y={199} className="fill-navy/60 font-mono" fontSize="8" letterSpacing="1.2" transform="rotate(8.4 390 199)">
        62010. SOKAK
      </text>
      <text x={82} y={112} textAnchor="middle" className="fill-gold font-display" fontStyle="italic" fontSize="12">
        Atatürk Parkı
      </text>
      <text x={612} y={262} textAnchor="middle" className="fill-gold font-display" fontStyle="italic" fontSize="16">
        <tspan x={612}>Seyhan</tspan>
        <tspan x={612} dy={18}>Merkez Park</tspan>
      </text>
      <text x={706} y={300} className="fill-navy/70 font-display" fontStyle="italic" fontSize="22" transform="rotate(-56 706 300)">
        Seyhan
      </text>
      <g transform="translate(168 186)">
        <rect width={170} height={46} className="fill-paper-light stroke-navy/30" />
        <text x={12} y={19} className="fill-navy font-mono" fontSize="11" letterSpacing="1.2">
          ATLAS PROJE
        </text>
        <text x={12} y={35} className="fill-ink-soft font-mono" fontSize="10">
          Seyhan / Adana
        </text>
      </g>
      <text x={56} y={364} className="fill-ink-soft font-mono" fontSize="10.5" letterSpacing="1.5">
        37°00′N 35°19′E
      </text>
      <g transform="translate(776 48)">
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
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <address className="not-italic leading-relaxed transition-colors group-hover:text-oxblood">
            Reşatbey Mah. 62010 Sokak
            <br />
            N:32 Erçin Apt. Kat:2 D:6
            <br />
            {t('reg.location_val')}
          </address>
        </a>
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
