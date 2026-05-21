import React from 'react';
import { Megaphone, AlertTriangle, Zap } from 'lucide-react';

const TYPE_STYLES = {
  info: {
    border: 'border-mjp-yellow/40',
    bg: 'bg-mjp-yellow/10',
    text: 'text-mjp-yellow',
    icon: Megaphone,
  },
  warning: {
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
    text: 'text-orange-400',
    icon: AlertTriangle,
  },
  urgent: {
    border: 'border-mjp-red/50',
    bg: 'bg-mjp-red/15',
    text: 'text-mjp-red',
    icon: Zap,
  },
};

export default function AnnouncementBanner({ announcement }) {
  if (!announcement?.enabled || !announcement.text?.trim()) return null;

  const style = TYPE_STYLES[announcement.type] || TYPE_STYLES.info;
  const Icon = style.icon;

  return (
    <div
      className={`fixed top-16 left-0 right-0 z-50 px-4 py-2 ${style.bg} border-b ${style.border} backdrop-blur-md`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-center">
        <Icon size={16} className={`shrink-0 ${style.text}`} />
        <p className={`text-xs md:text-sm font-mono uppercase tracking-wide ${style.text}`}>
          {announcement.text}
        </p>
      </div>
    </div>
  );
}
