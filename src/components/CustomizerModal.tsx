import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Check, Sparkles } from 'lucide-react';
import { UserSettings, CursorState } from '../types';
import { defaultUserSettings } from '../data/portfolioData';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSettings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  setCursorState: (state: CursorState) => void;
}

export default function CustomizerModal({
  isOpen,
  onClose,
  userSettings,
  onUpdateSettings,
  setCursorState,
}: CustomizerModalProps) {
  const [settings, setSettings] = useState<UserSettings>(userSettings);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof UserSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (key: keyof UserSettings['socials'], value: string) => {
    setSettings((prev) => ({
      ...prev,
      socials: { ...prev.socials, [key]: value },
    }));
  };

  const handleSave = () => {
    onUpdateSettings(settings);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setSettings(defaultUserSettings);
    onUpdateSettings(defaultUserSettings);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#FDFEFE] text-[#2C3D6C] rounded-3xl shadow-2xl p-6 sm:p-10 border border-[#E2E6EE] max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E2E6EE] mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#E31E24]" />
              <div>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#2C3D6C]">
                  Customize Portfolio Data
                </h2>
                <p className="font-sans-body text-xs text-[#46516A]">
                  Swap in your real name, roles, email, avatar photo URLs, and socials.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full hover:bg-[#2C3D6C]/5 text-[#2C3D6C] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans-body text-xs font-bold text-[#46516A] uppercase mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-2.5 text-sm font-sans-body text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
                />
              </div>

              <div>
                <label className="block font-sans-body text-xs font-bold text-[#46516A] uppercase mb-1">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-2.5 text-sm font-sans-body text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
                />
              </div>
            </div>

            {/* Kicker Label */}
            <div>
              <label className="block font-sans-body text-xs font-bold text-[#46516A] uppercase mb-1">
                KICKER LABEL ABOVE HEADLINE
              </label>
              <input
                type="text"
                value={settings.kicker}
                onChange={(e) => handleChange('kicker', e.target.value)}
                className="w-full bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-2.5 text-sm font-sans-body text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
              />
            </div>

            {/* Headline breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-sans-body text-[11px] font-bold text-[#46516A] uppercase mb-1">
                  HEADLINE LINE 1
                </label>
                <input
                  type="text"
                  value={settings.roleLine1}
                  onChange={(e) => handleChange('roleLine1', e.target.value)}
                  className="w-full bg-white border border-[#E2E6EE] rounded-xl px-3 py-2 text-xs font-sans-body text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
                />
              </div>
              <div>
                <label className="block font-sans-body text-[11px] font-bold text-[#46516A] uppercase mb-1">
                  EXPRESSIVE SERIF WORD
                </label>
                <input
                  type="text"
                  value={settings.roleLine2Serif}
                  onChange={(e) => handleChange('roleLine2Serif', e.target.value)}
                  className="w-full bg-white border border-[#E2E6EE] rounded-xl px-3 py-2 text-xs font-serif-expressive text-[#E31E24] font-bold focus:outline-hidden focus:border-[#E31E24]"
                />
              </div>
              <div>
                <label className="block font-sans-body text-[11px] font-bold text-[#46516A] uppercase mb-1">
                  HEADLINE SUFFIX
                </label>
                <input
                  type="text"
                  value={settings.roleLine2Suffix}
                  onChange={(e) => handleChange('roleLine2Suffix', e.target.value)}
                  className="w-full bg-white border border-[#E2E6EE] rounded-xl px-3 py-2 text-xs font-sans-body text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
                />
              </div>
            </div>

            {/* Subhead & Bio */}
            <div>
              <label className="block font-sans-body text-xs font-bold text-[#46516A] uppercase mb-1">
                ONE-LINE HERO SUBHEAD
              </label>
              <input
                type="text"
                value={settings.subhead}
                onChange={(e) => handleChange('subhead', e.target.value)}
                className="w-full bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-2.5 text-sm font-sans-body text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
              />
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-[#46516A] uppercase mb-1">
                LOCATION & TIMEZONE
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Location"
                  value={settings.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-2 text-xs font-sans-body text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
                />
                <input
                  type="text"
                  placeholder="Timezone"
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-2 text-xs font-sans-body text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans-body text-xs font-bold text-[#46516A] uppercase mb-1">
                PORTRAIT IMAGE URL
              </label>
              <input
                type="text"
                value={settings.portraitUrl}
                onChange={(e) => handleChange('portraitUrl', e.target.value)}
                className="w-full bg-white border border-[#E2E6EE] rounded-xl px-3.5 py-2 text-xs font-mono text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
              />
            </div>

            {/* Social Links */}
            <div>
              <label className="block font-sans-body text-xs font-bold text-[#46516A] uppercase mb-2">
                SOCIAL MEDIA URLS
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(['github', 'twitter', 'linkedin', 'dribbble', 'instagram'] as const).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#46516A] w-16 uppercase">
                      {s}:
                    </span>
                    <input
                      type="text"
                      value={settings.socials[s]}
                      onChange={(e) => handleSocialChange(s, e.target.value)}
                      className="w-full bg-white border border-[#E2E6EE] rounded-lg px-2.5 py-1.5 text-xs font-mono text-[#2C3D6C] focus:outline-hidden focus:border-[#E31E24]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-8 border-t border-[#E2E6EE] mt-8 flex items-center justify-between gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-xs font-sans-body font-bold text-[#46516A] hover:text-[#2C3D6C] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DEFAULTS</span>
            </button>

            <button
              onClick={handleSave}
              className="bg-[#E31E24] hover:bg-[#C81920] text-white px-6 py-3 rounded-xl font-sans-body text-xs font-bold tracking-widest transition-colors flex items-center gap-2 shadow-sm"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>UPDATED!</span>
                </>
              ) : (
                <span>APPLY CHANGES</span>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
