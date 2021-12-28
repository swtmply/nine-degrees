import Users from "@/models/Users";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  const {
    query: { category },
  } = req;
  mongoDBConnect();

  try {
    if (category) {
      const users = await Users.find({ categories: category });
      if (users) return res.status(200).json({ users: users.reverse() });
    }

    const users = await Users.find({});
    if (users) return res.status(200).json({ users: users.reverse() });
  } catch (error) {
    return res.status(400).json({ message: "Users failed to fetch" });
  }
}
