import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import { GrSecure } from "react-icons/gr";
import { GoCreditCard } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { BsFillLightningFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import { db } from "@/lib/prisma";

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
  //       categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
  //     },
  //     {
  //       id: 'meat002ae79fc8oijnebcybo',
  //       name: 'Beef Kebab Platter',
  //       description: 'Tender beef kebabs grilled to perfection, served with saffron rice, grilled vegetables, and a side of hummus.',
  //       image: 'https://images.unsplash.com/photo-1570461226513-e08b58a52c53?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 2,
  //       basePrice: 14.99,
  //       categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
  //     },
  //     {
  //       id: 'meat003768oinjbvcxsr45678',
  //       name: 'Lamb Biryani',
  //       description: 'Fragrant basmati rice cooked with tender lamb pieces, aromatic spices, and garnished with fried onions and fresh herbs.',
  //       image: 'https://cdn.pixabay.com/photo/2024/01/18/17/20/ai-generated-8517258_960_720.jpg',
  //       order: 11,
  //       basePrice: 15.99,
  //       categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
  //     },
  //     {
  //       id: 'meat004a9kf9e0k687siahcunt',
  //       name: 'Chicken Tikka Masala',
  //       description: 'Tender chicken pieces cooked in a creamy tomato-based sauce with aromatic spices, served with naan bread.',
  //       image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 12,
  //       basePrice: 13.99,
  //       categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
  //     },
  //     {
  //       id: 'meat005qazxsw7568agidun',
  //       name: 'Beef Kofta Curry',
  //       description: 'Spiced beef meatballs simmered in a rich and flavorful curry sauce, served with steamed rice.',
  //       image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=1300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 13,
  //       basePrice: 14.99,
  //       categoryId: 'ffe5a310-d9fd-46e8-8a25-3d1f133ff66f', // Meat
  //     },
  //     {
  //       id: 'cheese001qwertyuiopasd',
  //       name: 'Four-Cheese Mac and Cheese',
  //       description: 'Creamy macaroni baked with a blend of cheddar, mozzarella, Parmesan, and Gouda cheeses.',
  //       image: '#######',
  //       order: 3,
  //       basePrice: 9.99,
  //       categoryId: 'fd2f22ee-8165-4720-b22c-75c3ecacb536', // Cheese
  //     },
  //     {
  //       id: 'cheese002lkjhgfdsazxcv',
  //       name: 'Cheese Fondue',
  //       description: 'A rich blend of melted Swiss cheeses served with bread cubes, vegetables, and apple slices for dipping.',
  //       image: 'https://img.freepik.com/free-photo/close-up-melted-cheese-recipe_23-2149286847.jpg?t=st=1740925740~exp=1740929340~hmac=1d92486f6508c94fa1ccfbeb9eded2a753fb6281e368ec7c27bde62ae879ae8b&w=1060',
  //       order: 4,
  //       basePrice: 14.99,
  //       categoryId: 'fd2f22ee-8165-4720-b22c-75c3ecacb536', // Cheese
  //     },
  //     {
  //       id: 'veg001mnbvcxzlkjhgfds',
  //       name: 'Veggie Supreme Pizza',
  //       description: 'Packed with fresh vegetables: bell peppers, olives, mushrooms, and onions.',
  //       image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 5,
  //       basePrice: 9.99,
  //       categoryId: 'fe34c855-42ee-468e-9211-f24c003e3f8d', // Vegetarian
  //     },
  //     {
  //       id: 'veg002poiuytrewqasdf',
  //       name: 'Caprese Salad',
  //       description: 'Fresh mozzarella, ripe tomatoes, and basil leaves drizzled with balsamic glaze.',
  //       image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 6,
  //       basePrice: 7.99,
  //       categoryId: 'fe34c855-42ee-468e-9211-f24c003e3f8d', // Vegetarian
  //     },
  //     {
  //       id: 'classic001asdfghjklqwe',
  //       name: 'Margherita Pizza',
  //       description: 'Classic Margherita pizza with fresh tomatoes, mozzarella cheese, and basil leaves.',
  //       image: 'https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 7,
  //       basePrice: 8.99,
  //       categoryId: 'f8b1d784-4d2d-4a3b-947f-321b5c364f09', // Classic
  //     },
  //     {
  //       id: 'classic002zxcvbnmlkjhg',
  //       name: 'Spaghetti Carbonara',
  //       description: 'Classic Italian pasta with creamy egg sauce, pancetta, and Parmesan cheese.',
  //       image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 8,
  //       basePrice: 10.99,
  //       categoryId: 'f8b1d784-4d2d-4a3b-947f-321b5c364f09', // Classic
  //     },
  //     {
  //       id: 'spicy001qazwsxedcrfvtg',
  //       name: 'Spicy Chicken Wings',
  //       description: 'Crispy chicken wings tossed in a fiery hot sauce, served with blue cheese dressing.',
  //       image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 9,
  //       basePrice: 11.99,
  //       categoryId: 'ff443f25-09c3-4320-b619-bda6102445e4', // Spicy
  //     },
  //     {
  //       id: 'spicy002plokmijnuhbyg',
  //       name: 'Spicy Thai Curry',
  //       description: 'Aromatic Thai curry with coconut milk, chili, and your choice of vegetables or meat.',
  //       image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       order: 10,
  //       basePrice: 13.99,
  //       categoryId: 'ff443f25-09c3-4320-b619-bda6102445e4', // Spicy
  //     },
  //   ],
  // })

  const products = await db.product.findMany();

  // for (const product of products) {
  //   await db.size.createMany({
  //     data: [
  //       { name: "SMALL", price: product.basePrice, productId: product.id },
  //       { name: "MEDIUM", price: product.basePrice * 1.4, productId: product.id },
  //       { name: "LARGE", price: product.basePrice * 2.3, productId: product.id },
  //     ],
  //   });

  //   await db.extra.createMany({
  //     data: [
  //       { name: "CHEESE", price: 1.99, productId: product.id },
  //       { name: "PEPPER", price: 1.49, productId: product.id },
  //       { name: "TOMATO", price: 1.79, productId: product.id },
  //       { name: "BACON", price: 2.99, productId: product.id },
  //       { name: "ONION", price: 1.99, productId: product.id },
  //     ],
  //   });
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
  //     id: "cheese001qwertyuiopasd",
  //   },
  //   data: {
  //     image : 'https://plus.unsplash.com/premium_photo-1661677825991-caa232fea9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYXJvbmklMjBhbmQlMjBjaGVlc2V8ZW58MHx8MHx8fDA%3D'
  //   },
  // });
  
  // await db.product.create({
  //   data: {
  //     id: "cheese002lkjhgfdsazxcv",
  //     name: "Cheese Fondue",
  //     description:
  //       "A rich blend of melted Swiss cheeses served with bread cubes, vegetables, and apple slices for dipping.",
  //     image:
  //       "https://img.freepik.com/free-photo/close-up-melted-cheese-recipe_23-2149286847.jpg?t=st=1740925740~exp=1740929340~hmac=1d92486f6508c94fa1ccfbeb9eded2a753fb6281e368ec7c27bde62ae879ae8b&w=1060",
  //     order: 4,
  //     basePrice: 14.99,
  //     categoryId: "fd2f22ee-8165-4720-b22c-75c3ecacb536", // Cheese
  //   },
  // });

  // await db.orderProduct.create({
  //   data: {
  //     orderId: "54678huns9ucuy786d5r456",
  //     productId: "cheese002lkjhgfdsazxcv",
  //     quantity: 4,
  //   },
  // });

  // await db.order.create({
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
  //     country: "USA",
  //   },
  // });

  console.log(products);

  return (
    <div>
      <div className="container">
        <div className="why mt-12 border border-1 border-[#0a8800] rounded-md">
          <div className="resons flex justify-between items-center p-3 rounded-md bg-[#0a8800] text-white hover:opacity-80">
            <h2 className="flex justify-center items-center gap-1 text-[14px]">
              <IoShieldCheckmark size={20} /> Why Choose Us?
            </h2>
            <div className="flex justify-center items-center gap-3">
              <p className="flex justify-center items-center gap-1 text-[14px]">
                <GrSecure size={20} /> Secure privacy
              </p>
              <p className="flex justify-center items-center gap-1 text-[14px]">
                <GoCreditCard size={20} /> Safe payments
              </p>
              <p className="flex justify-center items-center gap-1 text-[14px]">
                <TbTruckDelivery size={20} /> Delivery guarantee
              </p>
            </div>
          </div>
          <div className="description">
            <p className="flex justify-start items-center gap-1 text-[#0a8800] py-[10px] px-[4px] text-[15px]">
              <IoIosNotifications size={25} className="animate-bounce" />
              Security reminder: Please be wary of scam messages and links. Temu
              won&apos;t ask for extra fees via SMS or email.
            </p>
          </div>
        </div>
        <div className="lighting animate-pulse text-white bg-gradient-to-r from-[#f5a153] to-[#d63d00] flex justify-center items-center gap-3 p-3 rounded-md mt-5">
          <div className="flex justify-center items-center gap-2">
            <BsFillLightningFill size={25} />
            <span className="font-bold text-[20px]">Lightning deals</span>
          </div>
          <div className="flex justify-center items-center gap-1 opacity-80">
            <span className="text-[14px] ">Limited time offer</span>
            <FaChevronRight size={14} />
          </div>
        </div>
      </div>
      <Hero />
      <BestSellers />
    </div>
  );
}
