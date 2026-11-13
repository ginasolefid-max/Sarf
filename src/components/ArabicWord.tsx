import React from 'react';
import { Volume2 } from 'lucide-react';
import { segmentWordByRoot } from '../lib/arabicUtils';
import { speakArabic } from '../lib/tts';
import type { VerbForm } from '../types/sarf';

interface ArabicWordProps {
  text: string;
  root?: string;
  form?: VerbForm;
  highlight?: boolean;
  scalable?: boolean;
  className?: string;
  showSpeaker?: boolean;
  ttsRate?: number;
  ttsRepeat?: number;
  onSpeakError?: (msg: string) => void;
}

export const ArabicWord: React.FC<ArabicWordProps> = ({
  text,
  root,
  form = 'I',
  highlight = false,
  scalable = false,
  className = '',
  showSpeaker = false,
  ttsRate = 0.9,
  ttsRepeat = 1,
  onSpeakError,
}) => {
  const fontClass = scalable ? 'arabic-scalable' : 'arabic-text';

  const renderContent = () => {
    if (!highlight || !root) {
      return <span>{text}</span>;
    }
    const segments = segmentWordByRoot(text, root, form);
    return segments.map((seg, idx) => {
      if (seg.role === 'space') return <span key={idx}> </span>;
      if (seg.role === 'root') {
        return (
          <span
            key={idx}
            className="text-emerald-700 dark:text-emerald-400 font-bold"
          >
            {seg.text}
          </span>
        );
      }
      return (
        <span
          key={idx}
          className="text-amber-700 dark:text-amber-400"
        >
          {seg.text}
        </span>
      );
    });
  };

  if (!showSpeaker) {
    return (
      <span lang="ar" dir="rtl" className={`${fontClass} ${className}`}>
        {renderContent()}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span lang="ar" dir="rtl" className={`${fontClass} ${className}`}>
        {renderContent()}
      </span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          speakArabic(text, {
            rate: ttsRate,
            repeat: ttsRepeat,
            onError: onSpeakError,
          });
        }}
        aria-label={`Pronounce ${text}`}
        className="min-h-[36px] min-w-[36px] inline-flex items-center justify-center rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 dark:text-slate-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-950/60 transition-colors shrink-0"
      >
        <Volume2 className="w-4 h-4" />
      </button>
    </span>
  );
};
