"use server"

import bcrypt from "bcryptjs"
import prisma from "@/lib/db"

export const register = async (values: any) => {
  const { email, password, name } = values
  
  if (!email || !password || !name) {
    return { error: "Missing fields" }
  }
  
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })
  
  if (existingUser) {
    return { error: "Email already in use" }
  }
  
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })
  
  return { success: "User created" }
}
