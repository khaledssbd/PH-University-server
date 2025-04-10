import { z } from 'zod';
import { BloodGroup } from '../user/user.constant';
import { createUserNameValidationSchema } from '../user/user.validation';

// schema validation using zod
// in zod by default every field is required.. for optional must use .optional()

// Create Student Schema

// Guardian Schema
const createGuardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, { message: 'Father Name is required!' }),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, { message: 'Father Occupation is required!' }),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Father Contact No is required!' }),
  motherName: z.string().trim().min(1, { message: 'Mother Name is required!' }),
  motherOccupation: z
    .string()
    .trim()
    .min(1, { message: 'Mother Occupation is required!' }),
  motherContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Mother Contact No is required!' }),
});

// Local Guardian Schema
const createLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Name is required!' }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Contact No is required!' }),
  address: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Address is required!' }),
});

// Main Create Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        // required_error: 'Password is required',
        invalid_type_error: 'Password must be a string!',
      })
      .min(8, { message: "Password can't be less then 8 characters!" })
      .max(20, { message: "Password can't be more then 20 characters!" })
      .optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: "Gender must be one of 'male', 'female', or 'other'!",
        }),
      }),
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
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      // profileImg: z
      //   .string()
      //   .url({ message: 'Profile Image must be a valid URL!' })
      //   .optional(),
      admissionSemester: z.string({
        required_error: 'Semester is required!',
        invalid_type_error: 'Semester must be a string!',
      }),
      academicDepartment: z.string({
        required_error: 'Department is required!',
        invalid_type_error: 'Department must be a string!',
      }),
    }),
  }),
});

// Update Student Schema
// UserName Schema
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(15, { message: 'First Name cannot exceed 15 characters' })
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        value.slice(1) === value.slice(1).toLowerCase(),
      { message: 'First Name must be in capitalized format' },
    )
    .optional(),
  middleName: z
    .string()
    .trim()
    .max(15, { message: 'Middle Name cannot exceed 15 characters' })
    .optional(),
  lastName: z
    .string()
    .trim()
    .max(15, { message: 'Last Name cannot exceed 15 characters' })
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: 'Last Name must only contain alphabets',
    })
    .optional(),
});

// Guardian Schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().trim().optional(),
  fatherContactNo: z.string().trim().optional(),
  motherName: z.string().trim().optional(),
  motherOccupation: z.string().trim().optional(),
  motherContactNo: z.string().trim().optional(),
});

// Local Guardian Schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  contactNo: z.string().trim().optional(),
  address: z.string().trim().optional(),
});

// Main Update Student Schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    // password: z
    //   .string({
    //     // required_error: 'Password is required',
    //     invalid_type_error: 'Password must be a string',
    //   })
    //   .min(8, { message: "Password can't be less then 8 characters" })
    //   .max(20, { message: "Password can't be more then 20 characters" })
    //   .optional(),
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          errorMap: () => ({
            message: "Gender must be one of 'male', 'female', or 'other'",
          }),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .trim()
        .email({ message: 'Invalid email address' })
        .optional(),
      contactNo: z.string().trim().optional(),
      emergencyContactNo: z.string().trim().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().trim().optional(),
      permanentAddress: z.string().trim().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      // profileImg: z
      //   .string()
      //   .url({ message: 'Profile Image must be a valid URL' })
      //   .optional(),
      admissionSemester: z
        .string({
          required_error: 'Semester is required',
          invalid_type_error: 'Semester must be a string',
        })
        .optional(),
      academicDepartment: z
        .string({
          required_error: 'Department is required',
          invalid_type_error: 'Department must be a string',
        })
        .optional(),
    }),
  }),
});

export const Studentvalidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
