import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (studentID: string) => {
  // const result = await Student.findOne({ studentID });
  const result = await Student.aggregate([{ $match: { id: studentID } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
