import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Route is not found! Please try again',
    error: 'The requested resource could not be found! Please try again',
  });
};

export default notFound;
