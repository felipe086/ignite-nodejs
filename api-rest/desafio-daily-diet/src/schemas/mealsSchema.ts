import { z } from 'zod'

export const createMealBodySchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  description: z.string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  }),
  isOnDiet: z.boolean({
    required_error: 'isOnDiet is required',
    invalid_type_error: 'isOnDiet must be a boolean value',
  }),
  date: z.coerce.date({
    required_error: 'Date is required',
    invalid_type_error: 'Invalid date string!',
  }),
})

export const mealIdSchema = z.object({
  mealId: z.string().uuid(),
})

export const updateMealBodySchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'Description must be a string',
    })
    .optional(),
  isOnDiet: z
    .boolean({
      invalid_type_error: 'isOnDiet must be a boolean value',
    })
    .optional(),
  date: z.coerce
    .date({
      invalid_type_error: 'Invalid date string!',
    })
    .optional(),
})
