import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { ArrowRightCircle, Clock, Star, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { hero } = home;

  const stats = [
    { icon: Clock, label: hero.statOne },
    { icon: Star, label: hero.statTwo },
    { icon: Utensils, label: hero.statThree },
  ];

  return (
    <section className="bg-zinc-50 py-12 md:py-16">
      <div className="container grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="md:py-10">
          <span className="inline-flex items-center rounded-md bg-primary/20 px-3 py-2 text-sm font-semibold text-zinc-900">
            {hero.badge}
          </span>
          <h1 className="mt-5 max-w-xl text-4xl font-bold leading-tight text-zinc-950 md:text-6xl">
            {hero.title}
          </h1>
          <p className="max-w-xl py-5 text-lg leading-8 text-accent">
            {hero.description}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/${Routes.MENU}`}
              className={`${buttonVariants({ size: "lg" })} !px-5 uppercase`}
            >
              {hero.orderNow}
              <ArrowRightCircle />
            </Link>
            <Link
              href={`/${locale}/${Routes.ABOUT}`}
              className="flex gap-2 font-semibold text-zinc-900 transition-colors duration-200 hover:text-primary"
            >
              {hero.learnMore}
              <ArrowRightCircle />
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <stat.icon className="mb-2 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold text-zinc-800">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden h-[420px] w-full overflow-hidden rounded-lg bg-white shadow-xl md:block">
          <Image
            src="https://img.freepik.com/free-photo/black-plate-vegetables-chicken-cutlets_114579-86324.jpg?t=st=1739714173~exp=1739717773~hmac=568f3808a890ee08770e87005cb7a54727bbcdf6ad3e27f23182cb9765f87810&w=740"
            alt="Fresh restaurant meal"
            className="object-cover"
            loading="eager"
            priority
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
