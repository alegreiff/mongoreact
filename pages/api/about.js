import { connectToDatabase } from "../../data/db";

export default function handler(req, res) {
  conecta();
  res.status(200).json({ name: "MC AML AMOS" });
}

const conecta = async () => {
  const client = await connectToDatabase();
  console.log(client);
  return client;
};
