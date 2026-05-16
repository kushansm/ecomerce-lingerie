const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')
  
  try {
    // Clean the database in correct order
    console.log('Cleaning database...')
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    console.log('Database cleaned.')

    // Create Categories
    console.log('Creating categories...')
    const categories = await Promise.all([
      prisma.category.create({ data: { name: 'Bras' } }),
      prisma.category.create({ data: { name: 'Panties' } }),
      prisma.category.create({ data: { name: 'Sets' } }),
      prisma.category.create({ data: { name: 'Sleepwear' } }),
      prisma.category.create({ data: { name: 'Bodysuits' } }),
    ])
    console.log(`Created ${categories.length} categories.`)

    const [bras, panties, sets, sleepwear, bodysuits] = categories

    // Create Products
    console.log('Creating products...')
    const products = [
      {
        name: 'Midnight Lace Bralette',
        description: 'A delicate midnight blue lace bralette with adjustable straps and a soft silk lining.',
        price: 45.00,
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800'],
        categoryId: bras.id,
        stock: 50,
      },
      {
        name: 'Crimson Satin Slip',
        description: 'Luxury crimson red satin slip dress with eyelash lace trim. Perfect for elegant evenings.',
        price: 85.00,
        images: ['https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=800'],
        categoryId: sleepwear.id,
        stock: 30,
      },
      {
        name: 'Emerald Velvet Set',
        description: 'Stunning emerald green velvet set featuring a triangle top and matching high-waisted bottoms.',
        price: 120.00,
        images: ['https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?auto=format&fit=crop&q=80&w=800'],
        categoryId: sets.id,
        stock: 20,
      },
      {
        name: 'Rose Dust Morning Robe',
        description: 'Soft rose-colored silk robe with wide sleeves and a matching belt.',
        price: 150.00,
        images: ['https://images.unsplash.com/photo-1549062300-1d3ad90bb4d5?auto=format&fit=crop&q=80&w=800'],
        categoryId: sleepwear.id,
        stock: 15,
      },
      {
        name: 'Floral Embroidery Bodysuit',
        description: 'Intricate floral embroidery on sheer mesh with a cheeky cut back.',
        price: 75.00,
        images: ['https://images.unsplash.com/photo-1515377662630-cd03bc627824?auto=format&fit=crop&q=80&w=800'],
        categoryId: bodysuits.id,
        stock: 40,
      },
      {
        name: 'Onyx Silk Panties',
        description: 'Premium black silk panties with seamless edges for ultimate comfort.',
        price: 25.00,
        images: ['https://images.unsplash.com/photo-1571945153237-4929e783ee4a?auto=format&fit=crop&q=80&w=800'],
        categoryId: panties.id,
        stock: 100,
      },
    ]

    for (const product of products) {
      await prisma.product.create({
        data: product
      })
    }

    console.log('Seed successful!')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
