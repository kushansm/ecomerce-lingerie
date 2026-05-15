"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const login = async (values: any) => {
  const { email, password } = values
  
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }
        default:
          return { error: "Something went wrong" }
      }
    }
    
    throw error
  }
}
