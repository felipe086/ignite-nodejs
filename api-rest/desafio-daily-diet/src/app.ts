import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { usersRoutes } from './routes/users.routes'
import { mealsRoutes } from './routes/meals.routes'

export const app = fastify()

app.register(cookie)
app.register(usersRoutes, { prefix: 'api/users' })
app.register(mealsRoutes, { prefix: 'api/meals' })
app.setErrorHandler((error, req, reply) => {
  console.log(error)
  return reply.status(500).send({ message: 'Internal server error.' })
})
