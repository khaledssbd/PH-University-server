export type TUser = {
  id: string;
  // email: string;
  password: string;
  needsPasswordChange: boolean; // default: true
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked'; // default 'in-progress'
  isDeleted: boolean; // default: false
  // createdAt: Date;
  // updatedAt: Date;
};
