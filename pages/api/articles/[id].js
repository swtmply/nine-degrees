import Articles from "@/models/Articles";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  mongoDBConnect();
  const data = req.body;

  switch (method) {
    case "GET":
      try {
        const article = await Articles.findById(id);

        if (article) res.status(200).json({ article });
      } catch (error) {
        return res.status(400).json({ message: "Articles failed to fetch" });
      }
      break;

    case "PUT":
      try {
        const newArticle = await Articles.findByIdAndUpdate(id, data, {
          new: true,
          runValidators: true,
        });

        if (newArticle)
          return res.status(201).json({ message: "Article has been updated" });
      } catch (error) {
        return res.status(400).json({ message: "Couldn't update article" });
      }
      break;

    case "DELETE":
      try {
        const article = await Articles.findOneAndDelete({ _id: id });

        if (article)
          res.status(200).json({ message: "Article has been deleted" });
      } catch (error) {
        return res.status(400).json({ message: "Couldn't delete article" });
      }
      break;
  }
}
