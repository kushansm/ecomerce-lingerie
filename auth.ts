import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/db"
import authConfig from "@/auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { 
  handlers: { GET, POST }, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as any
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      
      const user = await prisma.user.findUnique({
        where: { id: token.sub }
      })
      
      if (!user) return token
      
      token.role = user.role
      return token
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as any
        
        if (!email || !password) return null
        
        const user = await prisma.user.findUnique({
          where: { email }
        })
        
        if (!user || !user.password) return null
        
        const passwordsMatch = await bcrypt.compare(password, user.password)
        
        if (passwordsMatch) return user
        
        return null
      },
    }),
  ],
  ...authConfig,
})
