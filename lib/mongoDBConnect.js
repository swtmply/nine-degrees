import mongoose from "mongoose";

// mongodb connection

const connection = {};

const dbConnection = async () => {
  if (connection.isConnected) return;

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  // console.log("db connected");
};

export default dbConnection;
