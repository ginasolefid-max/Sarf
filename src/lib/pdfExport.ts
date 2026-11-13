import { jsPDF } from 'jspdf';
import type { ConjugationTable, VerbEntry } from '../types/sarf';
import { PRONOUNS, AMR_PRONOUN_KEYS } from './sarfEngine';

/**
 * Exports a verb's full 14-pronoun Tasreef table to PDF by rendering high-DPI
 * HTML5 Canvas pages with the browser's loaded Arabic fonts (ensuring 100% accurate
 * RTL ligatures and harakat), then embedding them into a clean A4 PDF.
 */
export async function exportTasreefToPDF(
  verb: VerbEntry,
  table: ConjugationTable,
  arabicFontName: string
): Promise<void> {
  const width = 1240;
  const height = 1754; // A4 at ~150 DPI
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  // Page 1: Header + Derived Nouns + 14-Pronoun Madhi / Mudhari / Majzum
  const c1 = document.createElement('canvas');
  c1.width = width;
  c1.height = height;
  const ctx = c1.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  const arFont =
    arabicFontName === 'noto'
      ? '"Noto Naskh Arabic", serif'
      : arabicFontName === 'scheherazade'
      ? '"Scheherazade New", serif'
      : '"Amiri", serif';

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Header band
  ctx.fillStyle = '#064E3B';
  ctx.fillRect(0, 0, width, 168);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 52px ${arFont}`;
  ctx.textAlign = 'right';
  ctx.direction = 'rtl';
  ctx.fillText(`${verb.madhi}  —  ${verb.mudhari}`, width - 64, 82);

  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.direction = 'ltr';
  ctx.fillText(`Sarf Companion · Tasreef Sheet`, 64, 58);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    `Root: ${verb.root}  |  Form ${verb.form} (${verb.bab})  |  Type: ${verb.verbType}`,
    64,
    102
  );
  ctx.fillStyle = '#FDE68A';
  ctx.font = '18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Meanings: ${verb.meanings.join(', ')}`, 64, 136);

  // Derived nouns row
  let y = 212;
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Derived Forms (المشتقات)', 64, y);
  y += 18;

  const derivedItems = [
    ['Masdar', table.derived.masdar],
    ["Ism Fa'il", table.derived.ismFail],
    ["Ism Maf'ul", table.derived.ismMaful || '—'],
    ['Zaman/Makan', table.derived.ismZamanMakan || '—'],
    ['Ism Alah', table.derived.ismAlah || '—'],
  ];

  const boxW = (width - 128 - 48) / 5;
  derivedItems.forEach(([label, val], idx) => {
    const bx = 64 + idx * (boxW + 12);
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 1.5;
    ctx.fillRect(bx, y, boxW, 88);
    ctx.strokeRect(bx, y, boxW, 88);

    ctx.fillStyle = '#64748B';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.direction = 'ltr';
    ctx.fillText(label, bx + boxW / 2, y + 26);

    ctx.fillStyle = '#0F172A';
    ctx.font = `bold 28px ${arFont}`;
    ctx.direction = 'rtl';
    ctx.fillText(val, bx + boxW / 2, y + 68);
  });

  // 14-pronoun table
  y += 130;
  ctx.textAlign = 'left';
  ctx.direction = 'ltr';
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Full 14-Pronoun Conjugation (الماضي والمضارع والمجزوم)', 64, y);
  y += 18;

  const cols = [
    { label: 'Pronoun', x: 64, w: 190, align: 'left' as const },
    { label: 'الماضي (Madhi)', x: 254, w: 225, align: 'center' as const },
    { label: 'المضارع (Mudhari)', x: 479, w: 225, align: 'center' as const },
    { label: 'المنصوب (Mansub)', x: 704, w: 235, align: 'center' as const },
    { label: 'المجزوم (Majzum)', x: 939, w: 237, align: 'center' as const },
  ];

  // Table header
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(64, y, width - 128, 48);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px "Plus Jakarta Sans", sans-serif';
  cols.forEach((col) => {
    ctx.textAlign = col.align;
    ctx.direction = 'ltr';
    const tx = col.align === 'center' ? col.x + col.w / 2 : col.x + 14;
    ctx.fillText(col.label, tx, y + 30);
  });
  y += 48;

  const rowH = 58;
  PRONOUNS.forEach((p, idx) => {
    ctx.fillStyle = idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC';
    ctx.fillRect(64, y, width - 128, rowH);
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    ctx.strokeRect(64, y, width - 128, rowH);

    // Pronoun label
    ctx.fillStyle = '#0F172A';
    ctx.font = `bold 22px ${arFont}`;
    ctx.textAlign = 'left';
    ctx.direction = 'ltr';
    ctx.fillText(`${p.ar}  (${p.label})`, 78, y + 37);

    const vals = [
      table.madhi[p.key],
      table.mudhari[p.key],
      table.mansub[p.key],
      table.majzum[p.key],
    ];
    vals.forEach((v, cIdx) => {
      const col = cols[cIdx + 1];
      ctx.fillStyle = '#0F172A';
      ctx.font = `bold 26px ${arFont}`;
      ctx.textAlign = 'center';
      ctx.direction = 'rtl';
      ctx.fillText(v, col.x + col.w / 2, y + 39);
    });
    y += rowH;
  });

  // Imperative & Prohibitive section at bottom of page
  y += 42;
  ctx.textAlign = 'left';
  ctx.direction = 'ltr';
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Imperative & Prohibitive (الأمر والنهي)', 64, y);
  y += 16;

  const amrColW = (width - 128) / 6;
  AMR_PRONOUN_KEYS.forEach((pk, idx) => {
    const pMeta = PRONOUNS.find((p) => p.key === pk)!;
    const bx = 64 + idx * amrColW;
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#CBD5E1';
    ctx.fillRect(bx, y, amrColW, 118);
    ctx.strokeRect(bx, y, amrColW, 118);

    ctx.fillStyle = '#64748B';
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.direction = 'ltr';
    ctx.fillText(`${pMeta.ar} (${pMeta.label})`, bx + amrColW / 2, y + 24);

    ctx.fillStyle = '#047857';
    ctx.font = `bold 25px ${arFont}`;
    ctx.direction = 'rtl';
    ctx.fillText(table.amr[pk], bx + amrColW / 2, y + 64);

    ctx.fillStyle = '#B45309';
    ctx.fillText(table.nahy[pk], bx + amrColW / 2, y + 102);
  });

  const imgData = c1.toDataURL('image/png');
  doc.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);

  const safeName = verb.root.replace(/[^a-zA-Z0-9\u0600-\u06FF-]/g, '');
  doc.save(`tasreef-${safeName}-${verb.form}.pdf`);
}
