"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createOrder = async (values: any, items: any[]) => {
  const session = await auth()
  
  if (!session?.user?.id) {
    return { error: "You must be logged in to place an order" }
  }

  const { address, city, phone, paymentMethod, total } = values

  try {
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        address,
        city,
        phone,
        paymentMethod,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    })

    // Update stock (optional but recommended)
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })
    }

    revalidatePath("/profile")
    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Order creation error:", error)
    return { error: "Failed to create order. Please try again." }
  }
}
