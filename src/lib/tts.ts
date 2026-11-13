export interface ArabicVoiceStatus {
  supported: boolean;
  voicesLoaded: boolean;
  arabicVoices: SpeechSynthesisVoice[];
  preferredVoice: SpeechSynthesisVoice | null;
}

export function getArabicVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const all = window.speechSynthesis.getVoices();
  return all.filter((v) => v.lang.toLowerCase().startsWith('ar'));
}

export function pickPreferredArabicVoice(): SpeechSynthesisVoice | null {
  const voices = getArabicVoices();
  if (voices.length === 0) return null;
  return (
    voices.find((v) => v.lang.toLowerCase() === 'ar-sa') ||
    voices.find((v) => v.lang.toLowerCase().startsWith('ar-')) ||
    voices[0]
  );
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakArabic(
  text: string,
  options: { rate?: number; repeat?: number; onEnd?: () => void; onError?: (err: string) => void } = {}
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options.onError?.('Web Speech API is not supported in this browser.');
    return;
  }

  const rate = Math.min(1.5, Math.max(0.5, options.rate ?? 0.9));
  const repeat = Math.min(3, Math.max(1, options.repeat ?? 1));

  window.speechSynthesis.cancel();

  const preferred = pickPreferredArabicVoice();
  let remaining = repeat;

  const speakOnce = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = preferred?.lang || 'ar-SA';
    if (preferred) utterance.voice = preferred;
    utterance.rate = rate;

    utterance.onend = () => {
      remaining--;
      if (remaining > 0) {
        setTimeout(speakOnce, 320);
      } else {
        options.onEnd?.();
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        options.onError?.(`Speech error: ${e.error}`);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  speakOnce();
}

export const VOICE_INSTALL_STEPS = [
  {
    platform: 'iPhone / iPad (iOS)',
    steps: 'Settings → Accessibility → Spoken Content → Voices → Arabic → Download "Maged" or "Laila" (ar-SA).',
  },
  {
    platform: 'Android',
    steps: 'Settings → System / Accessibility → Text-to-speech output → Preferred engine settings → Install voice data → Arabic.',
  },
  {
    platform: 'Windows / macOS',
    steps: 'System Settings → Accessibility / Speech → Add Voices → Select Arabic (Saudi Arabia).',
  },
];
