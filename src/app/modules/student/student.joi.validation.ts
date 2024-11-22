import Joi from 'joi';

// creating a schema validation using Joi
// validation only checkes the input data so no need to say unique for specific field... it will be done in schema 
// UserName Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(15)
    .required()
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base': 'First Name must start with a capital letter',
    }),
  middleName: Joi.string().trim().max(15).allow(null, ''),
  lastName: Joi.string()
    .trim()
    .max(15)
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.pattern.base': 'Last Name must only contain alphabets',
    }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNo: Joi.string().trim().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContactNo: Joi.string().trim().required(),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

// Student Schema
const joiStudentValidationSchema = Joi.object({
  id: Joi.string().trim().required(),
  password: Joi.string().trim().required().min(8),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': "Gender must be one of 'male', 'female', or 'other'.",
  }),
  dateOfBirth: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
  contactNo: Joi.string().trim().required(),
  emergencyContactNo: Joi.string().trim().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .allow(null, ''),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().allow(null, ''),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
  isDeleted: Joi.boolean(),
});

export default joiStudentValidationSchema;
