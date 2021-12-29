import Users from "@/models/Users";
import mongoDBConnect from "@/lib/mongoDBConnect";
import bcrypt from "bcrypt";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  mongoDBConnect();

  switch (method) {
    case "GET":
      try {
        const user = await Users.findById(id);

        if (user) return res.status(200).json({ user });
      } catch (error) {
        return res.status(400).json({ message: "Failed to fetch user" });
      }
    case "PUT":
      try {
        if (req.body.password)
          req.body.password = await bcrypt.hash(req.body.password, 12);

        const user = await Users.findByIdAndUpdate(
          id,
          { ...req.body },
          { new: true }
        );

        if (user)
          return res.status(200).json({ message: "Updated user successfully" });
      } catch (error) {
        return res.status(400).json({ message: "Failed to fetch user" });
      }
    case "DELETE":
      try {
        const user = await Users.findOneAndDelete({ _id: id });

        if (user) res.status(200).json({ message: "User has been deleted" });
      } catch (error) {
        return res.status(400).json({ message: "Couldn't delete user" });
      }
      break;
  }
}
