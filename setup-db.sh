#!/bin/bash

echo "🚀 Prisma Starter Database Setup"
echo "=================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp example.env .env
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🔧 Next Steps:"
echo "1. Edit .env file with your MySQL credentials:"
echo "   DATABASE_URL=\"mysql://username:password@localhost:3306/prisma_starter\""
echo ""
echo "2. Create the database:"
echo "   mysql -u root -p -e \"CREATE DATABASE prisma_starter;\""
echo ""
echo "3. Generate Prisma client:"
echo "   pnpm db:generate"
echo ""
echo "4. Run migrations:"
echo "   pnpm db:migrate"
echo ""
echo "5. Start the server:"
echo "   pnpm dev"
echo ""
echo "📖 For more details, see DATABASE_SETUP.md" 