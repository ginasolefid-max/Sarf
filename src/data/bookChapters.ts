import { BOOK_CHAPTERS_PART_1, type BookChapter } from './bookChaptersPart1';
import { BOOK_CHAPTERS_PART_2 } from './bookChaptersPart2';
import { BOOK_CHAPTERS_PART_3 } from './bookChaptersPart3';
import { BOOK_CHAPTERS_PART_4 } from './bookChaptersPart4';
import { BOOK_CHAPTERS_PART_5 } from './bookChaptersPart5';
import { BOOK_CHAPTERS_PART_6 } from './bookChaptersPart6';
import { BOOK_CHAPTERS_PART_7 } from './bookChaptersPart7';

export type { BookChapter, BookExample, BookQuizQuestion, BookSection, BookTable } from './bookChaptersPart1';

export const BOOK_CHAPTERS: BookChapter[] = [
  ...BOOK_CHAPTERS_PART_1,
  ...BOOK_CHAPTERS_PART_2,
  ...BOOK_CHAPTERS_PART_3,
  ...BOOK_CHAPTERS_PART_4,
  ...BOOK_CHAPTERS_PART_5,
  ...BOOK_CHAPTERS_PART_6,
  ...BOOK_CHAPTERS_PART_7,
];
