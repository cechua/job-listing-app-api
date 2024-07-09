import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  provider: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9_]+$/, 'is invalid'],
    index: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    //required: true, not required for oauth. add validations for local strategy instead
  },
  name: {
    type: String,
    required: true,
  },
  avatar: String,
  role: { type: String, default: 'USER' },
  about: { type: String },
  summary: { type: String },
  // google
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const JWT_SECRET = process.env.JWT_SECRET || '';

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      expiresIn: '1h',
      id: this._id,
      provider: this.provider,
      email: this.email,
      role: this.role,
    },
    JWT_SECRET
  );
  return token;
};

const User = mongoose.model('User', userSchema);

export default User;
