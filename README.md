# Prisma Starter - Express API

A modern Express.js API starter with TypeScript, ready for Prisma integration.

## 🚀 Features

-   **Express.js** - Fast, unopinionated web framework
-   **TypeScript** - Type-safe JavaScript
-   **CORS** - Cross-origin resource sharing
-   **Environment Variables** - Secure configuration management
-   **Error Handling** - Centralized error management
-   **Modular Structure** - Organized code architecture
-   **Health Check** - API monitoring endpoint

## 📁 Project Structure

```
prisma-stater/
├── app/
│   └── index.ts          # Server entry point
├── src/
│   ├── app.ts            # Express app configuration
│   ├── routers/          # Route definitions
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── middleware/       # Custom middleware
│   └── util/            # Utility functions
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Setup

1. **Install dependencies:**

    ```bash
    pnpm install
    ```

2. **Create environment file:**

    ```bash
    cp .env.example .env
    ```

3. **Start development server:**
    ```bash
    pnpm dev
    ```

## 🌐 API Endpoints

-   `GET /` - Welcome message
-   `GET /health` - Health check
-   `GET /api/v1` - API information

## 🔧 Development

### Available Scripts

-   `pnpm dev` - Start development server with nodemon
-   `pnpm build` - Build for production
-   `pnpm start` - Start production server

### Environment Variables

Create a `.env` file with:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/prisma_starter"
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

## 📝 Next Steps

1. **Add Prisma:**

    ```bash
    pnpm add prisma @prisma/client
    pnpm prisma init
    ```

2. **Create database models** in `prisma/schema.prisma`

3. **Add authentication** with JWT

4. **Implement CRUD operations** for your entities

5. **Add validation** with libraries like Joi or Zod

## 🏗️ Architecture

-   **Controllers** - Handle HTTP requests/responses
-   **Services** - Business logic and data processing
-   **Routers** - Route definitions and middleware
-   **Middleware** - Request/response processing
-   **Utils** - Helper functions and utilities

## 🔒 Security

-   CORS enabled for cross-origin requests
-   JSON body parsing with size limits
-   Centralized error handling
-   Environment variable protection

## 📊 Monitoring

The `/health` endpoint provides:

-   Server status
-   Uptime information
-   Timestamp

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

ISC License
