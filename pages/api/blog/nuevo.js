import { connectToDatabase } from "../../../data/db";

export default async function handler(req, res) {
  const data = req.body;
  const { fechaPublicacion, tituloEntrada, contenido } = data.valores;

  const client = await connectToDatabase();
  const db = client.db();

  const result = await db.collection("entradas").insertOne({
    fechaPublicacion,
    tituloEntrada,
    contenido,
    accesos: 0,
  });

  res.status(201).json({ message: "Entrada de blog creada", result });
  client.close();
}
