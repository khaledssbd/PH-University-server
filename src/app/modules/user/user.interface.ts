import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';


export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface TUser {
  id: string;
  // email: string;
  password: string;
  needsPasswordChange: boolean; // default: true
  passwordChangedAt?: Date;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked'; // default 'in-progress'
  isDeleted: boolean; // default: false
  // createdAt: Date;
  // updatedAt: Date;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser | null>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE; // 'student' | 'faculty' | 'admin'
