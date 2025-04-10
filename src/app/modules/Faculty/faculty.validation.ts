import { z } from 'zod';
import { Gender } from './faculty.constant';
import { BloodGroup } from '../user/user.constant';
import { createUserNameValidationSchema } from '../user/user.validation';


// create Schema
// create UserName Schema
// const createUserNameValidationSchema = z.object({
//   firstName: z
//     .string()
//     .min(1)
//     .max(20)
//     .refine((value) => /^[A-Z]/.test(value), {
//       message: 'First Name must start with a capital letter!',
//     }),
//   middleName: z.string(),
//   lastName: z.string(),
// });


// create Faculty Main Schema
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        // required_error: 'Password is required!',
        invalid_type_error: 'Password must be a string!',
      })
      .min(8, { message: "Password can't be less then 8 characters!" })
      .max(20, { message: "Password can't be more then 20 characters!" })
      .optional(),
    faculty: z.object({
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
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z
        .string()
        .trim()
        .min(1, { message: 'Present Address is required!' }),
      permanentAddress: z
        .string()
        .trim()
        .min(1, { message: 'Permanent Address is required!' }),
      academicDepartment: z.string({
        required_error: 'Department is required!',
        invalid_type_error: 'Department must be a string!',
      }),
      // profileImg: z
      //   .string()
      //   .url({ message: 'Profile Image must be a valid URL' })
      //   .optional(),
    }),
  }),
});


// update Schema
// update UserName Schema
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});


// update Faculty Main Schema
const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().optional(),
      name: updateUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      // profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const FacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
