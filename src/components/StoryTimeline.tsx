import { useLanguage } from '../context/LanguageContext';
import { Reveal, StarGlyph } from './ui';

export const StoryTimeline = () => {
  const { t } = useLanguage();

  const items = [
    { year: t('tl.apr2006'), title: t('tl.founded_h'), desc: t('tl.founded_t') },
    { year: t('tl.era1'), title: t('tl.excel_h'), desc: t('tl.excel_t') },
    { year: t('tl.era2'), title: t('tl.tech_h'), desc: t('tl.tech_t') },
    { year: t('tl.today'), title: t('tl.intgr_h'), desc: t('tl.intgr_t') },
  ];

  return (
    <div>
      <Reveal>
        <h2 className="display text-[clamp(2.4rem,4.6vw,4rem)] text-navy">{t('about.journey_title')}</h2>
      </Reveal>
      <ol className="mt-12 border-b border-navy/15">
        {items.map((item, idx) => (
          <li key={item.title} className="border-t border-navy/15">
            <Reveal delay={idx * 90} className="grid gap-3 py-9 sm:grid-cols-[11rem_1fr] sm:gap-8">
              <p className="flex items-start gap-3 font-display text-[1.35rem] italic leading-tight text-gold">
                <StarGlyph className={`mt-1.5 h-3 w-3 shrink-0 ${idx === items.length - 1 ? 'text-oxblood' : 'text-gold'}`} />
                {item.year}
              </p>
              <div>
                <h3 className="display text-[1.9rem] leading-[1.1] text-navy">{item.title}</h3>
                <p className="mt-3 max-w-[58ch] leading-relaxed text-ink-soft">{item.desc}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
};
