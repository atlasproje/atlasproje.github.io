import { useLanguage } from '../context/LanguageContext';
import { Eyebrow, Reveal } from './ui';

/** Monogram set inside the pointed arch from the Atlas mark. */
const ArchPortrait = ({ initials }: { initials: string }) => (
  <svg viewBox="0 0 120 160" className="w-28 sm:w-full" aria-hidden>
    <path d="M0 160 V70 C0 36 26 16 60 0 C94 16 120 36 120 70 V160 Z" className="fill-navy" />
    <path
      d="M10 160 V73 C10 44 32 26 60 12 C88 26 110 44 110 73 V160"
      fill="none"
      className="stroke-gold"
      strokeWidth="1.2"
      filter="url(#rough)"
    />
    <text x={60} y={108} textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="40" className="fill-gold-light">
      {initials}
    </text>
  </svg>
);

export const Team = () => {
  const { t } = useLanguage();

  const members = [
    {
      initials: 'İÜ',
      name: 'İlmiz Ünlü',
      title: t('team.ilmaz_ttl'),
      bio: t('team.ilmaz_bio'),
      tags: [t('tag.mech_eng'), t('tag.tech_draw'), t('tag.structural'), t('tag.constr_mgmt'), t('tag.proj_cons')],
      offset: '',
    },
    {
      initials: 'MÜ',
      name: 'Metin Ünlü',
      title: t('team.aysuhan_ttl'),
      bio: t('team.aysuhan_bio'),
      tags: [t('tag.sw_dev'), t('tag.data_sci'), t('tag.ml'), t('tag.api'), t('tag.db'), t('tag.intl'), t('tag.ai_eng'), t('tag.llm')],
      offset: 'lg:mt-32',
    },
  ];

  return (
    <div>
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Eyebrow n="04">{t('team.label')}</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.6rem,5.4vw,4.8rem)] text-navy">{t('team.title')}</h2>
        </div>
        <p className="lede lg:col-span-4 lg:col-start-8">{t('team.sub')}</p>
      </Reveal>

      <div className="mt-16 grid gap-20 lg:grid-cols-2 lg:gap-16">
        {members.map((m, idx) => (
          <Reveal key={m.name} delay={idx * 150} className={m.offset}>
            <article className="grid gap-8 sm:grid-cols-[8.5rem_1fr]">
              <ArchPortrait initials={m.initials} />
              <div>
                <h3 className="display text-[2.3rem] leading-none text-navy">{m.name}</h3>
                <p className="mt-2 font-display text-lg italic text-oxblood">{m.title}</p>
                <p className="mt-5 leading-relaxed text-ink-soft">{m.bio}</p>
                <p className="eyebrow mt-7 text-gold">{t('team.focus')}</p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-ink">{m.tags.join('  ·  ')}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
};
