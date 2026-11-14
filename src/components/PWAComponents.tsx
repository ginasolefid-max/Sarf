import { useEffect, useState } from 'react';
import { Download, Wifi, WifiOff } from 'lucide-react';
import { Language } from '../types/arabic';
import { t } from '../i18n/translations';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isStandalone =
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as unknown as { standalone?: boolean }).standalone === true);
    if (isStandalone) setIsInstalled(true);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    return outcome === 'accepted';
  };

  return { canInstall: !!deferredPrompt && !isInstalled, isInstalled, promptInstall };
}

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return isOnline;
}

export function PWAInstallButton({ lang }: { lang: Language }) {
  const { canInstall, promptInstall } = usePWAInstall();
  if (!canInstall) return null;

  return (
    <button
      type="button"
      onClick={() => void promptInstall()}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-emerald-700/25 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-950/60 dark:text-emerald-200 dark:hover:bg-emerald-900/70 whitespace-nowrap shrink-0 transition-colors"
    >
      <Download className="w-3.5 h-3.5" />
      <span>{t('installApp', lang)}</span>
    </button>
  );
}

export function OfflineIndicator({ lang }: { lang: Language }) {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div
      role="status"
      className="no-print flex items-center justify-center gap-2 px-4 py-1.5 text-xs font-medium bg-amber-50 text-amber-900 border-b border-amber-200 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-800/60"
    >
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>{t('offlineBadge', lang)}</span>
    </div>
  );
}

export function ConnectivityCaption({ lang }: { lang: Language }) {
  const isOnline = useOnlineStatus();
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
      {isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
      <span>
        {isOnline
          ? lang === 'ar'
            ? 'جاهز محليًا ومتصل'
            : lang === 'tl'
              ? 'Handa nang offline & online'
              : 'Offline-ready & synced locally'
          : t('offlineBadge', lang)}
      </span>
    </span>
  );
}
