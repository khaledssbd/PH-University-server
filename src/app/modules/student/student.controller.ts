import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //  will call service function for this data
    const result = await studentServices.createStudentIntoDB(studentData);

    //  send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getStudentByIdFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getStudentById,
};
