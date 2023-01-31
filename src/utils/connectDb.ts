import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL;
    const cliemt = await mongoose.connect(dbUrl!);
    console.log("Database connected...");
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
