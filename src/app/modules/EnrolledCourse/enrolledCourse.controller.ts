/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is enrolled succesfully!',
    data: result,
  });
});

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId;

  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  );

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are retrived succesfully!',
    meta: result.meta,
    data: result.result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  );

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated succesfully!',
    data: result,
  });
});

const getEnrolledCoursesByFaculty = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;

  const result = await EnrolledCourseServices.getEnrolledCoursesByFacultyFromDB(
    facultyId,
    req.query,
  );

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your courses are retrived succesfully!',
    meta: result.meta,
    data: result.result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getMyEnrolledCourses,
  getEnrolledCoursesByFaculty,
  updateEnrolledCourseMarks,
};
