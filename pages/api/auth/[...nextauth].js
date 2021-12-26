import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "@/lib/mongoDBAdapter";
import mongoDBConnect from "@/lib/mongoDBConnect";
import Users from "@/models/Users";

import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // database call
        await mongoDBConnect();

        const email = credentials.email;
        const password = credentials.password;

        const user = await Users.findOne({ email });

        if (user) {
          if (!user.password) {
            throw new Error("User does not exist");
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new Error("Password Incorrect");
          }

          return user;
        } else {
          throw new Error("No user found with this email");
        }
      },
    }),
  ],

  // JWT
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },

  // pages
  pages: {
    signIn: "auth/login",
  },

  // database adapter
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },

  // callback
  callbacks: {
    jwt: ({ token, user }) => {
      // TODO: return details of user to token
      if (user) {
        token.role = user.role;
        token.categories = user.categories;
      }

      return token;
    },

    // name, email, image, id = mongodb id ng user
    session: ({ session, token }) => {
      if (token) {
        session.id = token.sub;
        session.user.role = token.role;
        session.user.categories = token.categories;
      }

      return session;
    },
  },
});
