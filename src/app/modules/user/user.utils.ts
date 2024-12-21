// year semesterCode 4digit number
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// StudentId
const findLastId = async (role: string) => {
  const lastPerson = await User.findOne(
    {
      role
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //2030 01 0001
  return lastPerson?.id ? lastPerson.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString(); // 0000 by deafult
  const lastStudentId = await findLastId('student');

  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030

  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); // 00001 (.substring(6) will remove 202401)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};


// Faculty ID
// const findLastFacultyId = async () => {
//   const lastFaculty = await User.findOne(
//     {
//       role: 'faculty',
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastFaculty?.id ? lastFaculty.id : undefined;
// };

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastId('faculty');

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2); // .substring(2) will remove F-
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
//  const findLastAdminId = async () => {
//   const lastAdmin = await User.findOne(
//     {
//       role: 'admin',
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//   return lastAdmin?.id ? lastAdmin.id : undefined;
// };

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastId('admin');

  if (lastAdminId) {
    currentId = lastAdminId.substring(2); // .substring(2) will remove A-
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
