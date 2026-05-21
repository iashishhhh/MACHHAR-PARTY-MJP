import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Settings,
  Power,
  LogOut,
  Eye,
  EyeOff,
  Users,
  ShieldAlert,
  Database,
  Megaphone,
  PenLine,
  UserPlus,
  Wrench,
  ExternalLink,
  RotateCcw,
  Download,
  Upload,
  Trash2,
} from 'lucide-react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import { persistSiteConfig, mergeSiteConfig, DEFAULT_SITE_CONFIG } from '../utils/siteConfig';

const SECTION_LABELS = {
  manifesto: 'Manifesto',
  ministers: 'Ministers Cabinet',
  leadership: 'Leadership',
  testimonials: 'Testimonials',
  membership: 'Join / Membership Form',
  liveCounter: 'Live Stats Counter',
  mosquitoes: 'Flying Mosquitoes',
};

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'content', label: 'Content', icon: Eye },
  { id: 'editor', label: 'Site Editor', icon: PenLine },
  { id: 'membership', label: 'Membership', icon: UserPlus },
  { id: 'announce', label: 'Announcements', icon: Megaphone },
  { id: 'settings', label: 'System', icon: Settings },
  { id: 'tools', label: 'Tools', icon: Wrench },
];

export default function AdminDashboard({
  siteConfig,
  setSiteConfig,
  onLogout,
  onPreviewSite,
  visitCount,
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [toolMsg, setToolMsg] = useState('');
  const importRef = useRef(null);

  const updateConfig = (patch) => {
    const newConfig = mergeSiteConfig(siteConfig, patch);
    setSiteConfig(newConfig);
    persistSiteConfig(newConfig, db);
  };

  const handleToggleSection = (sectionKey) => {
    updateConfig({
      sections: {
        ...siteConfig.sections,
        [sectionKey]: !siteConfig.sections[sectionKey],
      },
    });
  };

  const handleSiteStatusToggle = () => {
    updateConfig({ isActive: !siteConfig.isActive });
  };

  const handleResetVisits = async () => {
    localStorage.removeItem('mjp_has_visited');
    localStorage.setItem('mjp_total_visits', '0');
    if (db) {
      try {
        await set(ref(db, 'visitorCount'), 0);
        setToolMsg('Visitor counter reset to 0 (Firebase + local).');
      } catch {
        setToolMsg('Local reset done. Firebase write failed — check rules.');
      }
    } else {
      setToolMsg('Visitor counter reset locally (no Firebase).');
    }
  };

  const handleExportConfig = () => {
    const blob = new Blob([JSON.stringify(siteConfig, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mjp-site-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToolMsg('Config exported as JSON file.');
  };

  const handleImportConfig = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        const merged = mergeSiteConfig(DEFAULT_SITE_CONFIG, imported);
        setSiteConfig(merged);
        persistSiteConfig(merged, db);
        setToolMsg('Config imported and applied successfully.');
      } catch {
        setToolMsg('Invalid JSON file. Import failed.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetConfig = () => {
    if (!window.confirm('Reset ALL site settings to defaults? This cannot be undone.')) return;
    setSiteConfig(DEFAULT_SITE_CONFIG);
    persistSiteConfig(DEFAULT_SITE_CONFIG, db);
    setToolMsg('All settings restored to factory defaults.');
  };

  const visibleSections = Object.values(siteConfig.sections).filter(Boolean).length;
  const totalSections = Object.keys(siteConfig.sections).length;

  return (
    <div className="min-h-screen bg-mjp-black text-white flex flex-col md:flex-row font-poppins selection:bg-mjp-red selection:text-white">
      <div className="w-full md:w-64 bg-black/80 border-r border-mjp-red/20 p-6 flex flex-col shrink-0">
        <div className="mb-8">
          <h2 className="text-3xl font-bebas text-mjp-red tracking-wider flex items-center gap-2">
            <ShieldAlert size={24} /> MJP ADMIN
          </h2>
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-1">
            Logged in as Ashish
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto max-h-[50vh] md:max-h-none">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-mjp-red/10 text-mjp-red border border-mjp-red/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div className="mt-6 pt-4 border-t border-mjp-red/20 space-y-2">
          <button
            onClick={onPreviewSite}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-mjp-yellow hover:bg-mjp-yellow/10 transition-colors"
          >
            <ExternalLink size={16} /> Preview Live Site
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={16} /> Terminate Session
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-10 bg-grid-pattern overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-4xl font-bebas text-white tracking-widest mb-2">
                Dashboard Overview
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Real-time control center for Machhar Janta Party website.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <StatCard
                  icon={Users}
                  label="Total Visitors"
                  value={visitCount}
                  sub="Firebase / local tracking"
                />
                <StatCard
                  icon={Eye}
                  label="Visible Sections"
                  value={`${visibleSections}/${totalSections}`}
                  sub="Sections shown on site"
                />
                <StatCard
                  icon={Megaphone}
                  label="Announcement"
                  value={siteConfig.announcement?.enabled ? 'LIVE' : 'OFF'}
                  sub={
                    siteConfig.announcement?.enabled
                      ? siteConfig.announcement.text?.slice(0, 40) + '…'
                      : 'No banner active'
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <StatusPill
                  label="Site Status"
                  active={siteConfig.isActive}
                  onText="ONLINE"
                  offText="MAINTENANCE"
                />
                <StatusPill
                  label="Membership"
                  active={siteConfig.membership?.open !== false}
                  onText="OPEN"
                  offText="CLOSED"
                />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bebas tracking-widest text-mjp-yellow mb-4">
                  Quick Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <QuickBtn onClick={() => setActiveTab('editor')} label="Edit Hero" />
                  <QuickBtn onClick={() => setActiveTab('announce')} label="Set Banner" />
                  <QuickBtn onClick={() => setActiveTab('content')} label="Toggle Sections" />
                  <QuickBtn onClick={onPreviewSite} label="Preview Site" accent />
                </div>
              </div>

              <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-3">
                <Database size={20} className="text-mjp-red shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium">Membership Data Pipeline</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Form submissions route to your connected Google Sheet. Use Membership tab
                    to pause registrations without removing the section.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h1 className="text-4xl font-bebas text-white tracking-widest mb-2">
                Content Control
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Show or hide entire sections on the public website.
              </p>
              <div className="space-y-3">
                {Object.keys(siteConfig.sections).map((key) => {
                  const isVisible = siteConfig.sections[key];
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-5"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {SECTION_LABELS[key] || key}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {isVisible ? 'Visible to all visitors' : 'Hidden from site'}
                        </p>
                      </div>
                      <ToggleBtn visible={isVisible} onClick={() => handleToggleSection(key)} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'editor' && (
            <div>
              <h1 className="text-4xl font-bebas text-white tracking-widest mb-2">
                Site Editor
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Customize hero section text and buttons without touching code.
              </p>
              <div className="space-y-6">
                <Field
                  label="Hero Badge Text"
                  value={siteConfig.hero?.badge || ''}
                  onChange={(v) => updateConfig({ hero: { ...siteConfig.hero, badge: v } })}
                  placeholder="Official Campaign Page 2026"
                />
                <Field
                  label="Hero Slogan"
                  value={siteConfig.hero?.slogan || ''}
                  onChange={(v) => updateConfig({ hero: { ...siteConfig.hero, slogan: v } })}
                  placeholder='"Khoon sabka piyenge." 🩸'
                />
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
                  <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                    Hero Buttons
                  </h3>
                  <CheckboxRow
                    label="Show JOIN THE PARTY button"
                    checked={siteConfig.hero?.showJoinButton !== false}
                    onChange={(checked) =>
                      updateConfig({ hero: { ...siteConfig.hero, showJoinButton: checked } })
                    }
                  />
                  <CheckboxRow
                    label="Show DONATE BLOOD button"
                    checked={siteConfig.hero?.showDonateButton !== false}
                    onChange={(checked) =>
                      updateConfig({ hero: { ...siteConfig.hero, showDonateButton: checked } })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'membership' && (
            <div>
              <h1 className="text-4xl font-bebas text-white tracking-widest mb-2">
                Membership Control
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Pause new registrations while keeping the section visible with a custom message.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-medium text-white">Registration Status</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      When closed, visitors see your message instead of the form.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      updateConfig({
                        membership: {
                          ...siteConfig.membership,
                          open: !(siteConfig.membership?.open !== false),
                        },
                      })
                    }
                    className={`px-6 py-3 rounded-lg font-bebas text-xl tracking-wider transition-all ${
                      siteConfig.membership?.open !== false
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {siteConfig.membership?.open !== false
                      ? 'CLOSE REGISTRATIONS'
                      : 'OPEN REGISTRATIONS'}
                  </button>
                </div>
                <div>
                  <label className="block font-mono text-sm text-mjp-yellow uppercase mb-3">
                    Closed Message
                  </label>
                  <textarea
                    value={siteConfig.membership?.closedMessage || ''}
                    onChange={(e) =>
                      updateConfig({
                        membership: {
                          ...siteConfig.membership,
                          closedMessage: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white text-sm min-h-[100px] focus:outline-none focus:border-mjp-red"
                    placeholder="Message when form is closed..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'announce' && (
            <div>
              <h1 className="text-4xl font-bebas text-white tracking-widest mb-2">
                Announcements
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Top banner on the live site — great for breaking news or campaign updates.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                <CheckboxRow
                  label="Show announcement banner"
                  checked={siteConfig.announcement?.enabled === true}
                  onChange={(checked) =>
                    updateConfig({
                      announcement: { ...siteConfig.announcement, enabled: checked },
                    })
                  }
                />
                <Field
                  label="Banner Message"
                  value={siteConfig.announcement?.text || ''}
                  onChange={(v) =>
                    updateConfig({
                      announcement: { ...siteConfig.announcement, text: v },
                    })
                  }
                  placeholder="Your announcement here..."
                />
                <div>
                  <label className="block font-mono text-sm text-mjp-yellow uppercase mb-3">
                    Banner Style
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['info', 'warning', 'urgent'].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          updateConfig({
                            announcement: { ...siteConfig.announcement, type },
                          })
                        }
                        className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest border transition-colors ${
                          siteConfig.announcement?.type === type
                            ? 'bg-mjp-red/20 text-mjp-red border-mjp-red/50'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                {siteConfig.announcement?.enabled && (
                  <div
                    className={`rounded-lg p-3 text-center text-xs font-mono uppercase border ${
                      siteConfig.announcement.type === 'urgent'
                        ? 'bg-mjp-red/15 border-mjp-red/40 text-mjp-red'
                        : siteConfig.announcement.type === 'warning'
                          ? 'bg-orange-500/10 border-orange-500/40 text-orange-400'
                          : 'bg-mjp-yellow/10 border-mjp-yellow/40 text-mjp-yellow'
                    }`}
                  >
                    Preview: {siteConfig.announcement.text}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-4xl font-bebas text-white tracking-widest mb-8">
                System Settings
              </h1>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-xl font-medium text-white">Global Site Status</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Take the entire website offline for all users.
                    </p>
                  </div>
                  <button
                    onClick={handleSiteStatusToggle}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bebas text-xl tracking-wider transition-all ${
                      siteConfig.isActive
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                        : 'bg-green-600 hover:bg-green-700 text-white shadow-[0_0_15px_rgba(22,163,74,0.4)]'
                    }`}
                  >
                    <Power size={20} />
                    {siteConfig.isActive ? 'SHUT DOWN SITE' : 'ACTIVATE SITE'}
                  </button>
                </div>
                <div>
                  <label className="block font-mono text-sm text-mjp-yellow uppercase mb-3">
                    Maintenance Message
                  </label>
                  <textarea
                    value={siteConfig.message}
                    onChange={(e) => updateConfig({ message: e.target.value })}
                    disabled={siteConfig.isActive}
                    className={`w-full bg-black/50 border rounded-lg p-4 text-white text-sm min-h-[120px] focus:outline-none transition-colors ${
                      siteConfig.isActive
                        ? 'border-white/10 text-gray-500 cursor-not-allowed'
                        : 'border-mjp-red/50 focus:border-mjp-red'
                    }`}
                    placeholder="Message displayed when site is down..."
                  />
                  {siteConfig.isActive && (
                    <p className="text-xs text-mjp-red mt-2 flex items-center gap-1">
                      <ShieldAlert size={12} /> Shut down the site to edit this message.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div>
              <h1 className="text-4xl font-bebas text-white tracking-widest mb-2">
                Admin Tools
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Backup, restore, and maintenance utilities.
              </p>
              {toolMsg && (
                <div className="mb-6 p-4 rounded-lg bg-mjp-yellow/10 border border-mjp-yellow/30 text-mjp-yellow text-sm font-mono">
                  {toolMsg}
                </div>
              )}
              <div className="space-y-4">
                <ToolCard
                  icon={ExternalLink}
                  title="Preview Live Site"
                  desc="View the public site while staying logged in. Press Ctrl+Shift+A to return."
                  actionLabel="Open Preview"
                  onClick={onPreviewSite}
                />
                <ToolCard
                  icon={RotateCcw}
                  title="Reset Visitor Counter"
                  desc="Sets count to 0 locally and on Firebase (if connected)."
                  actionLabel="Reset Counter"
                  onClick={handleResetVisits}
                  danger
                />
                <ToolCard
                  icon={Download}
                  title="Export Site Config"
                  desc="Download all settings as JSON backup."
                  actionLabel="Export JSON"
                  onClick={handleExportConfig}
                />
                <ToolCard
                  icon={Upload}
                  title="Import Site Config"
                  desc="Restore settings from a previously exported JSON file."
                  actionLabel="Choose File"
                  onClick={() => importRef.current?.click()}
                />
                <input
                  ref={importRef}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImportConfig}
                />
                <ToolCard
                  icon={Trash2}
                  title="Factory Reset"
                  desc="Restore ALL settings to defaults. Sections, hero, announcements — everything."
                  actionLabel="Reset All"
                  onClick={handleResetConfig}
                  danger
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden">
      <div className="absolute top-2 right-2 opacity-10">
        <Icon size={48} />
      </div>
      <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </h3>
      <div className="text-3xl font-bebas text-mjp-yellow truncate">{value}</div>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{sub}</p>
    </div>
  );
}

function StatusPill({ label, active, onText, offText }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
      <span className="text-sm text-gray-300">{label}</span>
      <span className="flex items-center gap-2 font-mono text-xs">
        <span
          className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
        />
        {active ? onText : offText}
      </span>
    </div>
  );
}

function QuickBtn({ onClick, label, accent }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest border transition-colors ${
        accent
          ? 'bg-mjp-yellow/10 text-mjp-yellow border-mjp-yellow/30 hover:bg-mjp-yellow/20'
          : 'bg-white/5 text-gray-300 border-white/10 hover:border-mjp-red/40 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function ToggleBtn({ visible, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest border transition-colors ${
        visible
          ? 'bg-green-500/10 text-green-400 border-green-500/30'
          : 'bg-red-500/10 text-red-400 border-red-500/30'
      }`}
    >
      {visible ? <><Eye size={14} /> Visible</> : <><EyeOff size={14} /> Hidden</>}
    </button>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block font-mono text-sm text-mjp-yellow uppercase mb-3">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-mjp-red"
      />
    </div>
  );
}

function CheckboxRow({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-mjp-red rounded"
      />
      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
}

function ToolCard({ icon: Icon, title, desc, actionLabel, onClick, danger }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
      <div className="flex gap-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            danger ? 'bg-red-500/10 text-red-400' : 'bg-mjp-red/10 text-mjp-red'
          }`}
        >
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-md">{desc}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`shrink-0 px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest border transition-colors ${
          danger
            ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
            : 'border-mjp-red/30 text-mjp-red hover:bg-mjp-red/10'
        }`}
      >
        {actionLabel}
      </button>
    </div>
  );
}
