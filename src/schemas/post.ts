import { z } from 'zod';

const createPostSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'User name is required',
    }),
    text: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    author: z
      .string({
        required_error: 'Password is required',
      }),
  }),
});

export default createPostSchema;
