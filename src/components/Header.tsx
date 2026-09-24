import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageLink } from './PageLink';
import type { Page } from '../lib/router';
import { StarGlyph } from './ui';
import { LOGO_ATLAS } from '../lib/assets';

interface HeaderProps {
  currentPage: Page;
}

const LanguageToggle = ({ className = '' }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={`eyebrow flex items-center gap-1.5 ${className}`}>
      {(['tr', 'en'] as const).map((lang, i) => (
        <span key={lang} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden className="opacity-40">/</span>}
          <button
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            className={`transition-colors ${language === lang ? 'text-current' : 'opacity-45 hover:opacity-100'}`}
          >
            {lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
};

export const Header = ({ currentPage }: HeaderProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => setIsOpen(false), [currentPage]);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'services', label: t('nav.services') },
    { id: 'about', label: t('nav.about') },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
          scrolled
            ? 'bg-paper/85 py-3 shadow-[0_1px_0_0_rgb(35_62_101_/_0.12)] backdrop-blur-md'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <PageLink to="home" className="group flex items-center gap-3" aria-label="Atlas Proje">
            <img
              src={LOGO_ATLAS}
              alt=""
              className="h-9 w-9 object-contain transition-transform duration-[1.2s] ease-out-soft group-hover:rotate-[45deg]"
            />
            <span className="flex flex-col leading-none">
              <span className="display text-[1.35rem] tracking-[-0.02em] text-navy">Atlas Proje</span>
              <span className="eyebrow mt-1 hidden text-[0.6rem] text-ink-soft sm:block">{t('logo.sub')}</span>
            </span>
          </PageLink>

          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const active = currentPage === link.id;
                return (
                  <li key={link.id}>
                    <PageLink
                      to={link.id}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative flex items-center gap-2 text-[0.95rem] transition-colors ${
                        active ? 'text-navy' : 'text-ink-soft hover:text-navy'
                      }`}
                    >
                      <StarGlyph
                        className={`h-2.5 w-2.5 text-gold transition-all duration-500 ${
                          active ? 'scale-100 opacity-100' : 'scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-60'
                        }`}
                      />
                      {link.label}
                    </PageLink>
                  </li>
                );
              })}
            </ul>

            <LanguageToggle className="text-navy" />

            <PageLink
              to="contact"
              aria-current={currentPage === 'contact' ? 'page' : undefined}
              className="rounded-full bg-oxblood px-5 py-2.5 text-[0.9rem] font-medium text-paper transition-colors duration-300 hover:bg-oxblood-deep"
            >
              {t('nav.contact')}
            </PageLink>
          </nav>

          <button
            onClick={() => setIsOpen(true)}
            className="eyebrow flex items-center gap-2 text-navy md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {t('nav.menu')}
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span className="block h-px w-6 bg-navy" />
              <span className="block h-px w-4 self-end bg-navy" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu — full-screen sheet (outside the header: its backdrop-filter would trap position: fixed) */}
      <div
        id="mobile-menu"
        className={`on-dark fixed inset-0 z-[60] flex flex-col bg-navy-deep text-paper transition-[opacity,visibility] duration-500 md:hidden ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <LanguageToggle className="text-paper" />
          <button onClick={() => setIsOpen(false)} className="eyebrow text-paper">
            {t('nav.close')} ✕
          </button>
        </div>
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-5 sm:px-8">
          <ol className="space-y-3">
            {(['home', 'services', 'about', 'contact'] as Page[]).map((id, i) => (
              <li
                key={id}
                className={`transition-all duration-700 ease-out-soft ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
                style={{ transitionDelay: isOpen ? `${120 + i * 70}ms` : '0ms' }}
              >
                <PageLink
                  to={id}
                  onClick={() => setIsOpen(false)}
                  tabIndex={isOpen ? 0 : -1}
                  className="flex items-baseline gap-4"
                >
                  <span className="eyebrow text-gold-light">0{i + 1}</span>
                  <span className={`display text-5xl ${currentPage === id ? 'italic text-gold-light' : ''}`}>
                    {t(id === 'home' ? 'nav.home' : id === 'contact' ? 'bc.contact' : id === 'services' ? 'nav.services' : 'nav.about')}
                  </span>
                </PageLink>
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow px-5 pb-8 text-paper/50 sm:px-8">Adana · 37°00′N 35°19′E</p>
      </div>
    </>
  );
};
