import { Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  User,
} from "lucide-react";
import type { ElementType } from "react";

const Contact = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { contact } = home;

  const details = [
    { icon: MapPin, label: contact.location, value: contact.address },
    { icon: Mail, label: contact.emailUs, value: contact.emailValue, href: `mailto:${contact.emailValue}` },
    { icon: Phone, label: contact.callUs, value: contact.phone, href: `tel:${contact.phone.replace(/\D/g, "")}` },
    { icon: Clock, label: contact.workingHoursLabel, value: contact.workingHours },
  ];

  return (
    <section className="bg-zinc-50 py-20" id={Routes.CONTACT}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase text-primary">{contact["Don't Hesitate"]}</p>
          <h1 className="mt-2 text-4xl font-bold text-zinc-950 md:text-5xl">
            {contact.contactUs}
          </h1>
        </div>

        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-zinc-950 p-8 text-white md:p-10">
            <h2 className="text-3xl font-bold">{contact.getInTouch}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{contact.intro}</p>

            <div className="mt-8 grid gap-5">
              {details.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.label}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-zinc-300 transition hover:text-white">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-zinc-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
              <h3 className="mb-4 font-semibold">{contact.followUs}</h3>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 transition hover:bg-white/20"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-zinc-950">{contact.sendMessage}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{contact.formIntro}</p>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <ContactInput icon={User} label={contact.name} type="text" placeholder={contact.name} />
                <ContactInput icon={Mail} label={contact.email} type="email" placeholder={contact.emailValue} />
              </div>
              <ContactInput icon={MessageCircle} label={contact.subject} type="text" placeholder={contact.subject} />
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-zinc-700">
                  {contact.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder={contact.message}
                  className="w-full rounded-md border border-zinc-300 px-4 py-3 text-sm outline-none ring-primary/30 transition focus:ring-2"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 font-bold text-white transition hover:bg-primary/90"
              >
                <Send className="h-5 w-5" />
                {contact.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

function ContactInput({
  icon: Icon,
  label,
  type,
  placeholder,
}: {
  icon: ElementType;
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-zinc-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          type={type}
          required
          placeholder={placeholder}
          className="h-11 w-full rounded-md border border-zinc-300 px-4 pl-10 text-sm outline-none ring-primary/30 transition focus:ring-2"
        />
      </div>
    </div>
  );
}

export default Contact;
