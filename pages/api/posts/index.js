import dbConnect from "../../../data/dbConnect";
import Post from "../../../data/models/Post";

dbConnect();

export default async (req, res) => {
  console.log(req.body);
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, data: post });
      } catch (error) {
        res.status(402).json({ success: false, pailas: "sisas" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
