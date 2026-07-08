// ═══════════════════════════════════════════════════════════
//  Rate Limiter — In-memory sliding window
//  Vira Rate Limiter (no external dependencies)
// ═══════════════════════════════════════════════════════════

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    // Remove timestamps older than 1 hour
    entry.timestamps = entry.timestamps.filter(t => now - t < 3600000);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

// ── Check rate limit ──────────────────────────────────

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
}

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60000, // 1 minute
): RateLimitResult {
  cleanup();

  const now = Date.now();
  let entry = store.get(identifier);

  if (!entry) {
    entry = { timestamps: [] };
    store.set(identifier, entry);
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);

  if (entry.timestamps.length >= maxRequests) {
    const oldestInWindow = entry.timestamps[0];
    return {
      allowed: false,
      remaining: 0,
      resetInMs: windowMs - (now - oldestInWindow),
    };
  }

  entry.timestamps.push(now);
  return {
    allowed: true,
    remaining: maxRequests - entry.timestamps.length - 1,
    resetInMs: windowMs,
  };
}

// ── Rate limit middleware for Next.js API routes ───────

export function rateLimitHandler(options?: { maxRequests?: number; windowMs?: number }) {
  const max = options?.maxRequests ?? 5;
  const window = options?.windowMs ?? 60000;

  return function rateLimit(ip: string): RateLimitResult {
    return checkRateLimit(`rl:${ip}`, max, window);
  };
}

// Pre-configured limiters
export const loginRateLimit = rateLimitHandler({ maxRequests: 5, windowMs: 60000 });
export const apiRateLimit = rateLimitHandler({ maxRequests: 60, windowMs: 60000 });
export const contactRateLimit = rateLimitHandler({ maxRequests: 3, windowMs: 300000 }); // 3 per 5 min