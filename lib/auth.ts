import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        await dbConnect()
        
        const user = await User.findOne({ email: credentials.email }).select("+password")
        
        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await dbConnect()
          
          // Check if user exists
          const existingUser = await User.findOne({ email: user.email })
          
          if (existingUser) {
            // Update existing user with Google info if not already set
            if (!existingUser.googleId) {
              existingUser.googleId = account.providerAccountId
              existingUser.provider = "google"
              existingUser.image = user.image
              existingUser.emailVerified = new Date()
              await existingUser.save()
            }
          } else {
            // Create new user
            await User.create({
              name: user.name,
              email: user.email,
              googleId: account.providerAccountId,
              provider: "google",
              image: user.image,
              emailVerified: new Date(),
            })

            // Log activity for new user
            const { createActivityLog } = await import("@/lib/activity")
            const newUser = await User.findOne({ email: user.email })
            if (newUser) {
              await createActivityLog({
                userId: newUser._id.toString(),
                action: "user.signup",
                description: `${user.name} signed up with Google`,
              })
            }
          }
          
          return true
        } catch (error) {
          console.error("Error in Google sign-in:", error)
          return false
        }
      }
      
      return true
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
        
        // Fetch additional user data from database
        await dbConnect()
        const user = await User.findById(token.sub)
        
        if (user) {
          session.user.name = user.name
          session.user.email = user.email
          session.user.image = user.image
        }
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
