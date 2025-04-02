import mongoose from "mongoose";
// aideas mongodb server
export const MONGODB_URI = 'mongodb+srv://asilbekt84:yDngZ0XMAoXTg9YA@aideas.s4dpt.mongodb.net/?retryWrites=true&w=majority&appName=aideas'

const connectDB = async () => { 
  try {
    await mongoose.connect(MONGODB_URI, { 
      bufferCommands: false, // Buffering muammosini oldini oladi
      serverSelectionTimeoutMS: 50000,
    }); 
    return true;
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;