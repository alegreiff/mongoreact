import { MongoClient } from "mongodb";
//console.log("PWD", process.env.MONGO_PASSWORD);
const cadena = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}jaimeblog?retryWrites=true&w=majority`;
//console.log("CADENA", cadena);
export async function connectToDatabase() {
  const client = await MongoClient.connect(cadena);
  return client;
}
