import { useLanguage } from '../context/LanguageContext';
import { ButtonLink, Container, Reveal, Rich } from './ui';
import { PageLink } from './PageLink';
import { StarPlate } from './StarPlate';

export const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '18+', label: t('hero.stat1_lbl'), offset: 'lg:mt-0' },
    { value: '2', label: t('hero.stat2_lbl'), offset: 'lg:mt-10' },
    { value: '2', label: t('hero.stat3_lbl'), offset: 'lg:mt-4' },
  ];

  return (
    <section className="relative overflow-hidden pb-20 pt-6 sm:pt-10 lg:pb-28">
      {/* The drawing bleeds off the right edge on large screens */}
      <Reveal className="pointer-events-none absolute -right-[12%] top-[-7%] hidden w-[min(54vw,760px)] lg:block">
        <StarPlate />
      </Reveal>

      <Container className="relative">
        <Reveal>
          <p className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-soft">
            <span className="text-gold">N° 01</span>
            <span aria-hidden className="h-px w-10 bg-navy/30" />
            <Rich html={t('hero.eyebrow')} />
            <span aria-hidden className="hidden h-px w-10 bg-navy/30 sm:block" />
            <span className="hidden sm:inline">37°00′N 35°19′E</span>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display display-mark mt-8 max-w-[11ch] text-[clamp(3.3rem,10vw,9.5rem)] text-navy sm:mt-12">
            <Rich html={t('hero.title')} />
          </h1>
        </Reveal>

        {/* Mobile: the drawing sits under the headline, cropped */}
        <Reveal className="pointer-events-none -mx-5 -mb-16 mt-2 overflow-hidden sm:-mx-8 lg:hidden">
          <StarPlate className="ml-[18%] w-[110%] max-w-none" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={200} className="lg:col-span-6 lg:col-start-3">
            <p className="lede">{t('hero.desc')}</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <ButtonLink to="services">{t('hero.btn_services')}</ButtonLink>
              <PageLink to="contact" className="u-link text-[0.95rem] font-medium text-navy">
                {t('hero.btn_contact')}
              </PageLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={400}>
          <dl className="mt-20 grid grid-cols-3 gap-4 border-t border-navy/15 pt-8 sm:gap-8 lg:mt-24 lg:max-w-[62%]">
            {stats.map((s) => (
              <div key={s.label} className={`flex flex-col-reverse ${s.offset}`}>
                <dt className="mt-2 text-[0.85rem] leading-snug text-ink-soft">{s.label}</dt>
                <dd className="display text-[clamp(2.6rem,5vw,4.2rem)] text-navy">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
};
