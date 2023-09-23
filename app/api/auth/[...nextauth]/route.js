import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "guest-login",
      name: "Guest",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Guest" },
        password: { label: "Password", type: "password", placeholder: "hello" },
        email: { label: "Email", type: "email", placeholder: "guest@gmail.com" }
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const user = { 
          id: '12345', name: "Guest", email: "guest@gmail.com",
          image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }

        if (user) {
          return user
        } else {
          return null
        }
      }
    }),
  ],
  
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

  //   async signIn({ profile }) {
  //     try {
  //       await connectToDB();

  //       // check if a user already exists
  //       const userExists = await User.findOne({
  //         email: profile.email,
  //       });
        
  //       // if not, create a new user
  //       if (!userExists) {
  //         await User.create({
  //           email: profile.email,
  //           username: profile.name.replace(" ", "").toLowerCase(),
  //           image: profile.picture,
  //         });
  //       }

  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   },
  },
});

export { handler as GET, handler as POST };
