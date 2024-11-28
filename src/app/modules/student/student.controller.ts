import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import joiStudentValidationSchema from './student.joi.validation';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    // res.status(200).json({
    //   success: true,
    //   message: 'All students retrieved successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.FOUND,
      success: true,
      message: 'All students retrieved successfully!',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);

    // res.status(200).json({
    //   success: true,
    //   message: 'Student retrieved successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.FOUND,
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);

    // res.status(200).json({
    //   success: true,
    //   message: 'Student deleted successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: httpStatus.FOUND,
      success: true,
      message: 'Student deleted successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
