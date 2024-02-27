import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.log("Error Connecting to DB ", error);
  }
};

export default connectMongoDB;
