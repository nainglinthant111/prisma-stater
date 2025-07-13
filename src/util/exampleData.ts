import { faker } from "@faker-js/faker";

// Generate fake users using Faker
export const generateFakeUsers = (count: number = 10) => {
    return Array.from({ length: count }, () => ({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: `+1${faker.string.numeric(10)}`, // Format: +1234567890 (11 chars)
        password: "password123",
        role: faker.helpers.arrayElement(["USER", "ADMIN"]) as "USER" | "ADMIN",
        image: faker.image.avatar(),
        status: faker.helpers.arrayElement(["ACTIVE", "INACTIVE", "FREEZE"]) as
            | "ACTIVE"
            | "INACTIVE"
            | "FREEZE",
    }));
};

export const exampleUsers = generateFakeUsers(5);

export const exampleUserData = {
    // Sample user for testing
    testUser: {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "+1234567899",
        password: "testpassword123",
        role: "USER" as const,
        status: "ACTIVE" as const,
    },

    // Sample admin for testing
    testAdmin: {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        phone: "+1234567898",
        password: "adminpassword123",
        role: "ADMIN" as const,
        status: "ACTIVE" as const,
    },

    // Invalid user data for testing validation
    invalidUser: {
        firstName: "",
        email: "invalid-email",
        password: "123", // too short
    },
};

export const userStatuses = ["ACTIVE", "INACTIVE", "FREEZE"] as const;
export const userRoles = ["USER", "ADMIN"] as const;
