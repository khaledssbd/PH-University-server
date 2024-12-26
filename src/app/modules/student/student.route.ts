import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { Studentvalidations } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// will call controller function
// router.post('/create-student', studentControllers.createStudent);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getAllStudents,
);

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  StudentControllers.getStudentById,
);

router.patch(
  '/:id',
  validateRequest(Studentvalidations.updateStudentValidationSchema),
  StudentControllers.updateStudentById,
);

router.delete('/:id', StudentControllers.deleteStudentById);

export const StudentRoutes = router;
