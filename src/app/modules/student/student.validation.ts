import { z } from "zod";

// schema validation using zod

// UserName Schema
const UserNameZodSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(15, { message: 'First Name cannot exceed 15 characters' })
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        value.slice(1) === value.slice(1).toLowerCase(),
      { message: 'First Name must be in capitalized format' },
    ),
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
    }),
});

// Guardian Schema
const GuardianZodSchema = z.object({
  fatherName: z.string().trim().min(1, { message: 'Father Name is required' }),
  fatherOccupation: z
    .string()
    .trim()
    .min(1, { message: 'Father Occupation is required' }),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Father Contact No is required' }),
  motherName: z.string().trim().min(1, { message: 'Mother Name is required' }),
  motherOccupation: z
    .string()
    .trim()
    .min(1, { message: 'Mother Occupation is required' }),
  motherContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Mother Contact No is required' }),
});

// Local Guardian Schema
const LocalGuardianZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Name is required' }),
  occupation: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Occupation is required' }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Contact No is required' }),
  address: z
    .string()
    .trim()
    .min(1, { message: 'Local Guardian Address is required' }),
});

// Student Schema
const zodStudentValidationSchema = z.object({
  id: z.string().trim().min(1, { message: 'Student ID is required' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  name: UserNameZodSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({
      message: "Gender must be one of 'male', 'female', or 'other'",
    }),
  }),
  dateOfBirth: z
    .string()
    .trim()
    .min(1, { message: 'Date of Birth is required' }),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  contactNo: z
    .string()
    .trim()
    .min(1, { message: 'Contact Number is required' }),
  emergencyContactNo: z
    .string()
    .trim()
    .min(1, { message: 'Emergency Contact Number is required' }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z
    .string()
    .trim()
    .min(1, { message: 'Present Address is required' }),
  permanentAddress: z
    .string()
    .trim()
    .min(1, { message: 'Permanent Address is required' }),
  guardian: GuardianZodSchema,
  localGuardian: LocalGuardianZodSchema,
  profileImg: z
    .string()
    .url({ message: 'Profile Image must be a valid URL' })
    .optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
});


export default zodStudentValidationSchema;