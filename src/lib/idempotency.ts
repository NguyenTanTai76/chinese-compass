const cache = new Map<string, { data: unknown; status: number; expiresAt: number }>();

export function getIdempotent(key: string): { data: unknown; status: number } | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return { data: entry.data, status: entry.status };
}

export function setIdempotent(
  key: string,
  data: unknown,
  status: number,
  ttlMs = 5 * 60 * 1000,
): void {
  cache.set(key, { data, status, expiresAt: Date.now() + ttlMs });
}

export function purgeIdempotent(): void {
  const now = Date.now();
  for (const [key, entry] of cache) {
    if (entry.expiresAt <= now) cache.delete(key);
  }
}

const purgeTimer = setInterval(purgeIdempotent, 60 * 1000);
if (typeof purgeTimer.unref === "function") purgeTimer.unref();
