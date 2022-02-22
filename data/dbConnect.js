import mongoose from "mongoose";
const connection = {};
const cadena = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}jaimeblog?`;

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(cadena, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log("DB CONNECTION", connection.isConnected);
}

export default dbConnect;
