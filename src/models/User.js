import { genSalt, hash } from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: true,
    // unique?
  },
  password: {
    type: String,
    required: true,
    length: {
      min: 6,
      max: 255
    }
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  console.log('User is about to be saved', this);
  try {
    // hash password
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
  catch (err) {
    next(err);
  }
  next();
});

const User = model('User', userSchema);
export default User;