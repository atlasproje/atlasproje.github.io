import { useLanguage } from '../context/LanguageContext';
import { PageLink } from '../components/PageLink';
import { CtaBand } from '../components/Blocks';
import { Hero } from '../components/Hero';
import { ServicesIndex } from '../components/ServiceCatalog';
import { TechneosSpotlight } from '../components/TechneosSpotlight';
import { Container, Reveal, Rich, StarGlyph } from '../components/ui';

const Manifesto = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 lg:py-36">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-2">
            <span aria-hidden className="display block text-[8rem] leading-[0.7] text-gold lg:text-[11rem]">
              “
            </span>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-9 lg:col-start-3">
            <blockquote className="display text-[clamp(2rem,4.6vw,4rem)] leading-[1.1] text-navy">
              <Rich html={t('manifesto.quote')} />
            </blockquote>
            <p className="mt-10 flex flex-wrap items-center gap-4 text-ink-soft">
              <StarGlyph className="h-3.5 w-3.5 text-oxblood" />
              <span className="eyebrow">{t('manifesto.attrib')}</span>
              <PageLink to="about" section="values" className="u-link text-[0.95rem] font-medium text-navy">
                {t('val.title')} →
              </PageLink>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

export const Home = () => {
  const { t } = useLanguage();
  return (
    <>
      <Hero />
      <ServicesIndex />
      <TechneosSpotlight />
      <Manifesto />
      <CtaBand
        label={t('cta.label')}
        title={t('cta.title')}
        sub={t('cta.sub')}
        primary={{ to: 'contact', label: t('nav.contact') }}
        secondary={{ to: 'services', label: t('nav.services') }}
      />
    </>
  );
};
