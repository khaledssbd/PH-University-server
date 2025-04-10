import { z } from 'zod';
import { Gender } from './admin.constant';
import { BloodGroup } from '../user/user.constant';
import { createUserNameValidationSchema } from '../user/user.validation';

// const createUserNameValidationSchema = z.object({
//   firstName: z.string().min(1).max(20),
//   middleName: z.string().max(20),
//   lastName: z.string().max(20),
// });

 const createAdminValidationSchema = z.object({
   body: z.object({
     password: z
       .string({
         // required_error: 'Password is required!',
         invalid_type_error: 'Password must be a string!',
       })
       .min(8, { message: "Password can't be less then 8 characters!" })
       .max(20, { message: "Password can't be more then 20 characters!" })
       .optional(),
     admin: z.object({
       designation: z.string({
         required_error: 'Designation is required!',
         invalid_type_error: 'Designation must be a string!',
       }),
       name: createUserNameValidationSchema,
       gender: z.enum([...Gender] as [string, ...string[]]),
       dateOfBirth: z.string().optional(),
       email: z.string().trim().email({ message: 'Invalid email address!' }),
       contactNo: z
         .string()
         .trim()
         .min(1, { message: 'Contact Number is required!' }),
       emergencyContactNo: z
         .string()
         .trim()
         .min(1, { message: 'Emergency Contact Number is required!' }),
       bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
       presentAddress: z
         .string()
         .trim()
         .min(1, { message: 'Present Address is required!' }),
       permanentAddress: z
         .string()
         .trim()
         .min(1, { message: 'Permanent Address is required!' }),
      //  profileImg: z
      //    .string()
      //    .url({ message: 'Profile Image must be a valid URL' })
      //    .optional(),
     }),
   }),
 });

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().min(3).max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

 const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: updateUserNameValidationSchema,
      designation: z.string().max(30).optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      // profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
