/* eslint-disable @typescript-eslint/no-explicit-any */
// import zodStudentValidationSchema from '../student/student.validation';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
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
  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  ); // for zod

  //  send response
  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // });

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully!',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  );

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully!',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully!',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization;
  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found!');
  // }

  const { userId, role } = req.user;

  const result = await UserServices.getMe(userId, role);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully!',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully!',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
