import { Request, Response } from 'express';
import { studentServices } from './student.service';
// import joiStudentValidationSchema from './student.joi.validation';
import zodStudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
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
    const zodParsedData = zodStudentValidationSchema.parse(studentData);
    //  will call service function for zodParsedData and if any errors happen that will be catched through the catch block
    const result = await studentServices.createStudentIntoDB(zodParsedData); // for zod

    //  send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    // all real validation in student.model.ts will be catch here
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'All students retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};


const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudentById,
};
