import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import queryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }; // copy
  // // { email: { $regex: query.searchTerm, $options: 'i' }}
  // // { presentAddress: { $regex: query.searchTerm, $options: 'i' }}
  // // { 'name.firstName': { $regex: query.searchTerm, $options: 'i' }}

  // const studentSearchableFields = [
  //   'email',
  //   'name.firstName',
  //   'name.lastName',
  //   'presentAddress',
  // ];

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
  // excludeFields.forEach((field) => delete queryObj[field]);

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: { path: 'academicFaculty' },
  //   }); // must use ref in schema .... admissionSemester, academicDepartment and academicFaculty are property in schema to get the data inside the field;

  // // sorting the number of the documents of filterQuery
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = (query.sort as string)?.split(',')?.join(' ');
  // }
  // const sortQuery = filterQuery.sort(sort);

  // // limiting the number of the documents of sortQuery
  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   // limit = parseInt(query.limit as string);
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   // page = parseInt(query.page as string);
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // // field limiting
  // let fields = '-__v';

  // // fields: 'name,email';
  // // fields: 'name email';
  // if (query.fields) {
  //   // fields = (query.fields as string)?.replace(',', ' ');
  //   fields = (query.fields as string)?.split(',')?.join(' ');
  // }

  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery;

  const studentQuery = new queryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    // .populate({
    //   path: 'academicDepartment',
    //   populate: { path: 'academicFaculty' },
    // }),

    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.aggregate([{ $match: { _id: studentID } }]);
  // const isStudentExists = await Student.findById(id);
  const isStudentExists = await Student.isStudentExists(id);
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist!');
  }

  const result = await Student.findById(id)
    .populate('user')
    .populate('admissionSemester')
    .populate('academicDepartment academicFaculty');
  // .populate({
  //   path: 'academicDepartment',
  //   populate: { path: 'academicFaculty' },
  // }); // must use ref in schema .... admissionSemester, academicDepartment and academicFaculty are property in schema to get the data inside the field
  return result;
};

const updateStudentIntoDB = async (id: string, payLoad: Partial<TStudent>) => {
  // const isStudentExists = await Student.findById(id);
  const isStudentExists = await Student.isStudentExists(id);
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student does not exist!');
  }

  // destructuring preimitive(name, guardian, localGuardian) and non-primitive(...remainingStudentData) parameters
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  // const result = await Student.updateOne({ id }, { isDeleted: true });
  // return result;

  // // for instance method
  // const student = new Student(studentData); // create an instance
  // // validate the Student model before saving
  // if (await student.isUserExists(id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save(); // built-in interface method

  //  old (isUserExists)
  // for static method

  // const isStudentExists = await Student.findById(id);
  const isUserExists = await Student.isStudentExists(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found!');
  }

  // start session
  const session = await mongoose.startSession();

  try {
    // start transsection
    session.startTransaction();
    // const result = await Student.updateOne({ id }, { isDeleted: true });

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student!');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student!');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedUser;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student!'); // re-throw the error for the caller to handle it properly

    // return error; // for testing purposes only, remove it in production code
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
