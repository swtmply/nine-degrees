import Articles from "@/models/Articles";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  const {
    method,
    query: { category, subsection, writer },
  } = req;

  await mongoDBConnect();
  const data = req.body;

  switch (method) {
    case "POST":
      try {
        const newArticle = await Articles.create(data);

        if (newArticle)
          return res.status(201).json({ message: "Article has been created" });
      } catch (error) {
        return res.status(400).json({ message: "Couldn't create article" });
      }
      break;

    case "GET":
      try {
        if (category) {
          const articles = await Articles.find({ category });

          if (articles)
            return res.status(200).json({ articles: articles.reverse() });
        }

        if (subsection) {
          const articles = await Articles.find({ subsection });

          if (articles)
            return res.status(200).json({ articles: articles.reverse() });
        }

        if (writer) {
          const articles = await Articles.find({ writer });

          if (articles)
            return res.status(200).json({ articles: articles.reverse() });
        }

        const articles = await Articles.find({});

        if (articles)
          return res.status(200).json({ articles: articles.reverse() });
      } catch (error) {
        return res.status(400).json({ message: "Articles failed to fetch" });
      }
      break;
  }
}
