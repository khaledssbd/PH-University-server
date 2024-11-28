import { NextFunction, Request, Response } from 'express';
// import zodStudentValidationSchema from '../student/student.validation';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    // const result = await studentServices.createStudentIntoDB(studentData); // normal use

    // schema validation using joi
    // const { error, value } = joiStudentValidationSchema.validate(studentData);
    // // console.log({ error }, { value });
    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'something went wrong!',
    //     error: error.details,
    //   });
    // }
    //  will call service function for this value
    // const result = await studentServices.createStudentIntoDB(value); // for joi

    // schema validation using zod
    //     const zodParsedData = zodStudentValidationSchema.parse(studentData);
    //  will call service function for zodParsedData and if any errors happen that will be catched through the catch block
    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    ); // for zod

    //  send response
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully!',
      data: result,
    });
  } catch (err) {
    // all real validation in student.model.ts will be catch here
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
