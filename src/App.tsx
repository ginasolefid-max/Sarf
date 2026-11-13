import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import {
  AlertCircle,
  BookA,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Loader2,
  Moon,
  Plus,
  RefreshCw,
  Settings as SettingsIcon,
  Sun,
  TableProperties,
  VolumeX,
  X,
} from 'lucide-react';
import { BookView } from './components/BookView';
import { DictionaryView } from './components/DictionaryView';
import { PracticeView } from './components/PracticeView';
import { PWAInstallButton, StatusIndicators } from './components/PWAInstallButton';
import { SettingsView } from './components/SettingsView';
import { TasreefView } from './components/TasreefView';
import { VerifyVerbModal } from './components/VerifyVerbModal';
import { db, seedDatabaseIfNeeded } from './db/database';
import { useOnlineStatus, usePWA } from './hooks/usePWA';
import { useSettings } from './hooks/useSettings';
import { verifyVerbWithGemini } from './lib/geminiVerify';
import { getArabicVoices } from './lib/tts';
import type { VerbEntry } from './types/sarf';

type TabId = 'dictionary' | 'tasreef' | 'book' | 'practice' | 'settings';

const NAV_ITEMS: Array<{ id: TabId; label: string; shortLabel: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'dictionary', label: 'Dictionary', shortLabel: 'Dict', icon: BookA },
  { id: 'tasreef', label: 'Tasreef Engine', shortLabel: 'Tasreef', icon: TableProperties },
  { id: 'book', label: 'Sarf Book', shortLabel: 'Book', icon: BookOpen },
  { id: 'practice', label: 'Practice & SRS', shortLabel: 'Practice', icon: GraduationCap },
  { id: 'settings', label: 'Settings', shortLabel: 'Settings', icon: SettingsIcon },
];

export default function App() {
  const { settings, updateSettings } = useSettings();
  const isOnline = useOnlineStatus();
  const pwa = usePWA();

  const [activeTab, setActiveTab] = useState<TabId>('dictionary');
  const [selectedVerb, setSelectedVerb] = useState<VerbEntry | null>(null);
  const [verifyOpen, setVerifyOpen] = useState(false);

  const [dbState, setDbState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [dbError, setDbError] = useState('');
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  const processingQueueRef = useRef(false);

  const verbCount = useLiveQuery(() => db.verbs.count(), []) ?? 0;
  const queueItems = useLiveQuery(() => db.verifyQueue.toArray(), []) || [];
  const readyQueueCount = queueItems.filter((q) => q.status === 'ready').length;

  const initDb = useCallback(async () => {
    setDbState('loading');
    setDbError('');
    try {
      await seedDatabaseIfNeeded();
      setDbState('ready');
    } catch (err) {
      setDbError(err instanceof Error ? err.message : 'Unable to initialize offline database.');
      setDbState('error');
    }
  }, []);

  useEffect(() => {
    initDb();
  }, [initDb]);

  // Automatically process queued offline verb verifications when returning online
  useEffect(() => {
    if (!isOnline || !settings.geminiApiKey.trim() || processingQueueRef.current) return;
    const pending = queueItems.filter((item) => item.status === 'pending');
    if (pending.length === 0) return;

    processingQueueRef.current = true;
    (async () => {
      try {
        for (const item of pending) {
          if (!item.id) continue;
          await db.verifyQueue.update(item.id, { status: 'processing', error: undefined });
          try {
            const verified = await verifyVerbWithGemini(
              item.query,
              settings.geminiApiKey,
              settings.geminiModel
            );
            await db.verifyQueue.update(item.id, { status: 'ready', result: verified });
          } catch (err) {
            await db.verifyQueue.update(item.id, {
              status: 'error',
              error: err instanceof Error ? err.message : 'Verification failed',
            });
          }
        }
      } finally {
        processingQueueRef.current = false;
      }
    })();
  }, [isOnline, settings.geminiApiKey, settings.geminiModel, queueItems]);

  const handleOpenTasreef = (verb: VerbEntry) => {
    setSelectedVerb(verb);
    setActiveTab('tasreef');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpeakError = (msg: string) => {
    const arVoices = getArabicVoices();
    if (arVoices.length === 0) {
      setSpeechNotice(
        'No Arabic (ar-SA) voice is installed on this device. Open Settings for quick instructions to download an offline Arabic voice.'
      );
    } else {
      setSpeechNotice(msg);
    }
  };

  if (dbState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="text-center space-y-3 max-w-sm">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-700 dark:text-emerald-400 mx-auto" />
          <h1 className="text-lg font-display font-bold text-slate-900 dark:text-slate-100">
            Preparing Sarf Companion
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Loading the offline Arabic verb dictionary and morphological engine into IndexedDB...
          </p>
        </div>
      </div>
    );
  }

  if (dbState === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="max-w-md w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 text-center">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Offline Database Error
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">{dbError}</p>
          <button
            type="button"
            onClick={initDb}
            className="min-h-[44px] px-5 rounded-xl bg-emerald-700 text-white text-sm font-medium inline-flex items-center gap-2 hover:bg-emerald-800"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Initialization</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md no-print">
        <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('dictionary')}
            className="flex items-center gap-2.5 min-w-0 text-left"
          >
            <img
              src="./icon.svg"
              alt=""
              className="w-7 h-7 rounded-lg shrink-0"
            />
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-slate-100 truncate">
              Sarf Companion
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <StatusIndicators
              isOnline={isOnline}
              offlineReady={pwa.offlineReady}
              needRefresh={pwa.needRefresh}
              onRefresh={pwa.applyUpdate}
            />

            <PWAInstallButton
              isInstallable={pwa.isInstallable}
              isInstalled={pwa.isInstalled}
              isIOS={pwa.isIOS}
              onInstall={pwa.install}
              compact
            />

            <button
              type="button"
              onClick={() =>
                updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })
              }
              aria-label={settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-emerald-600"
            >
              {settings.theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Responsive Shell */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 justify-between no-print">
          <nav className="space-y-1.5" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full min-h-[44px] px-3.5 rounded-xl text-sm flex items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setVerifyOpen(true)}
              className="w-full min-h-[44px] px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Verify / Add Verb</span>
            </button>
            <p className="text-[11px] text-center font-mono-num text-slate-500 dark:text-slate-400">
              {verbCount} verbs stored offline
            </p>
          </div>
        </aside>

        {/* Workspace Content */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-5 pb-24 lg:pb-10">
          <div className="max-w-6xl mx-auto space-y-5">
            {/* Queued Online Verifications Ready Banner */}
            {readyQueueCount > 0 && (
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 p-3.5 flex flex-wrap items-center justify-between gap-3 no-print">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  <span>
                    {readyQueueCount} queued verb{readyQueueCount === 1 ? '' : 's'} verified online and ready for review.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setVerifyOpen(true)}
                  className="min-h-[36px] px-3 rounded-xl bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800"
                >
                  Review &amp; Save
                </button>
              </div>
            )}

            {/* Speech / Voice Guidance Banner */}
            {speechNotice && (
              <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 p-3.5 flex items-start justify-between gap-3 no-print">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                  <VolumeX className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p>{speechNotice}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSpeechNotice(null);
                        setActiveTab('settings');
                      }}
                      className="text-xs font-semibold underline underline-offset-2 text-amber-800 dark:text-amber-300"
                    >
                      View Arabic Voice Setup Instructions
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSpeechNotice(null)}
                  aria-label="Dismiss voice notice"
                  className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {activeTab === 'dictionary' && (
              <DictionaryView
                settings={settings}
                onSelectTasreef={handleOpenTasreef}
                onOpenVerify={() => setVerifyOpen(true)}
                onSpeakError={handleSpeakError}
              />
            )}

            {activeTab === 'tasreef' && (
              <TasreefView
                verb={selectedVerb}
                settings={settings}
                onBackToDictionary={() => setActiveTab('dictionary')}
                onSelectVerb={(v) => setSelectedVerb(v)}
                onSpeakError={handleSpeakError}
              />
            )}

            {activeTab === 'book' && (
              <BookView
                settings={settings}
                onSpeakError={handleSpeakError}
              />
            )}

            {activeTab === 'practice' && (
              <PracticeView
                settings={settings}
                onOpenTasreef={handleOpenTasreef}
                onSpeakError={handleSpeakError}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                settings={settings}
                onUpdateSettings={updateSettings}
                isOnline={isOnline}
                offlineReady={pwa.offlineReady}
                isInstallable={pwa.isInstallable}
                isInstalled={pwa.isInstalled}
                isIOS={pwa.isIOS}
                onInstall={pwa.install}
                verbCount={verbCount}
              />
            )}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav
        aria-label="Mobile navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 pb-safe border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md no-print"
      >
        <div className="grid grid-cols-5 h-full">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] transition-colors ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] leading-tight">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Online Verification & Manual Verb Modal */}
      <VerifyVerbModal
        isOpen={verifyOpen}
        onClose={() => setVerifyOpen(false)}
        isOnline={isOnline}
        apiKey={settings.geminiApiKey}
        modelName={settings.geminiModel}
        onOpenSettings={() => setActiveTab('settings')}
        onVerbSaved={(saved) => handleOpenTasreef(saved)}
      />
    </div>
  );
}
