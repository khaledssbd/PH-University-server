import { RequestHandler } from 'express';
// import zodStudentValidationSchema from '../student/student.validation';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body;
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
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
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
    message: 'Academic Semester is created successfully!',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
