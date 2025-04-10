import { z } from 'zod';
import { UserStatus } from './user.constant';
// in zod by default every field is required.. for optional must use .optional()

// UserName Schema
export const createUserNameValidationSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First Name must be string!',
      required_error: 'First Name is required!',
    })
    .trim()
    // .min(1, { message: 'First Name must include minimum 1 character!' }) // not necessary because this field is not optional
    .max(15, { message: "First Name can't exceed 15 characters!" })
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        value.slice(1) === value.slice(1).toLowerCase(),
      { message: 'First Name must be in Capitalized format!' },
    )
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'First Name must only contain alphabets!',
    }),

  middleName: z
    .string({
      invalid_type_error: 'Middle Name must be string!',
      required_error: 'Middle Name is required!',
    })
    .trim()
    .max(15, { message: "Middle Name can't exceed 15 characters!" })
    .optional(),

  lastName: z
    .string({
      invalid_type_error: 'Last Name must be string!',
      required_error: 'Last Name is required!',
    })
    .trim()
    // .min(1, { message: 'Last Name must include minimum 1 character!' }) // not necessary because this field is not optional
    .max(15, { message: "Last Name can't exceed 15 characters!" })
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        value.slice(1) === value.slice(1).toLowerCase(),
      { message: 'Last Name must be in Capitalized format!' },
    )
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last Name must only contain alphabets!',
    }),
});

// const userValidationSchema = z.object({
//   // id: z.string(),
//   email: z.string().trim().email({ message: 'Invalid email address!' }),
//   password: z
//     .string({
//       // required_error: 'Password is required',
//       invalid_type_error: 'Password must be a string!',
//     })
//     .min(8, { message: "Password can't be less then 8 characters!" })
//     .max(20, { message: "Password can't be more then 20 characters!" })
//     .optional(),
//   // needsPasswordChange: z.boolean().optional().default(true), // better to use .optional().default(...)
//   // role: z.enum(['student', 'faculty', 'admin']),
//   // status: z.enum(['in-progress', 'blocked']).optional().default('in-progress'),
//   // isDeleted: z.boolean().optional().default(false),
// });

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidations = {
  // userValidationSchema,
  changeStatusValidationSchema,
};
