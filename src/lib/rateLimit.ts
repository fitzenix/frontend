/**
 * Simple in-memory rate limiter for API routes.
 * Suitable for single-instance deployments; replace with Redis for multi-instance.
 */
type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { success: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0 };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { success: true, remaining: limit - existing.count };
}
