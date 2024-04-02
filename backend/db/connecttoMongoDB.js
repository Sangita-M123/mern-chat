import mongoose from "mongoose";
const MONGO_DB_URL="mongodb+srv://Gofood:gofood6@cluster0.n3licnz.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0";

const connecttoMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connecttoMongoDB;
