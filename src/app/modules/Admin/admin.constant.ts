import { TGender } from './admin.interface';

export const Gender: TGender[] = ['male', 'female', 'other'];


export const AdminSearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
