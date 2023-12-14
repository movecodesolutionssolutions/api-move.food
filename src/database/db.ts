// database/db.ts
import mongoose from "mongoose";

const connectToDb = async (): Promise<void> => {
  try {
    await mongoose.connect(
      "mongodb+srv://movecodesolutionssolutions:movecode@cluster0.jozufdk.mongodb.net/?retryWrites=true&w=majority",
      
    );
    console.log("Database connected successfully!");
  } catch (err) {
    console.error(err);
  }
};

export default connectToDb;
