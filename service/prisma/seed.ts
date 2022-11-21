import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.transaction.create({
        data: {
            title: "Salário",
            value: 1000,
            operation: "IN",
            category: "Salário",
        }
    })
}

main()