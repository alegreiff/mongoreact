import dbConnect from "../../data/dbConnect";

dbConnect();

export default async (req, res) => {
  res.json({ test: "test" });
};
