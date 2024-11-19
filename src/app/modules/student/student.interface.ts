// Creating all Type or Interface
export interface UserName {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export interface localGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

// main interface
export interface Student {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: localGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
