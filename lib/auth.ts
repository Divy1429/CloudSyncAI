import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
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
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
      console.log('[NextAuth signIn] Provider:', account?.provider, 'Email:', user?.email)
      
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          console.log(`[NextAuth signIn] Processing ${account.provider} OAuth for ${user.email}`)
          await dbConnect()
          
          // Check if user exists
          const existingUser = await User.findOne({ email: user.email })
          
          if (existingUser) {
            // Update existing user with OAuth info if not already set
            if (account.provider === "google" && !existingUser.googleId) {
              existingUser.googleId = account.providerAccountId
              existingUser.provider = "google"
              existingUser.image = user.image
              existingUser.emailVerified = new Date()
              await existingUser.save()
            } else if (account.provider === "github" && !existingUser.githubId) {
              existingUser.githubId = account.providerAccountId
              existingUser.provider = "github"
              existingUser.image = user.image
              existingUser.emailVerified = new Date()
              await existingUser.save()
            }
          } else {
            // Create new user
            const newUserData: any = {
              name: user.name,
              email: user.email,
              provider: account.provider,
              image: user.image,
              emailVerified: new Date(),
            }
            
            if (account.provider === "google") {
              newUserData.googleId = account.providerAccountId
            } else if (account.provider === "github") {
              newUserData.githubId = account.providerAccountId
            }
            
            await User.create(newUserData)
            console.log(`[NextAuth signIn] ✅ Created new user via ${account.provider}`)

            // Log activity for new user (but don't fail login if this fails)
            try {
              const { createActivityLog } = await import("@/lib/activity")
              const newUser = await User.findOne({ email: user.email })
              if (newUser) {
                await createActivityLog({
                  userId: newUser._id.toString(),
                  action: "user.signup",
                  description: `${user.name} signed up with ${account.provider}`,
                })
              }
            } catch (activityError) {
              console.error("Failed to log activity:", activityError)
              // Continue anyway - don't block login
            }
          }
          
          console.log(`[NextAuth signIn] ✅ ${account.provider} authentication successful for ${user.email}`)
          
          // Store user ID in the user object so we can pass it through the redirect
          const dbUser = await User.findOne({ email: user.email })
          if (dbUser) {
            user.id = dbUser._id.toString()
            console.log(`[NextAuth signIn] User ID set: ${user.id}`)
          }
          
          return true
        } catch (error) {
          console.error(`[NextAuth signIn] ❌ Error in ${account.provider} sign-in:`, error)
          // Return false on error to prevent login with invalid state
          return false
        }
      }
      
      // Return true for credentials provider and any other providers
      console.log('[NextAuth signIn] ✅ Authentication successful (non-OAuth)')
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('[NextAuth redirect] URL:', url, 'Base:', baseUrl)
      
      // Don't use custom redirect - let NextAuth handle it naturally
      // The dashboard will detect missing user data and set JWT cookie
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      
      if (url.startsWith(baseUrl)) {
        return url
      }
      
      return baseUrl
    },
    async session({ session, token }) {
      console.log('[NextAuth session callback] Called with:', { 
        hasSession: !!session, 
        hasToken: !!token,
        tokenSub: token?.sub 
      })
      
      if (token && session.user) {
        session.user.id = token.sub as string
        
        // Fetch additional user data from database
        await dbConnect()
        const user = await User.findById(token.sub)
        
        if (user) {
          session.user.name = user.name
          session.user.email = user.email
          session.user.image = user.image
          
          console.log('[NextAuth session callback] Session prepared for user:', user.email)
        }
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id
        // Store user info in token for session callback
        token.email = user.email
        token.name = user.name
        token.image = user.image
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
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax', // Changed from 'none' for better OAuth compatibility
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
