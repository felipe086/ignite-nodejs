import fastify from 'fastify'
import { env } from './env'

const app = fastify()

app.get('/', async (req, reply) => {
  return reply.send()
})

app
  .listen({ port: env.PORT })
  .then(() =>
    console.log(`Server running on port http://localhost:${env.PORT}`)
  )
