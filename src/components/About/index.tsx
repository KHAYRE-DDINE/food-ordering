import { Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const images = [
  "https://img.freepik.com/free-vector/boy-eating-vegetables-isolated-illustration_18591-83848.jpg",
  "https://img.freepik.com/free-vector/surprise-gift-concept-illustration_114360-30506.jpg",
  "https://img.freepik.com/free-vector/chef-holding-tray-food_1020-664.jpg",
];

const About = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { about } = home;

  const sections = [
    {
      title: about.firstTitle,
      intro: about.firstDescriptions.beginning,
      foot: about.firstFoot,
      image: images[0],
      items: about.firstItems.map((title, index) => ({
        title,
        desc: Object.values(about.firstDescriptions).slice(1)[index],
      })),
    },
    {
      title: about.secondTitle,
      intro: about.secondDescriptions.beginning,
      foot: about.secondFoot,
      image: images[1],
      items: about.secondItems.map((title, index) => ({
        title,
        desc: Object.values(about.secondDescriptions).slice(1)[index],
      })),
    },
    {
      title: about.thirdTitle,
      intro: about.thirdDescriptions.beginning,
      foot: about.thirdFoot,
      image: images[2],
      items: about.thirdItems.map((title, index) => ({
        title,
        desc: Object.values(about.thirdDescriptions).slice(1)[index],
      })),
    },
  ];

  return (
    <section className="bg-white py-20" id={Routes.ABOUT}>
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase text-primary">{about.ourStory}</p>
          <h1 className="mt-2 text-4xl font-bold text-zinc-950 md:text-5xl">
            {about.aboutUs}
          </h1>
        </div>

        <div className="space-y-16">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 shadow-sm">
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-contain p-6 transition duration-500 hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-zinc-950">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-zinc-600">{section.intro}</p>
                <div className="mt-6 grid gap-3">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                        <div>
                          <h3 className="font-semibold text-zinc-950">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-zinc-600">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 font-semibold text-primary">{section.foot}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
