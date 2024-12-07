import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //  old
  // //   for static method
  // //     if (await Student.isUserExists(studentData.id)) {
  // //       throw new Error('User already exists');
  // //     }

  // //   for instance method
  // //   const student = new Student(studentData); // create an instance
  // //   // validate the Student model before saving
  // //   if (await student.isUserExists(studentData.id)) {
  // //     throw new Error('User already exists');
  // //   }
  // //   const result = await student.save(); // built-in interface method

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );

  // Handle case where the academic semester is not found
  if (!admissionSemester) {
    throw new Error('Academic semester not found');
  }

  // create a student object
  const userData: Partial<TUser> = {};

  // set manually generated user id
  // user.id = '2030100001';

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set user role as student
  userData.role = 'student';

  // start session
  const session = await mongoose.startSession();

  try {
    // start transsection
    session.startTransaction();

    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transection-1)
    const newUser = await User.create([userData], { session }); // input should be in an array inside create in transection

    // if (Object.keys(newUser).length) {
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user!');
    }

    // save student data into the database
    payLoad.id = newUser[0].id; // embedded id
    payLoad.user = newUser[0]._id; // refference _id

    // create a student (transection-2)
    const newStudent = await Student.create([payLoad], {session}); // built-in static method
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student!');
    }

    await session.commitTransaction()
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err); // re-throw the error for the caller to handle it properly

    // return error; // for testing purposes only, remove it in production code
  }
};

export const UserServices = {
  createStudentIntoDB,
};
