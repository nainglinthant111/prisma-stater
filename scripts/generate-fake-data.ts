import { faker } from "@faker-js/faker";

// Generate fake user data for testing
export const generateFakeUser = () => ({
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
    bio: faker.lorem.sentence(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    website: faker.internet.url(),
    company: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
});

// Generate multiple fake users
export const generateFakeUsers = (count: number = 10) => {
    return Array.from({ length: count }, () => generateFakeUser());
};

// Example usage
if (require.main === module) {
    console.log("🎲 Generating fake user data...\n");

    const users = generateFakeUsers(5);

    users.forEach((user, index) => {
        console.log(`👤 User ${index + 1}:`);
        console.log(`   Name: ${user.firstName} ${user.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Phone: ${user.phone}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Status: ${user.status}`);
        console.log(`   Company: ${user.company}`);
        console.log(`   Job: ${user.jobTitle}`);
        console.log(
            `   Location: ${user.city}, ${user.state}, ${user.country}`
        );
        console.log("");
    });

    console.log("✅ Fake data generation completed!");
}
