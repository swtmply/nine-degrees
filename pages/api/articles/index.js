import Articles from "@/models/Articles";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  const {
    method,
    query: { page, category, subsection },
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
        if (page) {
          let query = Articles.find();

          const pageSize = 5;
          const skip = (page - 1) * pageSize;
          const total = await Articles.countDocuments();

          const pages = Math.ceil(total / pageSize);

          query = query.skip(skip).limit(pageSize);

          const articles = await query;
          console.log("all", articles.length)
          if (articles)
            return res
              .status(200)
              .json({ articles: articles.reverse(), pages, page });
        }

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

        const articles = await Articles.find({});

        if (articles)
          return res.status(200).json({ articles: articles.reverse() });
      } catch (error) {
        return res.status(400).json({ message: "Articles failed to fetch" });
      }
      break;
  }
}
