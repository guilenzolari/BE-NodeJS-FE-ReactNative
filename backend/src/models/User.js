import mongoose from 'mongoose';
import { allUFs } from './allUFs.js';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true },
    username: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, match: /^\d{10,11}$/ },
    age: { type: Number, min: 0, required: true },
    uf: {
      type: String,
      enum: allUFs,
      required: true,
    },
    password: { type: String, required: true, minlength: 6 },
    friends: [{ type: String, default: [] }],
    shareInfoWithFriends: { type: Boolean, default: true },
    shareInfoWithStranges: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  }
);

export default mongoose.model('User', userSchema);
