import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentvalidations } from '../student/student.validation';

const router = express.Router();

// middleware with controller function
router.post(
  '/create-student',
  validateRequest(studentvalidations.createStudentValidationSchema), // middleware for validation
  UserControllers.createStudent, // controller function
);

export const UserRoutes = router;
