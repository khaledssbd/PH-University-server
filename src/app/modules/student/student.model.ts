import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TStudent,
  // TStudentMethods,
  TStudentModel,
  TUserName,
  TLocalGuardian,
} from './student.interface';
import { BloodGroup } from '../user/user.constant';

// creating All Schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [15, 'First Name can not be of more then 15 characters'],

    // real validation
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [15, 'Middle Name can not be of more then 15 characters'],
  },

  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [15, 'Last Name can not be of more then 15 characters'],

    // custom validation
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not in capitalize format',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact No is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
    trim: true,
  },
});

// for static method
const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User', // model name
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "Gender must be of one of the followings: 'male', 'female', 'other'.",
        // message: '{VALUE} is not valid Gender',
      },
      required: [true, 'Student Gender is required'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      // required: [true, 'Student Date of Birth is required'],
    },
    email: {
      type: String,
      required: [true, 'Student Email is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
    },
    contactNo: {
      type: String,
      required: [true, 'Student Contact No is required'],
      trim: true,
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Student Emergency Contact No is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message:
         `Blood group must be of one of the followings: ${BloodGroup}`,
        // message: '{VALUE} is not valid Blood group',
      },
      trim: true,
    },
    presentAddress: {
      type: String,
      required: [true, 'Student Present Address is required'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Student Permanent Address is required'],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Student Guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Student Local Guardian is required'],
    },
    profileImg: {
      type: String,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester', // model name
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment', // model name
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  },
);

// for instance method
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
//   id: {
//     type: String,
//     required: [true, 'Student ID is required'],
//     unique: true,
//     trim: true,
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     required: [true, 'User id is required'],
//     unique: true,
//     ref: 'User',
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     trim: true,
//     minlength: [8, 'Password must be at least 8 characters long'],
//   },
//   name: {
//     type: UserNameSchema,
//     required: [true, 'Student Name is required'],
//   },
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message:
//         "Gender must be of one of the followings: 'male', 'female', 'other'.",
//       // message: '{VALUE} is not valid Gender',
//     },
//     required: [true, 'Student Gender is required'],
//     trim: true,
//   },
//   dateOfBirth: {
//     type: String,
//     required: [true, 'Student Date of Birth is required'],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Student Email is required'],
//     unique: true,
//     trim: true,
//     validate: {
//       validator: (value: string) => validator.isEmail(value),
//       message: '{VALUE} is not a valid email',
//     },
//   },
//   contactNo: {
//     type: String,
//     required: [true, 'Student Contact No is required'],
//     trim: true,
//   },
//   emergencyContactNo: {
//     type: String,
//     required: [true, 'Student Emergency Contact No is required'],
//     trim: true,
//   },
//   bloodGroup: {
//     type: String,
//     enum: {
//       values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//       message:
//         "Blood group must be of one of the followings: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
//       // message: '{VALUE} is not valid Blood group',
//     },
//     trim: true,
//   },
//   presentAddress: {
//     type: String,
//     required: [true, 'Student Present Address is required'],
//     trim: true,
//   },
//   permanentAddress: {
//     type: String,
//     required: [true, 'Student Permanent Address is required'],
//     trim: true,
//   },
//   guardian: {
//     type: GuardianSchema,
//     required: [true, 'Student Guardian is required'],
//   },
//   localGuardian: {
//     type: LocalGuardianSchema,
//     required: [true, 'Student Local Guardian is required'],
//   },
//   profileImg: { type: String },
//   isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
//   isDeleted: { type: Boolean, default: false },
//   }, {
//   toJSON: {
//     virtuals: true,
//   }
//   });

//// creating a custom instance method
// StudentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

// or

// StudentSchema.methods.isUserExists = async (id: string) => await Student.findOne({ id });

// creating All Model

// mongodb virtual

studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// Document middleware
// pre save middleware/hook : will work before create() & save() method
// studentSchema.pre('save', async function (next) {
//   // console.log(this, 'pre hook: we will save data');

//   // Hashing password before saving
//   // const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// Document middleware
// post save middleware/hook : will work after create() & save() method
// studentSchema.post('save', function (doc, next) {
//   // console.log(this, 'pre hook: we have saved our data');
//   // Hiding the Hashed password from returned data
//   doc.password = '';
//   next();
// });

// Query middleware
// pre save middleware/hook : will work before find() & findOne() method

studentSchema.pre('find', function (next) {
  // console.log(this, 'pre hook: we will save data');
  // while we are getting all data by using find method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } }); // this.find({ isDeleted: false }); this.find({ isDeleted: { $eq: false } });
  next();
});

//
studentSchema.pre('findOne', function (next) {
  // console.log(this, 'pre hook: we will save data');
  // while we are getting single data by using findOne method we want to exclude the data that has isDeleted: true
  this.find({ isDeleted: { $ne: true } }); // this.find({ isDeleted: false }); this.find({ isDeleted: { $eq: false } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  // console.log(this, 'pre hook: we will save data');
  // while we are getting all data by using aggregate(find) method we want to exclude the data that has isDeleted: true
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } }); // this.find({ isDeleted: false }); this.find({ isDeleted: { $eq: false } });
  next();
});

// creating a custom static method
studentSchema.statics.isStudentExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// studentSchema.statics.isUserExists = async (id: string) => await Student.findOne({ id })

// for instance and static method
export const Student = model<TStudent, TStudentModel>('Student', studentSchema);
