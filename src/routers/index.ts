import express, { Router } from "express";

const router: express.Router = Router();

// API version prefix
const API_PREFIX = "/api/v1";

// Import route modules (to be created)
// import userRoutes from './user';
// import adminRoutes from './admin';

// Apply routes
// router.use(`${API_PREFIX}/users`, userRoutes);
// router.use(`${API_PREFIX}/admin`, adminRoutes);

// API info route
router.get(`${API_PREFIX}`, (req: express.Request, res: express.Response) => {
    res.json({
        message: "API is running",
        version: "1.0.0",
        endpoints: {
            users: `${API_PREFIX}/users`,
            admin: `${API_PREFIX}/admin`,
            health: "/health",
        },
    });
});

export default router;
