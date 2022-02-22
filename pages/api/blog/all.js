import { connectToDatabase } from "../../../data/db";

export default async function handler(req, res) {
  const client = await connectToDatabase();
  const db = client.db();
  const entradas = await db.collection("entradas").find().toArray();
  console.log("esta es la API", entradas);

  res.status(201).json({ message: "Entradas recuperadas", entradas });
  client.close();
}
