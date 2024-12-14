import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ), // middleware for validation
  AcademicFacultyControllers.createAcademicFaculty, // controller function
);

router.get('/', auth(), AcademicFacultyControllers.getAllAcademicFaculties);

router.get('/:id', auth(), AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ), // middleware for validation
  AcademicFacultyControllers.updateAcademicFaculty, // controller function
);

export const AcademicFacultyRoutes = router;
