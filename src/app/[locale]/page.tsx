import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";

export default async function Home() {

  // await db.product.createMany({
  //   data: [
  //     {
  //       id: 'meat001qazxswedcvfrtgb',
  //       name: 'Grilled Chicken Shawarma',
  //       description: 'Juicy grilled chicken marinated in Middle Eastern spices, served in a warm pita with garlic sauce and fresh veggies.',
  //       image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 1,
  //       basePrice: 12.99,
  //       categoryId: '621e5449-7b7a-4d1a-8ffa-e6232ce36964', // Meat
  //     },
  //     {
  //       id: 'meat002ae79fc8oijnebcybo',
  //       name: 'Beef Kebab Platter',
  //       description: 'Tender beef kebabs grilled to perfection, served with saffron rice, grilled vegetables, and a side of hummus.',
  //       image: 'https://images.unsplash.com/photo-1603360946369-dc9bbf814ecf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 2,
  //       basePrice: 14.99,
  //       categoryId: '621e5449-7b7a-4d1a-8ffa-e6232ce36964', // Meat
  //     },
  //     {
  //       id: 'meat003768oinjbvcxsr45678',
  //       name: 'Lamb Biryani',
  //       description: 'Fragrant basmati rice cooked with tender lamb pieces, aromatic spices, and garnished with fried onions and fresh herbs.',
  //       image: 'https://images.unsplash.com/photo-1630910392844-7b9985b0d2f7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 11,
  //       basePrice: 15.99,
  //       categoryId: '621e5449-7b7a-4d1a-8ffa-e6232ce36964', // Meat
  //     },
  //     {
  //       id: 'meat004a9kf9e0k687siahcunt',
  //       name: 'Chicken Tikka Masala',
  //       description: 'Tender chicken pieces cooked in a creamy tomato-based sauce with aromatic spices, served with naan bread.',
  //       image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 12,
  //       basePrice: 13.99,
  //       categoryId: '621e5449-7b7a-4d1a-8ffa-e6232ce36964', // Meat
  //     },
  //     {
  //       id: 'meat005qazxsw7568agidun',
  //       name: 'Beef Kofta Curry',
  //       description: 'Spiced beef meatballs simmered in a rich and flavorful curry sauce, served with steamed rice.',
  //       image: 'https://images.unsplash.com/photo-1606491956576-8d8e4c1b9a9e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 13,
  //       basePrice: 14.99,
  //       categoryId: '621e5449-7b7a-4d1a-8ffa-e6232ce36964', // Meat
  //     },
  //     {
  //       id: 'cheese001qwertyuiopasd',
  //       name: 'Four-Cheese Mac and Cheese',
  //       description: 'Creamy macaroni baked with a blend of cheddar, mozzarella, Parmesan, and Gouda cheeses.',
  //       image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 3,
  //       basePrice: 9.99,
  //       categoryId: '66073c05-e2f7-47b7-bb5f-793d6edae04e', // Cheese
  //     },
  //     {
  //       id: 'cheese002lkjhgfdsazxcv',
  //       name: 'Cheese Fondue',
  //       description: 'A rich blend of melted Swiss cheeses served with bread cubes, vegetables, and apple slices for dipping.',
  //       image: 'https://images.unsplash.com/photo-1608212581897-1b5c6d1b1b1f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 4,
  //       basePrice: 14.99,
  //       categoryId: '66073c05-e2f7-47b7-bb5f-793d6edae04e', // Cheese
  //     },
  //     {
  //       id: 'veg001mnbvcxzlkjhgfds',
  //       name: 'Veggie Supreme Pizza',
  //       description: 'Packed with fresh vegetables: bell peppers, olives, mushrooms, and onions.',
  //       image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 5,
  //       basePrice: 9.99,
  //       categoryId: 'd070804e-542a-4995-8548-9c16a52df2b8', // Vegetarian
  //     },
  //     {
  //       id: 'veg002poiuytrewqasdf',
  //       name: 'Caprese Salad',
  //       description: 'Fresh mozzarella, ripe tomatoes, and basil leaves drizzled with balsamic glaze.',
  //       image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 6,
  //       basePrice: 7.99,
  //       categoryId: 'd070804e-542a-4995-8548-9c16a52df2b8', // Vegetarian
  //     },
  //     {
  //       id: 'classic001asdfghjklqwe',
  //       name: 'Margherita Pizza',
  //       description: 'Classic Margherita pizza with fresh tomatoes, mozzarella cheese, and basil leaves.',
  //       image: 'https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 7,
  //       basePrice: 8.99,
  //       categoryId: 'a8a13c73-5444-49f2-8f5b-cb726a7ec784', // Classic
  //     },
  //     {
  //       id: 'classic002zxcvbnmlkjhg',
  //       name: 'Spaghetti Carbonara',
  //       description: 'Classic Italian pasta with creamy egg sauce, pancetta, and Parmesan cheese.',
  //       image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 8,
  //       basePrice: 10.99,
  //       categoryId: 'a8a13c73-5444-49f2-8f5b-cb726a7ec784', // Classic
  //     },
  //     {
  //       id: 'spicy001qazwsxedcrfvtg',
  //       name: 'Spicy Chicken Wings',
  //       description: 'Crispy chicken wings tossed in a fiery hot sauce, served with blue cheese dressing.',
  //       image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 9,
  //       basePrice: 11.99,
  //       categoryId: 'ae2990be-c983-416b-a383-0a7a76894678', // Spicy
  //     },
  //     {
  //       id: 'spicy002plokmijnuhbyg',
  //       name: 'Spicy Thai Curry',
  //       description: 'Aromatic Thai curry with coconut milk, chili, and your choice of vegetables or meat.',
  //       image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 10,
  //       basePrice: 13.99,
  //       categoryId: 'ae2990be-c983-416b-a383-0a7a76894678', // Spicy
  //     },
  //   ],
  // })

  // const products = await db.product.findMany();

  // for (const product of products) {
  //   // await db.size.createMany({
  //   //   data: [
  //   //    // { name: 'SMALL', price: product.basePrice, productId: product.id },
  //   //   //  { name: 'MEDIUM', price: product.basePrice, productId: product.id },
  //   //     // { name: 'LARGE', price: product.basePrice, productId: product.id },
  //   //   ],
  //   // });

  //   // await db.extra.createMany({
  //   //   data: [
  //   //     // { name: 'CHEESE', price: 1.99, productId: product.id },
  //   //     // { name: 'PEPPER', price: 1.49, productId: product.id },
  //   //     // { name: 'TOMATO', price: 1.79, productId: product.id },
  //   //     // { name: 'BACON', price: 2.99, productId: product.id },
  //   //     // { name: 'ONION', price: 1.99, productId: product.id },
  //   //   ],
  //   // });
  // }



  // await db.category.createMany({
  //   data: [
  //     { name: "Classic", order: 1 },
  //     { name: "Vegetarian", order: 2 },
  //     { name: "Meat", order: 3 },
  //     { name: "Cheese", order: 4 },
  //     { name: "Spicy", order: 5 },
  //   ]
  // })



  // await db.product.update({
  //   where: {
  //     id: 'meat005qazxsw7568agidun', // Specify the product ID to update
  //   },
  //   data: {
  //     image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=1300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // New image URL
  //   },
  // });

  // await db.product.update({
  //   where: {
  //     id: 'meat002ae79fc8oijnebcybo', // Specify the product ID to update
  //   },
  //   data: {
  //     image: 'https://images.unsplash.com/photo-1570461226513-e08b58a52c53?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // New image URL
  //   },
  // });

  // await db.product.update({
  //   where: {
  //     id: 'cheese002lkjhgfdsazxcv', // Specify the product ID to update
  //   },
  //   data: {
  //     image: 'https://img.freepik.com/free-photo/close-up-melted-cheese-recipe_23-2149286847.jpg?t=st=1740925740~exp=1740929340~hmac=1d92486f6508c94fa1ccfbeb9eded2a753fb6281e368ec7c27bde62ae879ae8b&w=1060', // New image URL
  //   },
  // });

  // const getIt = await db.orderProduct.update({
  //   where: {
  //     id: 'meat001qazxswedcvfrtgb'
  //   },
  //   data: {
  //     quantity: 3
  //   }
  // })

  // const getIt = await db.orderProduct.create({
  //   data: {
  //     orderId: '54678huns9ucuy786d5r456',
  //     productId: 'cheese002lkjhgfdsazxcv',
  //     quantity: 4,
  //   }
  // })

  // const order = await db.order.create({
  //   data: {
  //     id: "54678huns9ucuy786d5r456",
  //     paid: false,
  //     subTotal: 100.5,
  //     deliveryFee: 5.0,
  //     totalPrice: 105.5,
  //     userEmail: "user@example.com",
  //     phone: "1234567890",
  //     streetAddress: "123 Main St",
  //     postalCode: "12345",
  //     city: "New York",
  //     country: "USA"
  //   }
  // });

  // const getIt = await db.product.findMany()

  // console.log(getIt)

  return (
    <div className="">
      <Hero />
      <BestSellers />
    </div>
  );
}
