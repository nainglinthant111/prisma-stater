import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers";
import { errorHandler, notFound } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

const app: express.Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
