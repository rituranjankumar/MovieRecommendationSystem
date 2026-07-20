import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI ||
      "mongodb+srv://kunal50639:Sitthu_1979@cluster0.0u5d9yg.mongodb.net/movieRecommender";

    const connection = await mongoose.connect(mongoURI);

    console.log(` MongoDB Connected : ${connection.connection.host}`);
  } catch (error) {
    console.error(` MongoDB Connection Failed : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;