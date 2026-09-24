import { useLanguage } from '../context/LanguageContext';
import { StarGlyph } from './ui';

/** Rubber seal pressed onto the registry record. */
const Seal = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 180 180" className={className} aria-hidden style={{ filter: 'url(#rough-strong)' }}>
    <defs>
      <path id="seal-ring" d="M90 90 m-65 0 a65 65 0 1 1 130 0 a65 65 0 1 1 -130 0" />
    </defs>
    <g fill="none" stroke="currentColor">
      <circle cx={90} cy={90} r={84} strokeWidth="2.6" />
      <circle cx={90} cy={90} r={78} strokeWidth="1" />
      <circle cx={90} cy={90} r={50} strokeWidth="1" />
    </g>
    <text fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fontWeight="500" fill="currentColor">
      <textPath href="#seal-ring" textLength="404" lengthAdjust="spacing">
        ADANA TİCARET SİCİL MEMURLUĞU · N° 49321 ·
      </textPath>
    </text>
    <path
      transform="translate(90 78)"
      d="M0 -16 L4.3 -6.4 L16 0 L4.3 6.4 L0 16 L-4.3 6.4 L-16 0 L-4.3 -6.4 Z"
      fill="currentColor"
      opacity=".9"
    />
    <text x={90} y={116} textAnchor="middle" fontFamily="Fraunces, serif" fontStyle="italic" fontSize="18" fill="currentColor">
      2006
    </text>
  </svg>
);

export const RegistryCard = () => {
  const { t } = useLanguage();

  const rows = [
    { label: t('reg.legal_name'), value: t('reg.legal_name_val') },
    { label: t('reg.registry'), value: t('reg.registry_val') },
    { label: t('reg.sicil'), value: '49321' },
    { label: t('reg.founded'), value: t('reg.founded_val') },
    { label: t('reg.type'), value: t('reg.type_val') },
    { label: t('reg.location'), value: t('reg.location_val') },
    { label: t('reg.address'), value: t('reg.address_val') },
  ];

  return (
    <div className="relative">
      <Seal className="absolute -right-1 -top-14 z-10 h-28 w-28 -rotate-[14deg] text-oxblood opacity-85 mix-blend-multiply sm:-right-8 sm:h-36 sm:w-36" />
      <div className="relative border border-sand bg-paper-light px-6 pb-4 pt-8 shadow-[0_1px_0_rgb(35_62_101_/_0.06),0_24px_48px_-28px_rgb(35_62_101_/_0.35)] sm:px-8">
        <div className="flex items-center gap-3 border-b-2 border-double border-navy/25 pb-5">
          <StarGlyph className="h-4 w-4 text-gold" />
          <div>
            <h3 className="display text-[1.6rem] text-navy">{t('reg.card_h')}</h3>
            <p className="eyebrow mt-1 text-ink-soft">{t('reg.official')}</p>
          </div>
        </div>
        <dl>
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 border-b border-navy/10 py-3.5 last:border-b-0 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
              <dt className="eyebrow pt-0.5 text-[0.66rem] text-ink-soft">{row.label}</dt>
              <dd className="text-[0.95rem] leading-snug text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
