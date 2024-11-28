import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

// will call controller function
router.post('/create-student', userControllers.createStudent);

// router.get('/', userControllers.getAllUsers);

// router.get('/:userId', userControllers.getUserById);

// router.delete('/:userId', userControllers.deleteUserById);

export const userRoutes = router;
