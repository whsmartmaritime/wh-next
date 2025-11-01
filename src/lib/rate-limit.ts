import { headers } from 'next/headers';

// Simple in-memory rate limiter
// For production with multiple instances, use Redis/Vercel KV
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Cleanup old entries every 10 minutes
setInterval(
	() => {
		const now = Date.now();
		for (const [key, value] of rateLimitMap.entries()) {
			if (now > value.resetAt) {
				rateLimitMap.delete(key);
			}
		}
	},
	10 * 60 * 1000,
);

export type RateLimitConfig = {
	maxRequests: number; // Maximum requests allowed
	windowMs: number; // Time window in milliseconds
};

export async function checkRateLimit(
	config: RateLimitConfig = {
		maxRequests: 3, // 3 requests
		windowMs: 60 * 60 * 1000, // per hour
	},
): Promise<{
	success: boolean;
	limit: number;
	remaining: number;
	resetAt: number;
}> {
	// Get client IP
	const headersList = await headers();
	const forwarded = headersList.get('x-forwarded-for');
	const realIp = headersList.get('x-real-ip');
	const ip = forwarded?.split(',')[0] || realIp || 'unknown';

	const now = Date.now();
	const key = `contact:${ip}`;

	// Get or create rate limit entry
	let entry = rateLimitMap.get(key);

	// Reset if window expired
	if (!entry || now > entry.resetAt) {
		entry = {
			count: 0,
			resetAt: now + config.windowMs,
		};
		rateLimitMap.set(key, entry);
	}

	// Increment count
	entry.count++;

	// Check if limit exceeded
	const success = entry.count <= config.maxRequests;
	const remaining = Math.max(0, config.maxRequests - entry.count);

	return {
		success,
		limit: config.maxRequests,
		remaining,
		resetAt: entry.resetAt,
	};
}
