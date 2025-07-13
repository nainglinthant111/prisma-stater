import { Request, Response, NextFunction } from "express";

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    // Log error in development
    if (process.env.NODE_ENV === "development") {
        console.error("Error:", err);
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
        },
    });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error(`Route not found - ${req.originalUrl}`) as AppError;
    error.statusCode = 404;
    next(error);
};
