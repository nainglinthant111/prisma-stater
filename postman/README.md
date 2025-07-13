# Postman Collection for Prisma Starter API

This directory contains a complete Postman collection for testing the Prisma Starter API with Express, TypeScript, and Rate Limiting.

## 📁 Files

-   **`Prisma-Starter-API.postman_collection.json`** - Main API collection
-   **`Prisma-Starter-Environment.postman_environment.json`** - Environment variables
-   **`README.md`** - This documentation

## 🚀 Quick Start

### 1. Import Collection

1. Open Postman
2. Click "Import" button
3. Select `Prisma-Starter-API.postman_collection.json`
4. Click "Import"

### 2. Import Environment

1. Click "Import" again
2. Select `Prisma-Starter-Environment.postman_environment.json`
3. Click "Import"
4. Select the environment from the dropdown

### 3. Start Your Server

```bash
pnpm dev
```

### 4. Test the API

Start with the "Health & Status" folder to verify your server is running.

## 📊 Collection Structure

### 🏥 Health & Status

-   **Welcome** - `GET /` - Basic welcome message
-   **API Info** - `GET /api/v1` - API information

### 👥 Users

-   **Get All Users** - `GET /api/v1/users` - List all users
-   **Get User by ID** - `GET /api/v1/users/:id` - Get specific user
-   **Create User** - `POST /api/v1/users` - Create new user

### 🛡️ Rate Limiting Tests

-   **Test Global Rate Limit** - Test global rate limiting
-   **Test User Endpoint Rate Limit** - Test user endpoint limits
-   **Test Speed Limiting** - Test speed limiting functionality

### 🗄️ Database Operations

-   **Seed Database** - Seed with fake data
-   **Generate Fake Users** - Generate fake user data

### ⚠️ Error Handling

-   **Test 404 Error** - Test 404 error responses
-   **Test Rate Limit Error** - Test rate limit error responses

## 🔧 Environment Variables

| Variable           | Description          | Default Value           |
| ------------------ | -------------------- | ----------------------- |
| `baseUrl`          | API base URL         | `http://localhost:3000` |
| `apiVersion`       | API version          | `v1`                    |
| `authToken`        | Authentication token | (empty)                 |
| `environment`      | Environment name     | `development`           |
| `rateLimitEnabled` | Rate limiting status | `true`                  |

## 🧪 Automated Tests

The collection includes automated tests that run on every request:

### Pre-request Scripts

-   Logs request details
-   Adds timestamp header

### Test Scripts

-   ✅ Status code validation
-   ✅ Response time validation
-   ✅ JSON response validation
-   ✅ Rate limit header validation

## 📈 Rate Limiting Testing

### Global Rate Limit

-   **Limit**: 100 requests per 15 minutes (production)
-   **Development**: 1000 requests per 15 minutes
-   **Test**: Make multiple requests to any endpoint

### User Endpoint Rate Limit

-   **Limit**: 30 requests per 15 minutes
-   **Test**: Make multiple requests to `/api/v1/users`

### Speed Limiting

-   **Delay After**: 50 requests per 15 minutes
-   **Delay**: 500ms per request after limit
-   **Test**: Make many requests quickly

## 🔍 Expected Responses

### Success Response

```json
{
    "message": "Users endpoint - rate limited",
    "remaining": 29,
    "limit": 30
}
```

### Rate Limit Error

```json
{
    "error": "Too many requests",
    "message": "Please try again later",
    "retryAfter": 900
}
```

### Health Check Response

```json
{
    "status": "healthy",
    "uptime": 123.456,
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🛠️ Customization

### Add New Endpoints

1. Right-click on a folder
2. Select "Add Request"
3. Configure method, URL, and headers
4. Add test scripts if needed

### Modify Rate Limits

Update the rate limit values in your server configuration:

```typescript
// In src/middleware/rateLimit.ts
export const userEndpointsRateLimit = createEndpointRateLimit(
    "users",
    50, // Change from 30 to 50
    15 * 60 * 1000
);
```

### Add Authentication

1. Set the `authToken` environment variable
2. The collection will automatically include the Bearer token
3. Add authentication tests to your requests

## 📊 Monitoring

### Rate Limit Headers

Monitor these headers in responses:

-   `RateLimit-Limit` - Maximum requests allowed
-   `RateLimit-Remaining` - Requests remaining
-   `RateLimit-Reset` - Reset time (Unix timestamp)

### Console Logging

Check the Postman console for:

-   Request details
-   Rate limit information
-   Test results

## 🔒 Security Testing

### Rate Limit Bypass

-   Test with different IP addresses
-   Test with different user agents
-   Test with different authentication tokens

### Error Handling

-   Test with invalid JSON
-   Test with missing required fields
-   Test with malformed requests

## 📝 Best Practices

### 1. Environment Management

-   Use different environments for dev/staging/prod
-   Keep sensitive data in environment variables
-   Use environment-specific rate limits

### 2. Testing Strategy

-   Test happy path scenarios first
-   Test error conditions
-   Test rate limiting behavior
-   Test performance under load

### 3. Documentation

-   Keep request descriptions updated
-   Document expected responses
-   Note any special requirements

### 4. Maintenance

-   Update collection when API changes
-   Remove obsolete requests
-   Keep test scripts current

## 🚨 Troubleshooting

### Common Issues

1. **Connection Refused**

    - Check if server is running
    - Verify `baseUrl` environment variable
    - Check port configuration

2. **Rate Limit Errors**

    - Wait for rate limit window to reset
    - Use different IP addresses for testing
    - Check rate limit configuration

3. **Authentication Errors**
    - Verify `authToken` is set
    - Check token format and validity
    - Ensure authentication middleware is working

### Debug Mode

Enable debug logging in your server:

```typescript
// In src/middleware/rateLimit.ts
const debugRateLimit = rateLimit({
    // ... other options
    skip: (req) => {
        console.log("Rate limit check:", req.path, req.ip);
        return false;
    },
});
```

## 📚 Resources

-   [Postman Documentation](https://learning.postman.com/)
-   [Express Rate Limit](https://github.com/nfriedly/express-rate-limit)
-   [API Testing Best Practices](https://www.postman.com/company/blog/api-testing-best-practices/)
