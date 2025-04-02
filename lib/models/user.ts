import mongoose, { Schema } from "mongoose";

// Define a Mongoose schema for the "Product" model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
