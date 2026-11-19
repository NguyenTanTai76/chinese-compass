export type CharDiff = {
  type: "equal" | "missing" | "extra";
  char: string;
};

export type DiffResult = {
  ops: CharDiff[];
  similarity: number;
};

const KEEP = /[\p{L}\p{N}]/gu;

export function toChars(input: string): string[] {
  const matches = input.normalize("NFC").match(KEEP);
  return (matches ?? []).map((c) => c.toLowerCase());
}

export function normalizeText(input: string): string {
  return toChars(input).join("");
}

export function levenshtein(a: string[], b: string[]): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let prev = new Array<number>(b.length + 1);
  let curr = new Array<number>(b.length + 1);

  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }

  return prev[b.length];
}

export function similarity(expected: string, actual: string): number {
  const a = toChars(expected);
  const b = toChars(actual);
  if (a.length === 0) return 0;
  if (b.length === 0) return 0;
  const dist = levenshtein(a, b);
  return Math.max(0, 1 - dist / Math.max(a.length, b.length));
}

export function diffChars(expected: string, actual: string): DiffResult {
  const a = toChars(expected);
  const b = toChars(actual);
  const n = a.length;
  const m = b.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array<number>(m + 1).fill(0),
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        a[i] === b[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const ops: CharDiff[] = [];
  let i = 0;
  let j = 0;

  while (i < n && j < m) {
    if (a[i] === b[j]) {
      ops.push({ type: "equal", char: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      ops.push({ type: "missing", char: a[i] });
      i++;
    } else {
      ops.push({ type: "extra", char: b[j] });
      j++;
    }
  }

  while (i < n) {
    ops.push({ type: "missing", char: a[i] });
    i++;
  }
  while (j < m) {
    ops.push({ type: "extra", char: b[j] });
    j++;
  }

  return { ops, similarity: similarity(expected, actual) };
}

export function scorePercent(expected: string, actual: string): number {
  return Math.round(similarity(expected, actual) * 100);
}
