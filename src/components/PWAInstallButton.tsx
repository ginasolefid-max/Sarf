import React, { useState } from 'react';
import { CheckCircle2, Download, Share, Smartphone, Wifi, WifiOff, X } from 'lucide-react';

interface PWAInstallButtonProps {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
  compact?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  isInstallable,
  isInstalled,
  isIOS,
  onInstall,
  compact = false,
}) => {
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await onInstall();
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 rounded-xl font-medium transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
          isInstallable
            ? 'bg-emerald-700 text-white hover:bg-emerald-800 px-3.5 py-2 text-xs'
            : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 px-3 py-2 text-xs'
        }`}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{compact ? 'Install' : isIOS ? 'Install on iOS' : 'Install App'}</span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Install Sarf Companion
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close install instructions"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-decimal list-inside">
                <li>
                  Tap the <strong className="inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 inline" /> Share</strong> button in Safari.
                </li>
                <li>
                  Scroll down and tap <strong>Add to Home Screen</strong>.
                </li>
                <li>
                  Tap <strong>Add</strong> in the top-right corner to launch Sarf Companion offline as a standalone app.
                </li>
              </ol>
            ) : (
              <div className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  To install on your phone or computer:
                </p>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>
                    <strong>Android (Chrome / Edge):</strong> Open the browser menu (⋮) and tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                  </li>
                  <li>
                    <strong>Desktop (Chrome / Edge):</strong> Click the install icon in the address bar.
                  </li>
                </ul>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full min-h-[44px] rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

interface StatusIndicatorsProps {
  isOnline: boolean;
  offlineReady: boolean;
  needRefresh: boolean;
  onRefresh: () => void;
}

export const StatusIndicators: React.FC<StatusIndicatorsProps> = ({
  isOnline,
  offlineReady,
  needRefresh,
  onRefresh,
}) => {
  return (
    <div className="flex items-center gap-3 text-xs whitespace-nowrap">
      <span
        className={`inline-flex items-center gap-1.5 font-medium ${
          isOnline
            ? 'text-emerald-700 dark:text-emerald-400'
            : 'text-amber-700 dark:text-amber-400'
        }`}
      >
        {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </span>

      {offlineReady && (
        <span className="hidden sm:inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span>Offline ready</span>
        </span>
      )}

      {needRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          className="text-emerald-700 dark:text-emerald-400 font-semibold underline underline-offset-2"
        >
          Update ready
        </button>
      )}
    </div>
  );
};
