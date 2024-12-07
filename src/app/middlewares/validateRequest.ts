import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      // if everything is alright next() will be called
      await schema.parseAsync({ body: req.body });
      next();
    } catch (error) {
      next(error); // error handling middleware
    }
  };
};


export default validateRequest;