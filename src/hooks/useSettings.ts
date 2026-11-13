import { useEffect, useState } from 'react';
import type { AppSettings, ArabicFontFamily } from '../types/sarf';

const SETTINGS_STORAGE_KEY = 'sarf_companion_settings_v1';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  rtlLayout: false,
  arabicFont: 'amiri',
  arabicFontSize: 26,
  ttsRate: 0.9,
  ttsRepeat: 1,
  geminiApiKey: '',
  geminiModel: 'gemini-4-hydrogen',
};

const FONT_MAP: Record<ArabicFontFamily, string> = {
  amiri: '"Amiri", "Noto Naskh Arabic", serif',
  noto: '"Noto Naskh Arabic", "Amiri", serif',
  scheherazade: '"Scheherazade New", "Amiri", serif',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (raw) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      }
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return { ...DEFAULT_SETTINGS, theme: 'dark' };
      }
    } catch {
      // Fallback cleanly
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage quota errors
    }

    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.dir = settings.rtlLayout ? 'rtl' : 'ltr';
    root.style.setProperty('--ar-font-family', FONT_MAP[settings.arabicFont]);
    root.style.setProperty('--ar-font-size', `${settings.arabicFontSize}px`);
  }, [settings]);

  const updateSettings = (patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  };

  return { settings, updateSettings };
}
