import { Model, Types } from 'mongoose';
import { TBloodGroup } from '../user/user.interface';

// Creating all Type or Interface
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// main interface
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

// for creating static method
export interface TStudentModel extends Model<TStudent> {
  isStudentExists(id: string): Promise<TStudent | null>;
}

//// for creating instance method
// export type TStudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// // Create a new Model type that knows about isUserExists
// export type StudentModel = Model<TStudent, Record<string, never>, TStudentMethods>;
