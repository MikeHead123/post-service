import { z } from 'zod';

const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'User name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string({
        required_error: 'Password is required',
      }),
  }),
});

export default createUserSchema;
