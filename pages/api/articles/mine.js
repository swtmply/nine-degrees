import Articles from "@/models/Articles";
import mongoDBConnect from "@/lib/mongoDBConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  await mongoDBConnect();
  const session = await getSession({ req });

  switch (method) {
    case "GET":
      // for writer's tab kkunin lahat ng articles under their name
      try {
        const articles = await Articles.find({ writer: session.user.name});
        return res.status(200).json({ articles })
    } catch (error) {
        return res.status(400).json({ message: "Failed to fetch articles" })
    }
    break;

  }
}
