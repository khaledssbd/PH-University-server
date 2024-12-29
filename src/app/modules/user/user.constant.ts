import { TBloodGroup } from "./user.interface";

export const USER_ROLE = {
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
  superAdmin: 'superAdmin'
} as const;

export const BloodGroup: TBloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const UserStatus = ['in-progress', 'blocked'];
