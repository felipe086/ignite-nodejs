import fastify from 'fastify'

const app = fastify()

app.get('/', async (req, reply) => {
  return reply.send()
})

app
  .listen({ port: 3333 })
  .then(() => console.log('Server running on port http://localhost:3333'))
