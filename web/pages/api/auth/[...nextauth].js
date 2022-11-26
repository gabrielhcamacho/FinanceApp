import NextAuth from "next-auth"
import Facebook from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)