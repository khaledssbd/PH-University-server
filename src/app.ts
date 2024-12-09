import express, { Application, Request, Response } from 'express';
// const express = require('express');
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// api/v1/students/create-student
app.use('/api/v1', router);

// const test = async (req: Request, res: Response) => {
//   // Promise.reject();
//   const a = 10;
//   res.send(a);
// };

// app.get('/', test);

// global error handling middleware (four parameters error handler) (must be in botom)
app.use(globalErrorHandler);

// Not Found page (Route is not found)  (must be in botom)
app.use(notFound);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World From Khaled! ✨');
});

export default app;
