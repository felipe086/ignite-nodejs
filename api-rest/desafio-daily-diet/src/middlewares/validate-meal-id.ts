import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { mealIdSchema } from '../schemas/mealsSchema'

export function validateMealId(
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) {
  const { success, error, data } = mealIdSchema.safeParse(req.params)

  if (!success) {
    return reply.status(400).send({
      errors: error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    })
  }

  req.meal = { mealId: data.mealId }
  done()
}
