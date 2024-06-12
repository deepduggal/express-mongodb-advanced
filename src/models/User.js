
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
  // password: {
  //   type: String,
  //   required: true,
  //   length: {
  //     min: 6,
  //     max: 255
  //   }
  // },
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
});

const User = model('User', userSchema);
export default User;