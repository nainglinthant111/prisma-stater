# Faker.js Integration Guide

This project uses [Faker.js](https://fakerjs.dev/) to generate realistic fake data for testing and development.

## 🎲 Features

-   **Realistic Data**: Generate names, emails, phone numbers, addresses, etc.
-   **Consistent Types**: TypeScript support with proper type definitions
-   **Customizable**: Easy to modify and extend for your needs
-   **Multiple Formats**: Generate single users or bulk data

## 📦 Installation

Faker.js is already installed as a dependency:

```bash
pnpm install
```

## 🚀 Usage

### 1. Database Seeding

Generate 50 fake users in the database:

```bash
pnpm db:seed
```

This will:

-   Clear existing users
-   Generate 50 fake users with random data
-   Show statistics and sample users
-   Use proper Prisma types

### 2. Generate Fake Data for Testing

Generate fake users without saving to database:

```bash
# Generate 5 fake users and display them
pnpm fake:generate

# Generate 3 fake users as JSON
pnpm fake:users
```

### 3. Programmatic Usage

```typescript
import {
    generateFakeUser,
    generateFakeUsers,
} from "./scripts/generate-fake-data";

// Generate a single fake user
const user = generateFakeUser();

// Generate multiple fake users
const users = generateFakeUsers(10);
```

## 📊 Generated Data Fields

### User Information

-   **Name**: `firstName`, `lastName`
-   **Contact**: `email`, `phone`
-   **Authentication**: `password`, `role`, `status`
-   **Profile**: `image`, `bio`
-   **Location**: `address`, `city`, `state`, `country`
-   **Professional**: `company`, `jobTitle`, `website`

### Data Types

-   **Roles**: `USER`, `ADMIN`
-   **Status**: `ACTIVE`, `INACTIVE`, `FREEZE`
-   **Images**: Random avatar URLs
-   **Dates**: Realistic timestamps

## 🔧 Customization

### Modify Seed Data

Edit `prisma/seed.ts` to change:

-   Number of users generated
-   Data distribution (roles, statuses)
-   Additional fields

### Add New Fields

1. Update Prisma schema (`prisma/schema.prisma`)
2. Add field generation in seed file
3. Update utility functions

### Example: Add Company Data

```typescript
// In prisma/seed.ts
const user = await prisma.user.create({
    data: {
        // ... existing fields
        company: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        website: faker.internet.url(),
    },
});
```

## 📈 Statistics

The seed script provides detailed statistics:

```
📊 User Statistics:
   👑 Admins: 12
   👤 Users: 38
   🟢 Active: 35
   🟡 Inactive: 10
   🔴 Frozen: 5

👥 Sample Users:
   - John Doe (john.doe@example.com) - ADMIN - ACTIVE
   - Jane Smith (jane.smith@example.com) - USER - ACTIVE
   ...
```

## 🛠️ Development

### Testing with Fake Data

```typescript
import { generateFakeUser } from "./scripts/generate-fake-data";

// Use in tests
const testUser = generateFakeUser();
expect(testUser.email).toMatch(/@/);
expect(["USER", "ADMIN"]).toContain(testUser.role);
```

### API Testing

```typescript
// Generate test data for API endpoints
const users = generateFakeUsers(5);
users.forEach((user) => {
    // Test user creation
    const response = await request(app).post("/api/users").send(user);
    expect(response.status).toBe(201);
});
```

## 🔒 Security Notes

-   **Passwords**: All fake users use the same hashed password
-   **Emails**: Generated emails are not real
-   **Phone Numbers**: Generated numbers are not real
-   **Production**: Never use fake data in production

## 📝 Scripts Reference

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `pnpm db:seed`       | Seed database with 50 fake users  |
| `pnpm fake:generate` | Generate and display 5 fake users |
| `pnpm fake:users`    | Generate 3 fake users as JSON     |

## 🎯 Best Practices

1. **Consistent Seeding**: Always clear data before seeding
2. **Realistic Data**: Use appropriate Faker methods for each field
3. **Type Safety**: Use TypeScript types for generated data
4. **Testing**: Use fake data for comprehensive testing
5. **Documentation**: Keep fake data structure documented

## 🔗 Resources

-   [Faker.js Documentation](https://fakerjs.dev/)
-   [Available Faker Methods](https://fakerjs.dev/api/)
-   [Prisma Seeding Guide](https://www.prisma.io/docs/guides/database/seed-database)
