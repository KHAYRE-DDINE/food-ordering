import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
];

const Specials = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { specials } = home;

  return (
    <section className="bg-zinc-50 py-16">
      <div className="container">
        <h2 className="mb-10 text-center text-3xl font-bold text-zinc-950 md:text-4xl">
          {specials.title}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specials.items.map((offer, index) => (
            <div
              key={offer.code}
              className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <Image
                  src={images[index]}
                  alt={offer.title}
                  width={400}
                  height={192}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  priority={index < 2}
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-zinc-950">{offer.title}</h3>
                <p className="mb-4 text-gray-600">{offer.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-md bg-accent px-3 py-1 text-sm font-bold text-white">
                    {offer.code}
                  </span>
                  <button className="font-medium text-primary hover:underline">
                    {specials.orderNow}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specials;
