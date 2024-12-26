import express, { Application, Request, Response } from 'express';
// const express = require('express');
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

const corsConfig = {
  origin: [
    'http://localhost:5173',
    // 'http://localhost:5174',
    // 'https://urbanutopia-by-khaled.web.app',
    // 'https://urbanutopia-by-khaled.vercel.app',
    // 'https://urbanutopia-by-khaled.surge.sh',
    // 'https://urbanutopia-by-khaled.netlify.app',
  ],
  // credentials: true,
};

// parsers
app.use(express.json());
app.use(cookieParser());
// app.use(cors
app.use(cors(corsConfig));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World From Khaled! ✨');
});

// api/v1/students/create-student
app.use('/api/v1', router);

// const test = async (req: Request, res: Response) => {
//   // Promise.reject();
//   const a = 10;
//   res.send(a);
// };

// app.get('/', test);

// global error handling middleware (four parameters error handler) (must be in botom) (next(err))
app.use(globalErrorHandler);

// Not Found page (Route is not found)  (must be in botom)
app.use(notFound);



export default app;
