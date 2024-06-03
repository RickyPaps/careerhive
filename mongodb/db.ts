import mongoose from "mongoose";

const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@careerhive.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`;

if (!connectionString) {
  throw new Error("Please define a valid connection string");
}

const connectDB = async () => {
  //   prevent double connection to db

  if (mongoose.connection?.readyState >= 1) {
    // Already connected
    return;
  }

  try {
    await mongoose.connect(connectionString);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
