import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

// in zod by default every field is required.. for optional must use .optional()
const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
      errorMap: () => ({
        message: `Name must be one of '${AcademicSemesterName}'`,
      }),
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      errorMap: () => ({
        message: `Code must be one of '${AcademicSemesterCode}'`,
      }),
    }),
    year: z.string({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be a string',
    }),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      errorMap: () => ({
        message: `Start Month must be one of '${Months}'`,
      }),
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      errorMap: () => ({
        message: `End Month must be one of '${Months}'`,
      }),
    }),
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterName] as [string, ...string[]], {
        errorMap: () => ({
          message: `Name must be one of '${AcademicSemesterName}'`,
        }),
      })
      .optional(),
    code: z
      .enum([...AcademicSemesterCode] as [string, ...string[]], {
        errorMap: () => ({
          message: `Code must be one of '${AcademicSemesterCode}'`,
        }),
      })
      .optional(),
    year: z
      .string({
        required_error: 'Year is required',
        invalid_type_error: 'Year must be a string',
      })
      .optional(),
    startMonth: z
      .enum([...Months] as [string, ...string[]], {
        errorMap: () => ({
          message: `Start Month must be one of '${Months}'`,
        }),
      })
      .optional(),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      errorMap: () => ({
        message: `End Month must be one of '${Months}'`,
      }),
    }).optional(),
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
