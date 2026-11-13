import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  Key,
  Languages,
  Moon,
  Sun,
  Upload,
  Volume2,
} from 'lucide-react';
import { exportUserData, importUserData } from '../db/database';
import { getArabicVoices, speakArabic, VOICE_INSTALL_STEPS } from '../lib/tts';
import type { AppSettings, ArabicFontFamily } from '../types/sarf';
import { PWAInstallButton } from './PWAInstallButton';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  isOnline: boolean;
  offlineReady: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
  verbCount: number;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  isOnline,
  offlineReady,
  isInstallable,
  isInstalled,
  isIOS,
  onInstall,
  verbCount,
}) => {
  const [showKey, setShowKey] = useState(false);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [arabicVoices, setArabicVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [backupMessage, setBackupMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const refreshVoices = () => {
      const found = getArabicVoices();
      setArabicVoices(found);
      setVoicesLoaded(true);
    };
    refreshVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', refreshVoices);
    }
  }, []);

  const handleExportBackup = async () => {
    const payload = await exportUserData();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sarf-companion-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMessage('Backup exported cleanly.');
    setTimeout(() => setBackupMessage(''), 3000);
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      await importUserData(parsed);
      setBackupMessage('User data restored into IndexedDB.');
    } catch {
      setBackupMessage('Invalid backup JSON file.');
    }
    e.target.value = '';
    setTimeout(() => setBackupMessage(''), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-slate-100">
          Settings &amp; Offline Control
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Preferences, self-hosted fonts, Arabic voice setup, local Gemini key, and JSON backups.
        </p>
      </div>

      {/* Appearance & Layout */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Appearance &amp; Direction
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              onUpdateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })
            }
            className="min-h-[48px] px-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-800 dark:text-slate-200 hover:border-emerald-600"
          >
            <span className="inline-flex items-center gap-2">
              {settings.theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span>Theme Mode</span>
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 capitalize">
              {settings.theme}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSettings({ rtlLayout: !settings.rtlLayout })}
            className="min-h-[48px] px-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-800 dark:text-slate-200 hover:border-emerald-600"
          >
            <span className="inline-flex items-center gap-2">
              <Languages className="w-4 h-4" />
              <span>Interface Direction</span>
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {settings.rtlLayout ? 'RTL' : 'LTR'}
            </span>
          </button>
        </div>
      </section>

      {/* Arabic Typography */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Arabic Typography (Self-Hosted Offline)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Amiri, Noto Naskh Arabic, and Scheherazade New are bundled locally for crisp diacritic rendering offline.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {(
            [
              ['amiri', 'Amiri', 'Classical Naskh'],
              ['noto', 'Noto Naskh Arabic', 'Modern UI Clarity'],
              ['scheherazade', 'Scheherazade New', 'Generous Harakat'],
            ] as Array<[ArabicFontFamily, string, string]>
          ).map(([id, title, desc]) => (
            <button
              key={id}
              type="button"
              onClick={() => onUpdateSettings({ arabicFont: id })}
              className={`p-3 rounded-xl border text-left transition-colors ${
                settings.arabicFont === id
                  ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
            >
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{title}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{desc}</p>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>Arabic Font Size</span>
            <span className="font-mono-num font-semibold">{settings.arabicFontSize}px</span>
          </div>
          <input
            type="range"
            min={20}
            max={38}
            step={1}
            value={settings.arabicFontSize}
            onChange={(e) => onUpdateSettings({ arabicFontSize: Number(e.target.value) })}
            className="w-full accent-emerald-700"
          />
          <div className="rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p lang="ar" dir="rtl" className="arabic-scalable text-slate-900 dark:text-slate-100">
              كَتَبَ يَكْتُبُ كِتَابَةً · اِسْتَخْرَجَ يَسْتَخْرِجُ · تَرْجَمَ يُتَرْجِمُ
            </p>
          </div>
        </div>
      </section>

      {/* Audio & Web Speech API */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Arabic Text-to-Speech (ar-SA)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Uses your device&apos;s built-in offline speech engine.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              speakArabic('كَتَبَ، يَكْتُبُ، اُكْتُبْ', {
                rate: settings.ttsRate,
                repeat: settings.ttsRepeat,
              })
            }
            className="min-h-[40px] px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center gap-1.5 shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            <span>Test Voice</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span>Speech Speed</span>
              <span className="font-mono-num font-semibold">{settings.ttsRate.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1.5}
              step={0.1}
              value={settings.ttsRate}
              onChange={(e) => onUpdateSettings({ ttsRate: Number(e.target.value) })}
              className="w-full accent-emerald-700"
            />
          </div>

          <div className="space-y-1.5">
            <span className="block text-xs text-slate-600 dark:text-slate-300">Repeat Count</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onUpdateSettings({ ttsRepeat: r })}
                  className={`min-h-[38px] rounded-xl border text-xs font-medium ${
                    settings.ttsRepeat === r
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {r}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {voicesLoaded && arabicVoices.length === 0 ? (
          <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/30 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>No Arabic (ar-SA) voice detected on this device</span>
            </div>
            <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
              To hear offline Arabic pronunciation, install an Arabic voice in your device settings:
            </p>
            <ul className="space-y-1 text-xs text-amber-900/80 dark:text-amber-200/80">
              {VOICE_INSTALL_STEPS.map((item) => (
                <li key={item.platform}>
                  <strong>{item.platform}:</strong> {item.steps}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {arabicVoices.length} Arabic voice{arabicVoices.length === 1 ? '' : 's'} detected ({arabicVoices[0]?.name || 'ar-SA'}).
            </span>
          </div>
        )}
      </section>

      {/* Gemini API Key (Local Only for GitHub Pages) */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 inline-flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            <span>Online Verb Verification (Optional Gemini API Key)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Stored exclusively in your browser&apos;s localStorage (never hardcoded or sent to any third-party server). Used only when you click &ldquo;Verify&rdquo; while online.
          </p>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type={showKey ? 'text' : 'password'}
              value={settings.geminiApiKey}
              onChange={(e) => onUpdateSettings({ geminiApiKey: e.target.value })}
              placeholder="Enter your Gemini API key..."
              className="w-full min-h-[44px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 pr-10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              aria-label={showKey ? 'Hide API key' : 'Show API key'}
              className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 absolute right-1 top-1/2 -translate-y-1/2"
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {settings.geminiApiKey && (
            <button
              type="button"
              onClick={() => onUpdateSettings({ geminiApiKey: '' })}
              className="min-h-[44px] px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="text-xs text-slate-600 dark:text-slate-400">Gemini Model</label>
          <select
            value={settings.geminiModel}
            onChange={(e) => onUpdateSettings({ geminiModel: e.target.value })}
            className="min-h-[38px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 text-xs"
          >
            <option value="gemini-4-hydrogen">gemini-4-hydrogen (Recommended)</option>
            <option value="gemini-2.5-flash">gemini-2.5-flash</option>
          </select>
        </div>
      </section>

      {/* Data Backup & PWA Status */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Offline Storage &amp; Backup
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {verbCount} verbs stored in IndexedDB · {isOnline ? 'Connected' : 'Offline Mode'} ·{' '}
              {offlineReady ? 'Service worker cached' : 'Caching app shell...'}
            </p>
          </div>
          <PWAInstallButton
            isInstallable={isInstallable}
            isInstalled={isInstalled}
            isIOS={isIOS}
            onInstall={onInstall}
          />
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleExportBackup}
            className="min-h-[44px] px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 inline-flex items-center gap-2 hover:border-emerald-600"
          >
            <Download className="w-4 h-4" />
            <span>Export User Data (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[44px] px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 inline-flex items-center gap-2 hover:border-emerald-600"
          >
            <Upload className="w-4 h-4" />
            <span>Import Backup (JSON)</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImportBackup}
            className="hidden"
          />
        </div>

        {backupMessage && (
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            {backupMessage}
          </p>
        )}
      </section>
    </div>
  );
};
