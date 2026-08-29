// Simple in-memory sliding-window rate limiter.
//
// This is fine for a single Node server/instance. If you deploy to a
// multi-instance / serverless environment where you need limits to be
// shared across instances, swap this for Upstash Redis or Vercel's
// built-in rate limiting (@upstash/ratelimit) instead. The interface
// below is deliberately tiny so that swap is a one-file change.

type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { ok: true, remaining: limit - 1 };
  }

  existing.count += 1;
  const ok = existing.count <= limit;
  return { ok, remaining: Math.max(0, limit - existing.count) };
}

// Periodically clear stale buckets so this doesn't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > 10 * 60 * 1000) buckets.delete(key);
  }
}, 5 * 60 * 1000);

export function clientIpFrom(headers: Headers): string {
  // Trust the platform-set header when behind Vercel/Cloudflare; fall back
  // to a constant so local dev doesn't crash. Never trust a client-supplied
  // IP header for anything security-critical beyond rate limiting.
  return (
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
