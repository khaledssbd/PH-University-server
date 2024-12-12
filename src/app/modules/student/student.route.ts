import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { Studentvalidations } from './student.validation';

const router = express.Router();

// will call controller function
// router.post('/create-student', studentControllers.createStudent);

router.get('/', StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getStudentById);

router.patch(
  '/:id',
  validateRequest(Studentvalidations.updateStudentValidationSchema),
  StudentControllers.updateStudentById,
);

router.delete('/:id', StudentControllers.deleteStudentById);

export const StudentRoutes = router;
