import { PrismaClient } from "../generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Generate a hashed password (in real app, use bcrypt)
const generateHashedPassword = () => {
    return "$2b$10$rQZ8N3YxGZ8N3YxGZ8N3YxGZ8N3YxGZ8N3YxGZ8N3YxGZ8N3YxGZ8N3Yx";
};

// Generate random user status
const getRandomStatus = (): "ACTIVE" | "INACTIVE" | "FREEZE" => {
    const statuses = ["ACTIVE", "INACTIVE", "FREEZE"] as const;
    return statuses[Math.floor(Math.random() * statuses.length)];
};

// Generate random user role
const getRandomRole = (): "USER" | "ADMIN" => {
    const roles = ["USER", "ADMIN"] as const;
    return roles[Math.floor(Math.random() * roles.length)];
};

// Generate random last login date
const getRandomLastLogin = () => {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30); // 0-30 days ago
    return new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
};

async function main() {
    console.log("🌱 Starting database seeding with Faker...");

    // Clear existing data
    await prisma.user.deleteMany();
    console.log("🗑️  Cleared existing users");

    // Generate fake users
    const numberOfUsers = 50; // Generate 50 fake users
    const users: any[] = [];

    for (let i = 0; i < numberOfUsers; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });
        const phone = `+1${faker.string.numeric(10)}`; // Format: +1234567890 (11 chars)

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                password: generateHashedPassword(),
                role: getRandomRole(),
                image: faker.image.avatar(),
                status: getRandomStatus(),
                lastLogin: getRandomLastLogin(),
                errorLoginCount: Math.floor(Math.random() * 5), // 0-4 failed attempts
                refreshToken: faker.string.alphanumeric(32),
            },
        });

        users.push(user);

        // Log progress every 10 users
        if ((i + 1) % 10 === 0) {
            console.log(`✅ Created ${i + 1}/${numberOfUsers} users`);
        }
    }

    console.log("\n📊 User Statistics:");

    // Count users by role
    const adminCount = users.filter((u) => u.role === "ADMIN").length;
    const userCount = users.filter((u) => u.role === "USER").length;
    console.log(`   👑 Admins: ${adminCount}`);
    console.log(`   👤 Users: ${userCount}`);

    // Count users by status
    const activeCount = users.filter((u) => u.status === "ACTIVE").length;
    const inactiveCount = users.filter((u) => u.status === "INACTIVE").length;
    const freezeCount = users.filter((u) => u.status === "FREEZE").length;
    console.log(`   🟢 Active: ${activeCount}`);
    console.log(`   🟡 Inactive: ${inactiveCount}`);
    console.log(`   🔴 Frozen: ${freezeCount}`);

    // Show some sample users
    console.log("\n👥 Sample Users:");
    users.slice(0, 5).forEach((user) => {
        console.log(
            `   - ${user.firstName} ${user.lastName} (${user.email}) - ${user.role} - ${user.status}`
        );
    });

    console.log("\n🎉 Database seeding completed successfully!");
    console.log(`📈 Total users created: ${users.length}`);
}

main()
    .catch((e) => {
        console.error("❌ Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
