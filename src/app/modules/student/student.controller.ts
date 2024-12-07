import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  // res.status(200).json({
  //   success: true,
  //   message: 'All students retrieved successfully',
  //   data: result,
  // });

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students retrieved successfully!',
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  // res.status(200).json({
  //   success: true,
  //   message: 'Student retrieved successfully',
  //   data: result,
  // });

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const updateStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  // res.status(200).json({
  //   success: true,
  //   message: 'Student retrieved successfully',
  //   data: result,
  // });

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const deleteStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  // res.status(200).json({
  //   success: true,
  //   message: 'Student deleted successfully',
  //   data: result,
  // });

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully!',
    data: result,
  });
});



export const StudentControllers = {
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};
