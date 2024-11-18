import express, { Application, Request, Response } from 'express';
// const express = require('express');
import cors from 'cors';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World From Khaled!');
});

export default app;
