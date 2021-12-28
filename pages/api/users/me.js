import Users from "@/models/Users";
import mongoDBConnect from "@/lib/mongoDBConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { method } = req;
  mongoDBConnect();

  switch (method) {
    case "GET":
      try {
        const session = await getSession({ req });
        const user = await Users.findById(session.id);

        if (user) return res.status(200).json({ user });
      } catch (error) {
        return res.status(400).json({ message: "Failed to fetch user" });
      }
    case "PUT":
      try {
        const session = await getSession({ req });
        const user = await Users.findByIdAndUpdate(
          session.id,
          {
            ...req.body,
          },
          { new: true }
        );

        if (user)
          return res.status(200).json({ message: "Update Success", user });
      } catch (error) {
        return res.status(400).json({ message: "Failed to fetch user" });
      }
  }
}
