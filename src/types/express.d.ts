import { Request } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string | number;
                [key: string]: any;
            };
            rateLimit?: {
                limit: number;
                current: number;
                remaining: number;
                resetTime: number;
                resetTimeMs: number;
            };
        }
    }
}

// Export for direct import if needed
export interface ExtendedRequest extends Request {
    user?: {
        id: string | number;
        [key: string]: any;
    };
    rateLimit?: {
        limit: number;
        current: number;
        remaining: number;
        resetTime: number;
        resetTimeMs: number;
    };
}
