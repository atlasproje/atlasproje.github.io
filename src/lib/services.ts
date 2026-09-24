import { useLanguage } from '../context/LanguageContext';
import type { GlyphName } from '../components/Glyphs';

export interface Service {
  id: string;
  num: string;
  glyph: GlyphName;
  title: string;
  desc: string;
  badge: string;
  upcoming?: boolean;
  bullets: string[];
}

export function useServices(): Service[] {
  const { t } = useLanguage();
  return [
    {
      id: 'ai-workflows',
      num: '01',
      glyph: 'ai',
      title: t('svc.ai_title'),
      desc: t('svc.ai_desc'),
      badge: t('svc.badge_ai'),
      bullets: [t('svc.ai_bullet1'), t('svc.ai_bullet2'), t('svc.ai_bullet3'), t('svc.ai_bullet4')],
    },
    {
      id: 'data-science',
      num: '02',
      glyph: 'data',
      title: t('svc.ds_title'),
      desc: t('svc.ds_desc'),
      badge: t('svc.badge_ds'),
      bullets: [t('svc.ds_bullet1'), t('svc.ds_bullet2'), t('svc.ds_bullet3'), t('svc.ds_bullet4')],
    },
    {
      id: 'mechanical-mep',
      num: '03',
      glyph: 'mep',
      title: t('svc.mep_title'),
      desc: t('svc.mep_desc'),
      badge: t('svc.badge_mep'),
      bullets: [t('svc.mep_bullet1'), t('svc.mep_bullet2'), t('svc.mep_bullet3'), t('svc.mep_bullet4')],
    },
    {
      id: 'transformation-training',
      num: '04',
      glyph: 'training',
      title: t('svc.training_title'),
      desc: t('svc.training_desc'),
      badge: t('svc.training_upcoming'),
      upcoming: true,
      bullets: [t('svc.training_bullet1'), t('svc.training_bullet2'), t('svc.training_bullet3'), t('svc.training_bullet4')],
    },
  ];
}
