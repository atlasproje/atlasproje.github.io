import { useLanguage } from '../context/LanguageContext';
import { CtaBand, PageHero } from '../components/Blocks';
import { RegistryCard } from '../components/RegistryCard';
import { StoryTimeline } from '../components/StoryTimeline';
import { Team } from '../components/Team';
import { Container, Eyebrow, Reveal } from '../components/ui';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export const About = () => {
  const { t } = useLanguage();

  const values = [
    { title: t('val.prec_h'), text: t('val.prec_t') },
    { title: t('val.comm_h'), text: t('val.comm_t') },
    { title: t('val.inno_h'), text: t('val.inno_t') },
    { title: t('val.intg_h'), text: t('val.intg_t') },
    { title: t('val.grow_h'), text: t('val.grow_t') },
    { title: t('val.glob_h'), text: t('val.glob_t') },
  ];

  return (
    <>
      <PageHero
        n="03"
        crumb={t('bc.about')}
        label={t('about.hero_label')}
        title={t('about.hero_title')}
        sub={t('about.hero_sub')}
        aside={
          <p className="border-l border-navy/20 pl-4 font-mono text-[0.75rem] leading-relaxed text-ink-soft">
            Sicil No 49321
            <br />
            {t('reg.founded_val')}
            <br />
            Seyhan / Adana
          </p>
        }
      />

      {/* Story + registry */}
      <section className="pb-24 pt-8 lg:pb-36">
        <Container className="grid gap-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <StoryTimeline />
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-28">
            <Reveal delay={150} className="lg:sticky lg:top-32">
              <p className="eyebrow mb-8 text-gold">{t('about.registry_label')}</p>
              <RegistryCard />
              <p className="mt-6 text-[0.9rem] leading-relaxed text-ink-soft">{t('reg.sub')}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Founders */}
      <section className="border-y border-navy/15 bg-sand-light/70 py-24 lg:py-32">
        <Container>
          <Team />
        </Container>
      </section>

      {/* Values */}
      <section id="values" className="scroll-mt-20 py-24 lg:py-36">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-32">
              <Eyebrow n="05">{t('val.label')}</Eyebrow>
              <h2 className="display mt-6 text-[clamp(2.6rem,5vw,4.4rem)] text-navy">{t('val.title')}</h2>
              <p className="lede mt-6">{t('val.sub')}</p>
            </Reveal>
          </div>
          <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {values.map((v, idx) => (
              <li key={v.title} className={idx % 2 === 1 ? 'sm:translate-y-16' : ''}>
                <Reveal delay={(idx % 2) * 120} className="border-t border-navy/20 pb-12 pt-6">
                  <span className="font-display text-xl italic text-gold">{NUMERALS[idx]}.</span>
                  <h3 className="display mt-2 text-[1.9rem] text-navy">{v.title}</h3>
                  <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{v.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand
        label={t('about_vis.label')}
        title={t('about_vis.title')}
        sub={t('about_vis.sub')}
        primary={{ to: 'services', label: t('about_vis.btn1') }}
        secondary={{ to: 'contact', label: t('about_vis.btn2') }}
      />
    </>
  );
};
