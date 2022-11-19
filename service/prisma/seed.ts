import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john.doe@gmail.com",
            avatarUrl: 'http://github.com/gabrielhcamacho.png',
        }
    })

    const group = await prisma.group.create({
        data: {
            title: "Example Group",
            code: 'bol123',
            ownerId: user.id,

            participant:{
                create: {
                    userId : user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-06T12:00:00.577Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data:{
            date: '2022-11-08T12:00:00.577Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_groupId: {
                                userId: user.id,
                                groupId: group.id,
                            }
                        }
                    }
                }
            }
        }
    })

}

main()