import mongoose from "mongoose";

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    return;
  }

  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(process.env.MONGO_URI);

  connection.isConnected = db.connections[0].readyState;
  console.log("Connected to MongoDB");
}

export default connectDb;
