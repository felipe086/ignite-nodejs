import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { createUserBodySchema } from '../schemas/usersSchema'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const { success, error, data } = createUserBodySchema.safeParse(req.body)

    if (!success) {
      return reply.status(400).send({
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      })
    }

    const { name, email } = data

    const userExists = await knex('users').where({ email }).first()

    if (userExists) reply.status(400).send({ message: 'User already exists.' })

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
    }

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
