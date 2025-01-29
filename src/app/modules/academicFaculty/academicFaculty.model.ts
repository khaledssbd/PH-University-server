import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppError';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
// academicFacultySchema.pre('save', async function (next) {
//   const isFacultyExists = await AcademicFaculty.findOne({
//     name: this.name,
//   });

//   if (isFacultyExists) {
//     throw new AppError(httpStatus.CONFLICT, 'Faculty already exists!');
//   }
//   next();
// });

academicFacultySchema.pre('save', async function (next) {
  const isFacultyExists = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isFacultyExists) {
    throw new AppError(httpStatus.CONFLICT, 'This Faculty is already exist!');
  }

  next();
});

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  // console.log(query); // { _id: "655465489321321487" }
  const isFacultyExists = await AcademicFaculty.findOne(query);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Faculty does not exist!');
  }

  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
