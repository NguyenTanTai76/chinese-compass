export function parseRetryAfterMs(value: string | null): number | undefined {
  if (!value) return undefined;
  const delta = Number.parseInt(value, 10);
  if (Number.isFinite(delta)) return delta * 1000;
  const date = Date.parse(value);
  if (Number.isFinite(date)) return Math.max(0, date - Date.now());
  return undefined;
}

export type QuotaState = { provider: string; until: number; retryAfterMs: number };

export class QuotaCooldown {
  private readonly map = new Map<string, number>();

  isCooling(provider: string): boolean {
    const until = this.map.get(provider);
    return Boolean(until && Date.now() < until);
  }

  remainingMs(provider: string): number {
    const until = this.map.get(provider);
    if (!until) return 0;
    return Math.max(0, until - Date.now());
  }

  mark(provider: string, retryAfterMs: number): void {
    this.map.set(provider, Date.now() + Math.max(1000, retryAfterMs));
  }

  clear(provider: string): void {
    this.map.delete(provider);
  }
}

export const quotaCooldown = new QuotaCooldown();
