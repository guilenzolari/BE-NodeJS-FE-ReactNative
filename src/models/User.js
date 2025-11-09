import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2 },
  lastName: { type: String, required: true },
  username: { type: String, required: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, match: /^\d{10,11}$/ },
  age: { type: Number, min: 0, required: true },
  uf: {
    type: String,
    enum: ['SP', 'RJ', 'ES', 'MG'],
    required: true,
  },
  password: { type: String, required: true, minlength: 6 },
  friends: [{ type: String, default: [] }],
  shareInfoWithFriends: { type: Boolean, default: true },
  shareInfoWithStranges: { type: Boolean, default: false },
});

export default mongoose.model('User', userSchema);
