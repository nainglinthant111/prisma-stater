# Rate Limiting Implementation

This project implements comprehensive rate limiting to protect against abuse and ensure fair usage of the API.

## 🛡️ Features

-   **Global Rate Limiting** - Applies to all routes
-   **Endpoint-Specific Limits** - Different limits for different endpoints
-   **Authentication Protection** - Stricter limits for auth endpoints
-   **User-Specific Limits** - Per-user rate limiting when authenticated
-   **Speed Limiting** - Gradual slowdown for repeated requests
-   **Environment-Aware** - Different limits for development vs production
-   **IP Detection** - Handles proxy headers and real IP detection

## 📊 Rate Limit Configuration

### Global Limits

-   **Development**: 1000 requests per 15 minutes
-   **Production**: 100 requests per 15 minutes
-   **Window**: 15 minutes

### Authentication Endpoints

-   **Limit**: 5 requests per 15 minutes
-   **Skip Successful**: Yes (only counts failed attempts)
-   **Purpose**: Prevent brute force attacks

### API Endpoints

-   **Development**: 1000 requests per 15 minutes
-   **Production**: 50 requests per 15 minutes
-   **Window**: 15 minutes

### User-Specific Limits

-   **Limit**: 200 requests per 15 minutes
-   **Requires**: User authentication
-   **Purpose**: Per-user fair usage

### Endpoint-Specific Limits

-   **Users**: 30 requests per 15 minutes
-   **Admin**: 20 requests per 15 minutes
-   **Public**: 100 requests per 15 minutes

### Speed Limiting

-   **Delay After**: 50 requests per 15 minutes
-   **Delay**: 500ms per request after limit
-   **Max Delay**: 20 seconds
-   **Skip**: Health checks and static files

## 🔧 Implementation

### Middleware Structure

```typescript
// Global rate limiting
app.use(rateLimitConfig.global);

// Speed limiting
app.use(rateLimitConfig.speed);

// Route-specific limiting
router.use(rateLimitConfig.endpoints.users);
```

### Rate Limit Headers

The API returns rate limit information in headers:

```
RateLimit-Limit: 100
RateLimit-Remaining: 95
RateLimit-Reset: 1640995200
```

### Error Responses

When rate limit is exceeded:

```json
{
    "error": "Too many requests",
    "message": "Please try again later",
    "retryAfter": 900
}
```

## 🚀 Usage Examples

### Basic Rate Limiting

```typescript
import { getRateLimitConfig } from "./middleware/rateLimit";

const rateLimitConfig = getRateLimitConfig();

// Apply to all routes
app.use(rateLimitConfig.global);

// Apply to specific router
router.use(rateLimitConfig.endpoints.users);
```

### Custom Rate Limiting

```typescript
import { createEndpointRateLimit } from "./middleware/rateLimit";

const customLimit = createEndpointRateLimit("custom", 25, 10 * 60 * 1000);
router.use(customLimit);
```

### Authentication Rate Limiting

```typescript
import { authRateLimit } from "./middleware/rateLimit";

// Apply to login/register routes
app.use("/auth", authRateLimit);
```

## 📈 Monitoring

### Rate Limit Information in Responses

```typescript
router.get("/", (req, res) => {
    res.json({
        message: "Success",
        rateLimit: {
            remaining: req.rateLimit?.remaining,
            limit: req.rateLimit?.limit,
            resetTime: req.rateLimit?.resetTime,
        },
    });
});
```

### Environment Variables

```env
# Rate limiting configuration
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔒 Security Features

### IP Detection

-   Handles `X-Forwarded-For` header
-   Handles `X-Real-IP` header
-   Falls back to connection remote address
-   Supports proxy configurations

### User Authentication

-   Per-user rate limiting when authenticated
-   Anonymous user handling
-   User ID-based tracking

### Brute Force Protection

-   Stricter limits on authentication endpoints
-   Skip successful requests for auth endpoints
-   Configurable retry delays

## 🛠️ Configuration

### Development vs Production

```typescript
const getRateLimitConfig = () => {
    const isDev = process.env.NODE_ENV === "development";

    return {
        global: isDev ? devRateLimit : globalRateLimit,
        auth: authRateLimit, // Same for all environments
        api: isDev ? devRateLimit : apiRateLimit,
        // ...
    };
};
```

### Custom Limits

```typescript
// Create custom rate limiter
const customLimit = createEndpointRateLimit(
    "endpoint-name", // Endpoint identifier
    50, // Max requests
    10 * 60 * 1000 // Window in milliseconds
);
```

## 📝 Best Practices

### 1. Layer Rate Limiting

-   Apply global limits first
-   Add endpoint-specific limits
-   Use authentication limits for sensitive endpoints

### 2. Monitor Usage

-   Log rate limit violations
-   Track user behavior patterns
-   Adjust limits based on usage

### 3. User Experience

-   Provide clear error messages
-   Include retry-after information
-   Use appropriate HTTP status codes

### 4. Security

-   Don't expose internal rate limit details
-   Use secure key generation
-   Handle edge cases gracefully

## 🔍 Troubleshooting

### Common Issues

1. **Rate Limit Too Strict**

    - Adjust limits in development
    - Use environment-specific configurations

2. **IP Detection Issues**

    - Check proxy configuration
    - Verify header forwarding

3. **User Authentication**
    - Ensure user object is attached to request
    - Check authentication middleware order

### Debug Mode

```typescript
// Enable debug logging
const debugRateLimit = rateLimit({
    // ... other options
    skip: (req) => {
        console.log("Rate limit check:", req.path, req.ip);
        return false;
    },
});
```

## 📚 Resources

-   [express-rate-limit Documentation](https://github.com/nfriedly/express-rate-limit)
-   [express-slow-down Documentation](https://github.com/nfriedly/express-slow-down)
-   [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)
