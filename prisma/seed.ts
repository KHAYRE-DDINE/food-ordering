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
      { id: 'f1111111-2222-3333-4444-555555555555', name: "Burgers", order: 6 },
      { id: 'f2222222-3333-4444-5555-666666666666', name: "Desserts", order: 7 },
      { id: 'f3333333-4444-5555-6666-777777777777', name: "Beverages", order: 8 },
      { id: 'f4444444-5555-6666-7777-888888888888', name: "Sides", order: 9 },
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
      // Burgers
      {
        id: 'burger001smashqazwsx',
        name: 'Classic Smash Burger',
        description: 'Double Angus beef smash patties, melted American cheddar, caramelized onions, house burger sauce on a toasted brioche bun.',
        image: '/assets/images/menu/classic-smash-burger.jpg',
        order: 14,
        basePrice: 11.49,
        categoryId: 'f1111111-2222-3333-4444-555555555555', // Burgers
      },
      {
        id: 'burger002crispychik',
        name: 'Crispy Buttermilk Chicken Burger',
        description: 'Golden-fried buttermilk chicken breast, crunchy coleslaw, dill pickles, and creamy garlic aioli on a sesame bun.',
        image: '/assets/images/menu/crispy-chicken-burger.jpg',
        order: 15,
        basePrice: 10.99,
        categoryId: 'f1111111-2222-3333-4444-555555555555', // Burgers
      },
      {
        id: 'burger003bbqbacon',
        name: 'Smoky BBQ Bacon Burger',
        description: 'Juicy beef patty stacked with crispy beef bacon, smoky barbecue sauce, crispy onion rings, and smoked cheddar.',
        image: '/assets/images/menu/bbq-bacon-burger.jpg',
        order: 16,
        basePrice: 12.99,
        categoryId: 'f1111111-2222-3333-4444-555555555555', // Burgers
      },
      // Desserts
      {
        id: 'dessert001tiramisu',
        name: 'Classic Italian Tiramisu',
        description: 'Layers of espresso-soaked ladyfingers, rich mascarpone cream, and Dutch cocoa powder.',
        image: '/assets/images/menu/classic-tiramisu.jpg',
        order: 17,
        basePrice: 6.99,
        categoryId: 'f2222222-3333-4444-5555-666666666666', // Desserts
      },
      {
        id: 'dessert002lavacake',
        name: 'Molten Chocolate Lava Cake',
        description: 'Warm, decadent dark chocolate cake with a gooey molten center, dusted with powdered sugar.',
        image: '/assets/images/menu/chocolate-lava-cake.jpg',
        order: 18,
        basePrice: 7.49,
        categoryId: 'f2222222-3333-4444-5555-666666666666', // Desserts
      },
      {
        id: 'dessert003nutellapiz',
        name: 'Nutella & Hazelnut Pizza',
        description: 'Fresh wood-fired crust slathered with warm Nutella, crushed toasted hazelnuts, and fresh strawberries.',
        image: '/assets/images/menu/nutella-pizza.jpg',
        order: 19,
        basePrice: 8.99,
        categoryId: 'f2222222-3333-4444-5555-666666666666', // Desserts
      },
      // Beverages
      {
        id: 'drink001mintlemon',
        name: 'Fresh Mint Lemonade',
        description: 'Freshly squeezed lemons, crushed garden mint, and pure cane syrup over crushed ice.',
        image: '/assets/images/menu/fresh-mint-lemonade.jpg',
        order: 20,
        basePrice: 3.99,
        categoryId: 'f3333333-4444-5555-6666-777777777777', // Beverages
      },
      {
        id: 'drink002caramellat',
        name: 'Iced Caramel Macchiato',
        description: 'Rich espresso poured over chilled whole milk with vanilla and finished with buttery caramel drizzle.',
        image: '/assets/images/menu/iced-caramel-latte.jpg',
        order: 21,
        basePrice: 4.49,
        categoryId: 'f3333333-4444-5555-6666-777777777777', // Beverages
      },
      {
        id: 'drink003berrycool',
        name: 'Sparkling Wild Berry Cooler',
        description: 'Refreshing sparkling water infused with blackberries, raspberries, fresh lime, and aromatic thyme.',
        image: '/assets/images/menu/berry-cooler.jpg',
        order: 22,
        basePrice: 4.29,
        categoryId: 'f3333333-4444-5555-6666-777777777777', // Beverages
      },
      // Sides
      {
        id: 'side001trufflefries',
        name: 'Truffle Parmesan Fries',
        description: 'Hand-cut crispy skin-on fries tossed in white truffle oil, freshly grated Parmesan, and fresh parsley.',
        image: '/assets/images/menu/truffle-parmesan-fries.jpg',
        order: 23,
        basePrice: 5.99,
        categoryId: 'f4444444-5555-6666-7777-888888888888', // Sides
      },
      {
        id: 'side002mozzasticks',
        name: 'Crispy Mozzarella Sticks',
        description: 'Golden seasoned breaded mozzarella sticks served hot and stretchy with homemade marinara dip.',
        image: '/assets/images/menu/mozzarella-sticks.jpg',
        order: 24,
        basePrice: 6.49,
        categoryId: 'f4444444-5555-6666-7777-888888888888', // Sides
      },
      {
        id: 'side003garlicbites',
        name: 'Garlic Butter Dough Bites',
        description: 'Oven-baked pizza dough bites tossed in rich roasted garlic herb butter and served with warm cheese sauce.',
        image: '/assets/images/menu/garlic-bread-bites.jpg',
        order: 25,
        basePrice: 5.49,
        categoryId: 'f4444444-5555-6666-7777-888888888888', // Sides
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

  console.log('Seeding promo codes...')
  await db.promoCode.deleteMany()
  await db.promoCode.createMany({
    data: [
      {
        code: 'WELCOME10',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minOrderAmount: 15,
        isActive: true,
      },
      {
        code: 'FASTY5',
        discountType: 'FIXED',
        discountValue: 5,
        minOrderAmount: 25,
        isActive: true,
      },
      {
        code: 'FEAST20',
        discountType: 'PERCENTAGE',
        discountValue: 20,
        minOrderAmount: 40,
        isActive: true,
      }
    ]
  })

  console.log('Seeding offers & meal deals...')
  await db.offer.deleteMany()
  await db.offer.createMany({
    data: [
      {
        id: 'offer-family-combo',
        title: 'Family Feast Combo',
        description: 'Two large Margherita pizzas, seasoned Spicy Chicken Wings, and fresh Caprese salad. Perfect for 3-4 people.',
        badge: 'Save 25%',
        price: 32.99,
        originalPrice: 43.96,
        image: '/assets/images/menu/margherita-pizza.jpg',
        isActive: true,
        terms: 'Available for delivery and pickup. Cannot be combined with other coupons.'
      },
      {
        id: 'offer-shawarma-duo',
        title: 'Shawarma & Biryani Duo',
        description: 'Grilled Chicken Shawarma paired with aromatic Lamb Biryani and house garlic sauce.',
        badge: 'Best Value',
        price: 24.99,
        originalPrice: 28.98,
        image: '/assets/images/menu/grilled-chicken-shawarma.jpg',
        isActive: true,
        terms: 'Valid daily from 11:00 AM to 10:00 PM.'
      },
      {
        id: 'offer-pasta-fondue',
        title: 'Italian & Fondue Night',
        description: 'Authentic Spaghetti Carbonara accompanied by warm melted Cheese Fondue and dipping bread.',
        badge: 'Chef Choice',
        price: 21.99,
        originalPrice: 25.98,
        image: '/assets/images/menu/spaghetti-carbonara.jpg',
        isActive: true,
        terms: 'Subject to daily availability.'
      }
    ]
  })

  console.log('Upserting restaurant settings...')
  await db.restaurantSettings.upsert({
    where: { id: 'default' },
    update: {
      name: 'Fasty Food Restaurant',
      phone: '+1 555-0199',
      email: 'orders@fastyfood.com',
      address: '123 Gourmet Boulevard, Food District',
      deliveryFee: 5.0,
      minOrderAmount: 10.0,
      freeDeliveryThreshold: 40.0,
      estimatedDeliveryMinutes: 30,
      estimatedPickupMinutes: 15,
      openingHour: '10:00 AM',
      closingHour: '11:00 PM',
      operatingDays: 'Monday - Sunday',
      isOpen: true,
      deliveryEnabled: true,
      pickupEnabled: true,
    },
    create: {
      id: 'default',
      name: 'Fasty Food Restaurant',
      phone: '+1 555-0199',
      email: 'orders@fastyfood.com',
      address: '123 Gourmet Boulevard, Food District',
      deliveryFee: 5.0,
      minOrderAmount: 10.0,
      freeDeliveryThreshold: 40.0,
      estimatedDeliveryMinutes: 30,
      estimatedPickupMinutes: 15,
      openingHour: '10:00 AM',
      closingHour: '11:00 PM',
      operatingDays: 'Monday - Sunday',
      isOpen: true,
      deliveryEnabled: true,
      pickupEnabled: true,
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
