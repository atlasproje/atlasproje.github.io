import { useEffect, useState } from 'react';

export type Page = 'home' | 'services' | 'about' | 'contact';

const PAGES: Page[] = ['home', 'services', 'about', 'contact'];

interface Route {
  page: Page;
  section?: string;
}

// Hash routes keep GitHub Pages happy: #/services, #/services/data-science
const parseHash = (): Route => {
  const [page, section] = window.location.hash.replace(/^#\/?/, '').split('/');
  if ((PAGES as string[]).includes(page)) {
    return { page: page as Page, section };
  }
  return { page: 'home' };
};

export const href = (page: Page, section?: string) =>
  `#/${page === 'home' ? '' : page}${section ? `/${section}` : ''}`;

export function useRoute() {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  // After a page renders, jump to the top or to the requested section
  useEffect(() => {
    if (route.section) {
      const el = document.getElementById(route.section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [route.page, route.section]);

  return route;
}
