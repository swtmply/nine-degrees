import Users from "@/models/Users";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  mongoDBConnect();

  try {
    const users = await Users.find({});

    if (users) return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ message: "Users failed to fetch" });
  }
}
