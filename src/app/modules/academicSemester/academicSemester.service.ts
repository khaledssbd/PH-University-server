import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper, AcademicSemesterSearchableFields } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  //  old (isUserExists)
  // //   for static method
  // //     if (await Student.isUserExists(studentData.id)) {
  // //       throw new AppError(httpStatus.CONFLICT, 'User already exists!');
  // //     }

  // //   for instance method
  // //   const student = new Student(studentData); // create an instance
  // //   // validate the Student model before saving
  // //   if (await student.isUserExists(studentData.id)) {
  // //     throw new AppError(httpStatus.CONFLICT, 'User already exists!');
  // //   }
  // //   const result = await student.save(); // built-in interface method

  // semester name --> semester code
  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid semester name or code!');
  }

  const result = AcademicSemester.create(payLoad); // built-in static method
  return result;
};

const getAllAcademicSemestersFromDB = async (
  query: Record<string, unknown>,
) => {
  // const result = await AcademicSemester.find();
  // return result;
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .search(AcademicSemesterSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid Semester Code!');
  }

  const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
