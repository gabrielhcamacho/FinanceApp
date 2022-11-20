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


    fastify.get('/groups/count', async () => {
        const count = await prisma.group.count()

        return { count }
    })
    
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count()

        return { count }
    })

    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count()

        return { count }
    })


    fastify.post('/groups', async (request, reply) => {

        //para não deixar criar o campo null, se puder ser nulo coloca o nullable
        const createGroupBody = z.object({
            title: z.string(),
        })
        
        const { title } = createGroupBody.parse(request.body)

        const generate = new ShortUniqueId({ length: 6 })
        const code =  String(generate()).toUpperCase()

        await prisma.group.create({
            data: {
                title,
                code,
            }
        })

        return reply.status(201).send({ code })
    })
    

    await fastify.listen({ port: 3333 })
}

start()