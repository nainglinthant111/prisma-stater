import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { getRateLimitConfig } from "./middleware/rateLimit";

// Load environment variables
dotenv.config();

const app: express.Application = express();

// Get rate limit configuration
const rateLimitConfig = getRateLimitConfig();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting
app.use(rateLimitConfig.global); // Global rate limit
app.use(rateLimitConfig.speed); // Speed limiter

// Basic route
app.get("/", (req: express.Request, res: express.Response) => {
    res.json({
        message: "Welcome to Prisma Starter API",
        status: "running",
        timestamp: new Date().toISOString(),
    });
});

// API routes
app.use(router);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
