const windows = new Map<string, { count: number; reset: number }>();

function minuteReset(): number {
  return Math.ceil(Date.now() / 60000) * 60000;
}

export type RateLimitResult = { allowed: boolean; retryAfter: number };

export function checkRateLimit({
  userId,
  projectId = "chinese-compass",
  userPerMin = 30,
  projectPerMin = 100,
}: {
  userId: string;
  projectId?: string;
  userPerMin?: number;
  projectPerMin?: number;
}): RateLimitResult {
  const reset = minuteReset();
  const userKey = `user:${userId}:${reset}`;
  const projectKey = `project:${projectId}:${reset}`;

  const now = Date.now();
  for (const [key, entry] of windows) {
    if (entry.reset <= now) windows.delete(key);
  }

  let retryAfter = 0;

  const userEntry = windows.get(userKey) || { count: 0, reset };
  userEntry.count += 1;
  windows.set(userKey, userEntry);
  if (userEntry.count > userPerMin) {
    retryAfter = Math.max(retryAfter, Math.ceil((userEntry.reset - now) / 1000));
  }

  const projectEntry = windows.get(projectKey) || { count: 0, reset };
  projectEntry.count += 1;
  windows.set(projectKey, projectEntry);
  if (projectEntry.count > projectPerMin) {
    retryAfter = Math.max(retryAfter, Math.ceil((projectEntry.reset - now) / 1000));
  }

  return { allowed: retryAfter === 0, retryAfter: Math.max(1, retryAfter) };
}
