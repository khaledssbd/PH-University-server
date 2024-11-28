import express, { Application, Request, Response } from 'express';
// const express = require('express');
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import  globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// api/v1/students/create-student
app.use('/api/v1', router);

// global error handler (four parameters error handler)
app.use(globalErrorHandler);

// Not Found
app.use(notFound)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World From Khaled!');
});

export default app;
