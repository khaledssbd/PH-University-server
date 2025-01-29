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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  // res.status(200).json({
  //   success: true,
  //   message: 'Student retrieved successfully!',
  //   data: result,
  // });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully!',
    data: result,
  });
});

const updateStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(id, student);

  // res.status(200).json({
  //   success: true,
  //   message: 'Student retrieved successfully!',
  //   data: result,
  // });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully!',
    data: result,
  });
});

const deleteStudentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

  // res.status(200).json({
  //   success: true,
  //   message: 'Student deleted successfully',
  //   data: result,
  // });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
