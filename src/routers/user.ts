import express from "express";
import { getRateLimitConfig } from "../middleware/rateLimit";
import { ExtendedRequest } from "../types/express";

const router: express.Router = express.Router();
const rateLimitConfig = getRateLimitConfig();

// Apply user-specific rate limiting to all user routes
router.use(rateLimitConfig.endpoints.users);

// Get all users (rate limited)
router.get("/", (req: ExtendedRequest, res: express.Response) => {
    res.json({
        message: "Users endpoint - rate limited",
        remaining: req.rateLimit?.remaining || "unknown",
        limit: req.rateLimit?.limit || "unknown",
    });
});

// Get user by ID (rate limited)
router.get("/:id", (req: ExtendedRequest, res: express.Response) => {
    res.json({
        message: `User ${req.params.id} details`,
        remaining: req.rateLimit?.remaining || "unknown",
        limit: req.rateLimit?.limit || "unknown",
    });
});

// Create user (rate limited)
router.post("/", (req: ExtendedRequest, res: express.Response) => {
    res.json({
        message: "User created successfully",
        remaining: req.rateLimit?.remaining || "unknown",
        limit: req.rateLimit?.limit || "unknown",
    });
});

export default router;
