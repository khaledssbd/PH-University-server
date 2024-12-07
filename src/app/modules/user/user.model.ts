import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import validator from 'validator';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    // email: {
    //   type: String,
    //   required: [true, 'Student Email is required'],
    //   unique: true,
    //   trim: true,
    //   validate: {
    //     validator: (value: string) => validator.isEmail(value),
    //     message: '{VALUE} is not a valid email',
    //   },
    // },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true, // default
    },
    role: {
      type: String,
      enum: {
        values: ['student', 'faculty', 'admin'],
        message: '{VALUE} is not a valid role',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['in-progress', 'blocked'],
        message: '{VALUE} is not a valid status',
      },
      default: 'in-progress', // default
    },
    isDeleted: {
      type: Boolean,
      default: false, // default
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  // Hashing password before saving
  // const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  // Hiding the Hashed password from returned data
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
