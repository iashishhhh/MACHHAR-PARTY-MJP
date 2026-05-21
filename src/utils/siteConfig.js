import { ref, set } from 'firebase/database';

export const DEFAULT_SITE_CONFIG = {
  isActive: true,
  message:
    'Site is currently under maintenance by Admin Ashish. Please come back later!',
  sections: {
    manifesto: true,
    ministers: true,
    leadership: true,
    testimonials: true,
    membership: true,
    liveCounter: true,
    mosquitoes: true,
  },
  announcement: {
    enabled: false,
    text: 'Breaking: MJP manifesto ratified — all mosquitoes report to duty!',
    type: 'info',
  },
  hero: {
    badge: 'Official Campaign Page 2026',
    slogan: '"Khoon sabka piyenge." 🩸',
    showJoinButton: true,
    showDonateButton: true,
  },
  membership: {
    open: true,
    closedMessage:
      'Membership registrations are paused. Admin Ashish is counting bites. Try again soon!',
  },
};

export function loadSiteConfigFromStorage() {
  const savedFull = localStorage.getItem('mjp_site_config');
  if (savedFull) {
    try {
      const parsed = JSON.parse(savedFull);
      return {
        ...DEFAULT_SITE_CONFIG,
        ...parsed,
        sections: { ...DEFAULT_SITE_CONFIG.sections, ...parsed.sections },
        announcement: { ...DEFAULT_SITE_CONFIG.announcement, ...parsed.announcement },
        hero: { ...DEFAULT_SITE_CONFIG.hero, ...parsed.hero },
        membership: { ...DEFAULT_SITE_CONFIG.membership, ...parsed.membership },
      };
    } catch {
      /* fall through to legacy keys */
    }
  }

  const savedSections = localStorage.getItem('mjp_site_sections');
  return {
    ...DEFAULT_SITE_CONFIG,
    isActive: localStorage.getItem('mjp_site_active') !== 'false',
    message:
      localStorage.getItem('mjp_site_msg') || DEFAULT_SITE_CONFIG.message,
    sections: savedSections
      ? { ...DEFAULT_SITE_CONFIG.sections, ...JSON.parse(savedSections) }
      : DEFAULT_SITE_CONFIG.sections,
  };
}

export function persistSiteConfig(config, db) {
  localStorage.setItem('mjp_site_active', String(config.isActive));
  localStorage.setItem('mjp_site_msg', config.message);
  localStorage.setItem('mjp_site_sections', JSON.stringify(config.sections));
  localStorage.setItem('mjp_site_config', JSON.stringify(config));

  if (db) {
    set(ref(db, 'siteConfig'), config).catch((err) =>
      console.error('Firebase write failed:', err)
    );
  }
}

export function mergeSiteConfig(prev, patch) {
  return {
    ...prev,
    ...patch,
    sections: patch.sections ? { ...prev.sections, ...patch.sections } : prev.sections,
    announcement: patch.announcement
      ? { ...prev.announcement, ...patch.announcement }
      : prev.announcement,
    hero: patch.hero ? { ...prev.hero, ...patch.hero } : prev.hero,
    membership: patch.membership
      ? { ...prev.membership, ...patch.membership }
      : prev.membership,
  };
}
