import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: AcademicSemesterName,
        message: '{VALUE} is not a valid Semester name',
      },
      required: [true, 'Semester name is required'],
    },
    code: {
      type: String,
      enum: {
        values: AcademicSemesterCode,
        message: '{VALUE} is not a valid Semester code',
      },
      required: [true, 'Semester code is required'],
    },
    year: {
      type: String,
      required: [true, 'Semester year is required'],
    },
    startMonth: {
      type: String,
      enum: {
        values: Months,
        message: '{VALUE} is not a valid start month',
      },
      required: [true, 'Semester start month is required'],
    },
    endMonth: {
      type: String,
      enum: {
        values: Months,
        message: '{VALUE} is not a valid end month',
      },
      required: [true, 'Semester end month is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.CONFLICT, 'Semester already exists!');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
