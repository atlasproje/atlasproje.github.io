import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageLink } from './PageLink';
import { useServices } from '../lib/services';
import { Container, Eyebrow, Reveal, Stamp } from './ui';

/** Home page index of services — an editorial table of contents rather than a card grid. */
export const ServicesIndex = () => {
  const { t } = useLanguage();
  const services = useServices();

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow n="02">{t('idx.svc_label')}</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.8rem,6.5vw,5.6rem)] text-navy">{t('idx.svc_title')}</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <p className="lede">{t('idx.svc_sub')}</p>
          </Reveal>
        </div>

        <ol className="border-b border-navy/15">
          {services.map((svc, idx) => (
            <li key={svc.id} className="border-t border-navy/15">
              <Reveal delay={idx * 80}>
                <PageLink
                  to="services"
                  section={svc.id}
                  className="group relative isolate grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-8 lg:py-11"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-5 -right-5 -z-10 origin-left scale-x-0 bg-sand/45 transition-transform duration-700 ease-out-soft group-hover:scale-x-100 sm:-left-8 sm:-right-8"
                  />
                  <span className="eyebrow col-span-2 text-gold lg:col-span-1">{svc.num}</span>
                  <h3 className="display col-span-10 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.05] text-navy transition-transform duration-700 ease-out-soft group-hover:translate-x-2 lg:col-span-6">
                    {svc.title}
                    {svc.upcoming && <Stamp className="ml-3 align-middle">{svc.badge}</Stamp>}
                  </h3>
                  <p className="col-span-10 col-start-3 text-[0.97rem] leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-auto">
                    {svc.desc}
                  </p>
                  <span className="col-span-1 hidden justify-end self-center lg:flex">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/25 text-navy transition-all duration-500 group-hover:border-oxblood group-hover:bg-oxblood group-hover:text-paper">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                    </span>
                  </span>
                </PageLink>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-10 flex justify-end">
          <PageLink to="services" className="u-link text-[0.95rem] font-medium text-navy">
            {t('svc.view_all')} →
          </PageLink>
        </Reveal>
      </Container>
    </section>
  );
};
