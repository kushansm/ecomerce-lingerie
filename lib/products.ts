import prisma from "@/lib/db"

export async function getProducts(search?: string, categoryId?: string) {
  return await prisma.product.findMany({
    where: {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ]
        } : {},
        categoryId ? { categoryId } : {},
      ]
    },
    include: {
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: true
    }
  })
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })
}
