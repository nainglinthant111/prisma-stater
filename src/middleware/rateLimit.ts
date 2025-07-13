import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { Request, Response } from "express";

// Helper function to get client IP
const getClientIP = (req: Request): string => {
    return (
        (req.headers["x-forwarded-for"] as string) ||
        (req.headers["x-real-ip"] as string) ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        "unknown"
    );
};

// Helper function to create custom key generator
const createKeyGenerator = (prefix: string) => {
    return (req: Request) => {
        const ip = getClientIP(req);
        const userId = req.user?.id || "anonymous";
        return `${prefix}:${ip}:${userId}`;
    };
};

// Global rate limiter - applies to all routes
export const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: "Too many requests from this IP, please try again later.",
        retryAfter: "15 minutes",
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: createKeyGenerator("global"),
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            error: "Too many requests",
            message: "Please try again later",
            retryAfter: Math.ceil(
                (req.rateLimit?.resetTime || Date.now()) / 1000
            ),
        });
    },
});

// Strict rate limiter for authentication endpoints
export const authRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: "Too many authentication attempts, please try again later.",
        retryAfter: "15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: createKeyGenerator("auth"),
    skipSuccessfulRequests: true, // Don't count successful requests
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            error: "Too many authentication attempts",
            message: "Please wait before trying again",
            retryAfter: Math.ceil(
                (req.rateLimit?.resetTime || Date.now()) / 1000
            ),
        });
    },
});

// API rate limiter for general API endpoints
export const apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: {
        error: "Too many API requests, please try again later.",
        retryAfter: "15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: createKeyGenerator("api"),
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            error: "Too many API requests",
            message: "Please try again later",
            retryAfter: Math.ceil(
                (req.rateLimit?.resetTime || Date.now()) / 1000
            ),
        });
    },
});

// User-specific rate limiter (when user is authenticated)
export const userRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each user to 200 requests per windowMs
    message: {
        error: "Too many requests for this user, please try again later.",
        retryAfter: "15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req: Request) => {
        const userId = req.user?.id || "anonymous";
        return `user:${userId}`;
    },
    skip: (req: Request) => !req.user?.id, // Skip if user is not authenticated
    handler: (req: Request, res: Response) => {
        res.status(429).json({
            error: "Too many requests for this user",
            message: "Please try again later",
            retryAfter: Math.ceil(
                (req.rateLimit?.resetTime || Date.now()) / 1000
            ),
        });
    },
});

// Slow down middleware for repeated requests
export const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // Allow 50 requests per 15 minutes without delay
    delayMs: 500, // Add 500ms delay per request after delayAfter
    maxDelayMs: 20000, // Maximum delay of 20 seconds
    keyGenerator: createKeyGenerator("speed"),
    skip: (req: Request) => {
        // Skip for static files
        return req.path.startsWith("/static");
    },
});

// Specific rate limiters for different endpoints
export const createEndpointRateLimit = (
    endpoint: string,
    max: number,
    windowMs: number = 15 * 60 * 1000
) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            error: `Too many requests to ${endpoint}`,
            retryAfter: `${Math.ceil(windowMs / 60000)} minutes`,
        },
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: createKeyGenerator(endpoint),
        handler: (req: Request, res: Response) => {
            res.status(429).json({
                error: `Too many requests to ${endpoint}`,
                message: "Please try again later",
                retryAfter: Math.ceil(
                    (req.rateLimit?.resetTime || Date.now()) / 1000
                ),
            });
        },
    });
};

// Rate limiters for specific endpoints
export const userEndpointsRateLimit = createEndpointRateLimit(
    "users",
    30,
    15 * 60 * 1000
);
export const adminEndpointsRateLimit = createEndpointRateLimit(
    "admin",
    20,
    15 * 60 * 1000
);
export const publicEndpointsRateLimit = createEndpointRateLimit(
    "public",
    100,
    15 * 60 * 1000
);

// Development rate limiter (more lenient for development)
export const devRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Much higher limit for development
    message: {
        error: "Development rate limit exceeded",
        retryAfter: "15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: createKeyGenerator("dev"),
    skip: (req: Request) => process.env.NODE_ENV !== "development",
});

// Rate limit configuration for different environments
export const getRateLimitConfig = () => {
    const isDev = process.env.NODE_ENV === "development";
    const isProd = process.env.NODE_ENV === "production";

    return {
        global: isDev ? devRateLimit : globalRateLimit,
        auth: authRateLimit, // Same for all environments
        api: isDev ? devRateLimit : apiRateLimit,
        user: userRateLimit,
        speed: speedLimiter,
        endpoints: {
            users: userEndpointsRateLimit,
            admin: adminEndpointsRateLimit,
            public: publicEndpointsRateLimit,
        },
    };
};
