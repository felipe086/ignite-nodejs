import { z } from 'zod'

export const createUserBodySchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3),
  email: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a email',
    })
    .email(),
})
