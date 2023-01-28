import mongoose from "mongoose";
import config from "config";

const dbUrl = `mongodb+srv://skilldata:Skilldata123@skilldata.uduwh8u.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const cliemt = await mongoose.connect(dbUrl);
    console.log("Database connected...");
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
