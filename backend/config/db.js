import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI ;

    const connection = await mongoose.connect(mongoURI);

    console.log(` MongoDB Connected : ${connection.connection.host}`);
  } catch (error) {
    console.error(` MongoDB Connection Failed : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;