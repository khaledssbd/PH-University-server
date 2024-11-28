import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
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

  // create a student object
  const user: Partial<TUser> = {};

  // set manually generated user id
  user.id = '2030100002';

  // if password is not given, use default password
  user.password = password || (config.default_password as string);

  // set user role as student
  user.role = 'student';

  // create a user
  const newUser = await User.create(user); // built-in static method

  if (Object.keys(newUser).length) {
    // save student data into the database
    studentData.id = newUser.id; // embedded id
    studentData.user = newUser._id; // refference _id
    const newStudent = await Student.create(studentData); // built-in static method
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
