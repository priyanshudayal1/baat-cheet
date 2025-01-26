import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Database successfully');
  } catch (err) {
    console.error(`An error occurred : ${err}`)
  }
};
