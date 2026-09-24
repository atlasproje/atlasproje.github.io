import type { AnchorHTMLAttributes } from 'react';
import { href } from '../lib/router';
import type { Page } from '../lib/router';

interface PageLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: Page;
  section?: string;
}

export const PageLink = ({ to, section, onClick, ...rest }: PageLinkProps) => {
  const target = href(to, section);
  return (
    <a
      href={target}
      onClick={(e) => {
        onClick?.(e);
        // Clicking the link of the page you're already on scrolls back to the top
        if (window.location.hash === target || (target === '#/' && !window.location.hash)) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      {...rest}
    />
  );
};
