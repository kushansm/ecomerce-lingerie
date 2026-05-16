"use server"

import { auth } from "@/auth"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

const checkAdmin = async () => {
  const session = await auth()
  if ((session?.user as any)?.role !== "ADMIN") {
    throw new Error("Unauthorized")
  }
}

// Product Actions
export const createProduct = async (values: any) => {
  await checkAdmin()
  const product = await prisma.product.create({
    data: values
  })
  revalidatePath("/admin/products")
  revalidatePath("/shop")
  return product
}

export const updateProduct = async (id: string, values: any) => {
  await checkAdmin()
  const product = await prisma.product.update({
    where: { id },
    data: values
  })
  revalidatePath("/admin/products")
  revalidatePath(`/product/${id}`)
  revalidatePath("/shop")
  return product
}

export const deleteProduct = async (id: string) => {
  await checkAdmin()
  await prisma.product.delete({
    where: { id }
  })
  revalidatePath("/admin/products")
  revalidatePath("/shop")
}

// Order Actions
export const updateOrderStatus = async (id: string, status: any) => {
  await checkAdmin()
  const order = await prisma.order.update({
    where: { id },
    data: { status }
  })
  revalidatePath("/admin/orders")
  revalidatePath(`/order/${id}`)
  revalidatePath("/profile")
  return order
}

// Analytics
export const getAnalytics = async () => {
  await checkAdmin()
  
  const [totalSales, totalOrders, totalUsers, totalProducts] = await Promise.all([
    prisma.order.aggregate({
      _sum: { total: true },
      where: { status: { not: "CANCELLED" } }
    }),
    prisma.order.count(),
    prisma.user.count(),
    prisma.product.count()
  ])

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true }
  })

  return {
    revenue: totalSales._sum.total || 0,
    orders: totalOrders,
    users: totalUsers,
    products: totalProducts,
    recentOrders
  }
}
