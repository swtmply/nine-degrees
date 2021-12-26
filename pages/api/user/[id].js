import Users from "@/models/Users";
import mongoDBConnect from "@/lib/mongoDBConnect";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  mongoDBConnect();

  try {
    const user = await Users.findById(id);

    if (user) return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: "Failed to fetch user" });
  }
}
