import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import {
  createMealBodySchema,
  updateMealBodySchema,
} from '../schemas/mealsSchema'
import { validateMealId } from '../middlewares/validate-meal-id'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkSessionIdExists)
  app.post('/', async (req: FastifyRequest, reply: FastifyReply) => {
    const { success, error, data } = createMealBodySchema.safeParse(req.body)

    if (!success) {
      return reply.status(400).send({
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      })
    }

    const { name, description, isOnDiet, date } = data

    await knex('meals').insert({
      id: randomUUID(),
      user_id: req.user?.id,
      name,
      description,
      is_on_diet: isOnDiet,
      date: date.getTime(),
    })

    return reply.status(201).send()
  })

  app.get('/', async (req, reply) => {
    const meals = await knex('meals')
      .where({ user_id: req.user?.id })
      .orderBy('date', 'desc')

    return reply.send({ meals })
  })

  app.get('/:mealId', { preHandler: [validateMealId] }, async (req, reply) => {
    const meal = await knex('meals')
      .where({ user_id: req.user?.id, id: req.meal.mealId })
      .first()

    if (!meal) return reply.status(404).send({ error: 'Meal not found.' })

    return reply.send({ meal })
  })

  app.put('/:mealId', { preHandler: [validateMealId] }, async (req, reply) => {
    const { success, error, data } = updateMealBodySchema.safeParse(req.body)
    if (!success) {
      return reply.status(400).send({
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      })
    }

    if (Object.keys(data).length === 0)
      return reply
        .status(400)
        .send({ error: 'At least one field must be provided for update.' })

    const { name, description, isOnDiet, date } = data

    const meal = await knex('meals')
      .where({ id: req.meal.mealId, user_id: req.user?.id })
      .first()

    if (!meal) {
      return reply.status(404).send({ error: 'Meal not found' })
    }

    await knex('meals')
      .where({ id: meal.id })
      .update({
        name,
        description,
        is_on_diet: isOnDiet,
        date: date ? date.getTime() : new Date().getTime(),
      })

    return reply.status(204).send()
  })

  app.delete(
    '/:mealId',
    { preHandler: [validateMealId] },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const meal = await knex('meals')
        .where({ user_id: req.user?.id, id: req.meal.mealId })
        .first()

      if (!meal) return reply.status(404).send({ error: 'Meal not found.' })

      await knex('meals').where({ id: meal.id }).first().delete()

      return reply.status(204).send()
    }
  )

  app.get('/metrics', async (request, reply) => {
    const MealsOnDiet = await knex('meals')
      .where({ user_id: request.user?.id, is_on_diet: true })
      .count('id', { as: 'total' })
      .first()

    const MealsOffDiet = await knex('meals')
      .where({ user_id: request.user?.id, is_on_diet: false })
      .count('id', { as: 'total' })
      .first()

    const totalMeals = await knex('meals')
      .where({ user_id: request.user?.id })
      .orderBy('date', 'desc')

    const { bestOnDietSequence } = totalMeals.reduce(
      (acc, meal) => {
        if (meal.is_on_diet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestOnDietSequence) {
          acc.bestOnDietSequence = acc.currentSequence
        }

        return acc
      },
      { bestOnDietSequence: 0, currentSequence: 0 }
    )

    return reply.send({
      totalMeals: totalMeals.length,
      totalMealsOnDiet: MealsOnDiet?.total,
      totalMealsOffDiet: MealsOffDiet?.total,
      bestOnDietSequence,
    })
  })
}
