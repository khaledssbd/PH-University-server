import { TBloodGroup } from "./user.interface";

export const USER_ROLE = {
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
} as const;

export const BloodGroup: TBloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];