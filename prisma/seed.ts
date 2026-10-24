import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('Cleaning up existing data...')
  await db.orderProduct.deleteMany()
  await db.orderStatusEvent.deleteMany()
  await db.order.deleteMany()
  await db.size.deleteMany()
  await db.extra.deleteMany()
  await db.product.deleteMany()
  await db.category.deleteMany()

  console.log('Seeding categories...')
  await db.category.createMany({
    data: [
      { id: 'f8b1d784-4d2d-4a3b-947f-321b5c364f09', name: "Classic", order: 1 },
      { id: 'fe34c855-42ee-468e-9211-f24c003e3f8d', name: "Vegetarian", order: 2 },
      { id: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', name: "Meat", order: 3 },
      { id: 'fd2f22ee-8165-4720-b22c-75c3ecacb536', name: "Cheese", order: 4 },
      { id: 'ff443f25-09c3-4320-b619-bda6102445e4', name: "Spicy", order: 5 },
    ]
  })

  console.log('Seeding products with reliable local images...')
  await db.product.createMany({
    data: [
      {
        id: 'meat001qazxswedcvfrtgb',
        name: 'Grilled Chicken Shawarma',
        description: 'Juicy grilled chicken marinated in Middle Eastern spices, served in a warm pita with garlic sauce and fresh veggies.',
        image: '/assets/images/menu/grilled-chicken-shawarma.jpg',
        order: 1,
        basePrice: 12.99,
        categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
      },
      {
        id: 'meat002ae79fc8oijnebcybo',
        name: 'Beef Kebab Platter',
        description: 'Tender beef kebabs grilled to perfection, served with saffron rice, grilled vegetables, and a side of hummus.',
        image: '/assets/images/menu/beef-kebab-platter.jpg',
        order: 2,
        basePrice: 14.99,
        categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
      },
      {
        id: 'meat003768oinjbvcxsr45678',
        name: 'Lamb Biryani',
        description: 'Fragrant basmati rice cooked with tender lamb pieces, aromatic spices, and garnished with fried onions and fresh herbs.',
        image: '/assets/images/menu/lamb-biryani.jpg',
        order: 11,
        basePrice: 15.99,
        categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
      },
      {
        id: 'meat004a9kf9e0k687siahcunt',
        name: 'Chicken Tikka Masala',
        description: 'Tender chicken pieces cooked in a creamy tomato-based sauce with aromatic spices, served with naan bread.',
        image: '/assets/images/menu/chicken-tikka-masala.jpg',
        order: 12,
        basePrice: 13.99,
        categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
      },
      {
        id: 'meat005qazxsw7568agidun',
        name: 'Beef Kofta Curry',
        description: 'Spiced beef meatballs simmered in a rich and flavorful curry sauce, served with steamed rice.',
        image: '/assets/images/menu/beef-kofta-curry.jpg',
        order: 13,
        basePrice: 14.99,
        categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
      },
      {
        id: 'cheese001qwertyuiopasd',
        name: 'Four-Cheese Mac and Cheese',
        description: 'Creamy macaroni baked with a blend of cheddar, mozzarella, Parmesan, and Gouda cheeses.',
        image: '/assets/images/menu/four-cheese-mac.jpg',
        order: 3,
        basePrice: 9.99,
        categoryId: 'fd2f22ee-8165-4720-b22c-75c3ecacb536', // Cheese
      },
      {
        id: 'cheese002lkjhgfdsazxcv',
        name: 'Cheese Fondue',
        description: 'A rich blend of melted Swiss cheeses served with bread cubes, vegetables, and apple slices for dipping.',
        image: '/assets/images/menu/cheese-fondue.jpg',
        order: 4,
        basePrice: 14.99,
        categoryId: 'fd2f22ee-8165-4720-b22c-75c3ecacb536', // Cheese
      },
      {
        id: 'veg001mnbvcxzlkjhgfds',
        name: 'Veggie Supreme Pizza',
        description: 'Packed with fresh vegetables: bell peppers, olives, mushrooms, and onions.',
        image: '/assets/images/menu/veggie-supreme-pizza.jpg',
        order: 5,
        basePrice: 9.99,
        categoryId: 'fe34c855-42ee-468e-9211-f24c003e3f8d', // Vegetarian
      },
      {
        id: 'veg002poiuytrewqasdf',
        name: 'Caprese Salad',
        description: 'Fresh mozzarella, ripe tomatoes, and basil leaves drizzled with balsamic glaze.',
        image: '/assets/images/menu/caprese-salad.jpg',
        order: 6,
        basePrice: 7.99,
        categoryId: 'fe34c855-42ee-468e-9211-f24c003e3f8d', // Vegetarian
      },
      {
        id: 'classic001asdfghjklqwe',
        name: 'Margherita Pizza',
        description: 'Classic Margherita pizza with fresh tomatoes, mozzarella cheese, and basil leaves.',
        image: '/assets/images/menu/margherita-pizza.jpg',
        order: 7,
        basePrice: 8.99,
        categoryId: 'f8b1d784-4d2d-4a3b-947f-321b5c364f09', // Classic
      },
      {
        id: 'classic002zxcvbnmlkjhg',
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with creamy egg sauce, pancetta, and Parmesan cheese.',
        image: '/assets/images/menu/spaghetti-carbonara.jpg',
        order: 8,
        basePrice: 10.99,
        categoryId: 'f8b1d784-4d2d-4a3b-947f-321b5c364f09', // Classic
      },
      {
        id: 'spicy001qazwsxedcrfvtg',
        name: 'Spicy Chicken Wings',
        description: 'Crispy chicken wings tossed in a fiery hot sauce, served with blue cheese dressing.',
        image: '/assets/images/menu/spicy-chicken-wings.jpg',
        order: 9,
        basePrice: 11.99,
        categoryId: 'ff443f25-09c3-4320-b619-bda6102445e4', // Spicy
      },
      {
        id: 'spicy002plokmijnuhbyg',
        name: 'Spicy Thai Curry',
        description: 'Aromatic Thai curry with coconut milk, chili, and your choice of vegetables or meat.',
        image: '/assets/images/menu/spicy-thai-curry.jpg',
        order: 10,
        basePrice: 13.99,
        categoryId: 'ff443f25-09c3-4320-b619-bda6102445e4', // Spicy
      },
    ],
  })

  console.log('Seeding sizes and extras...')
  const products = await db.product.findMany()
  for (const product of products) {
    await db.size.createMany({
      data: [
        { name: "SMALL", price: product.basePrice, productId: product.id },
        { name: "MEDIUM", price: product.basePrice * 1.4, productId: product.id },
        { name: "LARGE", price: product.basePrice * 2.3, productId: product.id },
      ],
    })

    await db.extra.createMany({
      data: [
        { name: "CHEESE", price: 1.99, productId: product.id },
        { name: "PEPPER", price: 1.49, productId: product.id },
        { name: "TOMATO", price: 1.79, productId: product.id },
        { name: "BACON", price: 2.99, productId: product.id },
        { name: "ONION", price: 1.99, productId: product.id },
      ],
    })
  }

  // Also seed an initial order so BestSellers query has real orders to display
  console.log('Seeding initial best seller orders...')
  const initialOrder = await db.order.create({
    data: {
      paid: true,
      fulfillmentStatus: "COMPLETED",
      paymentStatus: "PAID",
      subTotal: 50.0,
      deliveryFee: 5.0,
      totalPrice: 55.0,
      userEmail: "customer@example.com",
      phone: "+1 555-0100",
      streetAddress: "123 Main Street",
      postalCode: "10001",
      city: "New York",
      country: "USA",
      products: {
        create: [
          { productId: 'classic001asdfghjklqwe', quantity: 3, productName: 'Margherita Pizza', unitPrice: 8.99 },
          { productId: 'meat001qazxswedcvfrtgb', quantity: 2, productName: 'Grilled Chicken Shawarma', unitPrice: 12.99 },
          { productId: 'spicy001qazwsxedcrfvtg', quantity: 2, productName: 'Spicy Chicken Wings', unitPrice: 11.99 },
        ]
      }
    }
  })

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
