import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // This will be implemented in auth.ts
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
