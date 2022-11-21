import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'


const prisma = new PrismaClient({
    log: ['query']
})

async function start() {

    const fastify = Fastify({
        logger: true,
    })


    //esse codigo permite qualquer aplicacao acessar o nosso backend
    await fastify.register(cors, {
        origin: true
        // depois de feito o deploy coloca o dominio, ex origin: www.byra.com
    })


    fastify.get('/transactions', async () => {
        const count = await prisma.transaction.findMany()

        return { count }
    })

    fastify.get('/transactions/count', async () => {
        const count = await prisma.transaction.count()

        return { count }
    })

    fastify.post('/transactions', async (request, reply) => {

        //para não deixar criar o campo null, se puder ser nulo coloca o nullable
        const createGroupBody = z.object({
            title: z.string(),
            value: z.number(),
            operation: z.string(),
            category: z.string(),
        })

        const { title, value, operation, category } = createGroupBody.parse(request.body)

        const generate = new ShortUniqueId({ length: 6 })
        const code = String(generate()).toUpperCase()

        await prisma.transaction.create({
            data: {
                title,
                value,
                operation,
                category
            }
        })

        return reply.status(201).send({ code })
    })


    await fastify.listen({ port: 8081 })
}

start()