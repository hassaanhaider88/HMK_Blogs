import mongoose from "mongoose";

const MongoDBConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    // 1 means connected
    console.log("Database is already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_URL);
    console.log("Database Connected...");
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};

export default MongoDBConnection;
