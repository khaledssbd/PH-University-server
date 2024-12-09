import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ), // middleware for validation
  AcademicFacultyControllers.createAcademicFaculty, // controller function
);

router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:id',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ), // middleware for validation
  AcademicFacultyControllers.updateAcademicFaculty, // controller function
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
