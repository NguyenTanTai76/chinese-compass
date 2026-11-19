import { VOCAB_MAP, type VocabEntry } from "@/lib/content/vocab";

export type Segment = {
  text: string;
  entry?: VocabEntry;
};

const CJK = /[\u4e00-\u9fff]/;
const MAX_WORD = 4;

export function isCjk(text: string): boolean {
  return CJK.test(text);
}

export function segmentText(text: string): Segment[] {
  const chars = Array.from(text);
  const segments: Segment[] = [];
  let index = 0;

  while (index < chars.length) {
    let matched: VocabEntry | undefined;
    let matchedLength = 0;

    for (let size = Math.min(MAX_WORD, chars.length - index); size >= 1; size--) {
      const candidate = chars.slice(index, index + size).join("");
      const entry = VOCAB_MAP[candidate];
      if (entry) {
        matched = entry;
        matchedLength = size;
        break;
      }
    }

    if (matched) {
      segments.push({ text: matched.hanzi, entry: matched });
      index += matchedLength;
    } else {
      segments.push({ text: chars[index] });
      index += 1;
    }
  }

  return segments;
}
