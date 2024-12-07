import { z } from 'zod';
// in zod by default every field is required.. for optional must use .optional()

const userValidationSchema = z.object({
  // id: z.string(),
  // email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z
    .string({
      // required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, { message: "Password can't be less then 8 characters" })
    .max(20, { message: "Password can't be more then 20 characters" })
    .optional(),
  // needsPasswordChange: z.boolean().optional().default(true), // better to use .optional().default(...)
  // role: z.enum(['student', 'faculty', 'admin']),
  // status: z.enum(['in-progress', 'blocked']).optional().default('in-progress'),
  // isDeleted: z.boolean().optional().default(false),
});

export const userValidations = {
  userValidationSchema,
};
