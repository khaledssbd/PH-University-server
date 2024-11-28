import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: userRoutes },
  { path: '/students', route: studentRoutes },
];

// router.use('/users', userRoutes);
// router.use('/students', studentRoutes)

moduleRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
