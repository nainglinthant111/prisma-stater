# Database Setup Guide

## MySQL Configuration

### 1. Database Connection String Format

```
mysql://username:password@host:port/database_name
```

### 2. Environment Variables

Copy `example.env` to `.env` and update with your MySQL credentials:

```env
# MySQL Database Configuration
DATABASE_URL="mysql://your_username:your_password@localhost:3306/prisma_starter"
```

### 3. Common MySQL Defaults

| Setting      | Default Value    | Description                  |
| ------------ | ---------------- | ---------------------------- |
| **Host**     | `localhost`      | Database server address      |
| **Port**     | `3306`           | MySQL default port           |
| **Username** | `root`           | Database user (change this!) |
| **Password** | `your_password`  | Database password            |
| **Database** | `prisma_starter` | Database name                |

### 4. Example Configurations

#### Local Development

```env
DATABASE_URL="mysql://root:password@localhost:3306/prisma_starter"
```

#### With Custom Port

```env
DATABASE_URL="mysql://root:password@localhost:3307/prisma_starter"
```

#### Remote Database

```env
DATABASE_URL="mysql://username:password@your-server.com:3306/prisma_starter"
```

### 5. Setup Steps

1. **Create Database:**

    ```sql
    CREATE DATABASE prisma_starter;
    ```

2. **Create User (Optional):**

    ```sql
    CREATE USER 'prisma_user'@'localhost' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON prisma_starter.* TO 'prisma_user'@'localhost';
    FLUSH PRIVILEGES;
    ```

3. **Update .env file** with your credentials

4. **Generate Prisma Client:**

    ```bash
    pnpm prisma generate
    ```

5. **Run Migrations:**
    ```bash
    pnpm prisma migrate dev --name init
    ```

### 6. Test Connection

```bash
# Test database connection
pnpm prisma db pull

# View database in Prisma Studio
pnpm prisma studio
```

### 7. Troubleshooting

#### Connection Refused

-   Check if MySQL is running
-   Verify port number
-   Check firewall settings

#### Access Denied

-   Verify username and password
-   Check user privileges
-   Ensure user can access the database

#### Database Not Found

-   Create the database first
-   Check database name spelling
-   Verify user has CREATE privileges
