import { useLanguage } from '../context/LanguageContext';
import { PageLink } from './PageLink';
import type { Page } from '../lib/router';
import { Container, Rich } from './ui';
import { LOGO_ATLAS } from '../lib/assets';
import { CONTACT_EMAIL, MAPS_URL } from '../lib/constants';

const SHEET: Record<Page, string> = { home: '01', services: '02', about: '03', contact: '04' };

export const Footer = ({ currentPage }: { currentPage: Page }) => {
  const { t } = useLanguage();

  const pages: { id: Page; label: string }[] = [
    { id: 'home', label: t('nav.home') },
    { id: 'services', label: t('nav.services') },
    { id: 'about', label: t('nav.about') },
    { id: 'contact', label: t('footer.contact') },
  ];

  const services: { section: string; label: string }[] = [
    { section: 'mechanical-mep', label: t('footer.mech_eng') },
    { section: 'ai-workflows', label: t('footer.sw_dev') },
    { section: 'data-science', label: t('footer.data_sci') },
    { section: 'integrated', label: t('footer.integrated') },
  ];

  // Drawing-sheet title block, as found in the corner of every engineering drawing
  const titleBlock = [
    { k: 'Atlas Proje', v: 'Müşavirlik Mühendislik İnşaat Taahhüt Tic. Ltd. Şti.', wide: true },
    { k: t('footer.drawn'), v: 'İ.Ü. · M.Ü.' },
    { k: t('footer.scale'), v: '1 : 1' },
    { k: t('footer.sheet'), v: `${SHEET[currentPage]} / 04` },
  ];

  return (
    <footer className="on-dark relative overflow-hidden bg-navy-deep text-paper">
      <Container className="pt-20 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <PageLink to="home" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper p-1.5">
                <img src={LOGO_ATLAS} alt="" className="h-full w-full object-contain" />
              </span>
              <span className="display text-2xl">Atlas Proje</span>
            </PageLink>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-paper/65">{t('footer.brand_desc')}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <h2 className="eyebrow text-gold-light">{t('footer.pages')}</h2>
            <ul className="mt-5 space-y-2.5">
              {pages.map((p) => (
                <li key={p.id}>
                  <PageLink to={p.id} className="u-grow text-[0.95rem] text-paper/80 hover:text-paper">
                    {p.label}
                  </PageLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-gold-light">{t('footer.svc_heading')}</h2>
            <ul className="mt-5 space-y-2.5">
              {services.map((s) => (
                <li key={s.section}>
                  <PageLink to="services" section={s.section} className="u-grow text-[0.95rem] text-paper/80 hover:text-paper">
                    {s.label}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-gold-light">{t('footer.cnt_heading')}</h2>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 block text-[0.95rem] text-paper/80 transition-colors hover:text-paper"
            >
              <address className="not-italic leading-relaxed">
                Reşatbey Mah. 62010 Sokak
                <br />
                N:32 Erçin Apt. Kat:2 D:6
                <br />
                Seyhan / Adana
              </address>
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="u-link mt-4 inline-block break-all text-[0.95rem] text-paper">
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* title block */}
        <dl className="mt-20 grid grid-cols-2 gap-px border border-paper/20 bg-paper/20 font-mono text-[0.7rem] uppercase tracking-[0.1em] md:grid-cols-6">
          {titleBlock.map((cell) => (
            <div
              key={cell.k}
              className={`bg-navy-deep p-3 last:col-span-2 md:last:col-span-1 ${cell.wide ? 'col-span-2 md:col-span-3' : ''}`}
            >
              <dt className="text-paper/45">{cell.k}</dt>
              <dd className="mt-1 text-paper/85">{cell.v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-col gap-4 py-8 text-[0.8rem] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <Rich html={t('footer.copyright')} />
          <span className="flex items-center gap-6">
            <span className="font-display italic">{t('footer.tagline')}</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="eyebrow u-grow text-paper/70 hover:text-paper"
            >
              ↑ {t('footer.top')}
            </button>
          </span>
        </div>
      </Container>

      <p
        aria-hidden
        className="display pointer-events-none -mb-[0.2em] select-none whitespace-nowrap pl-3 text-[clamp(5rem,21vw,19rem)] leading-[0.9] text-gold/80 sm:pl-6"
      >
        Atlas <em className="!text-sand/25">Proje</em>
      </p>
    </footer>
  );
};
