import { Languages } from "@/constants/enums";
import { LanguageType } from "@/i18n.config";
import { Translations } from "@/types/translations";

export const defaultMenuTranslation: Translations["menu"] = {
  title: "Choose Your Meal",
  subtitle: "Enjoy with it",
  searchMenu: "Search menu",
  searchPlaceholder: "Search by name or keyword...",
  filterByCategory: "Filter by Category",
  dietaryOptions: "Dietary Options",
  allCategories: "All Categories",
  addToCart: "Add To Cart",
  pickYourSize: "Pick your size",
  anyExtra: "Any Extra?",
  inCart: "in cart",
  remove: "Remove",
  numberOfOrders: "Number of Orders:",
  productNotFound: "Product not found",
  errorLoadingProduct: "Error loading product. Please try again later.",
};

const categoryLabels: Record<string, string> = {
  Classic: "كلاسيكي",
  Vegetarian: "نباتي",
  Meat: "لحوم",
  Cheese: "جبن",
  Spicy: "حار",
};

const extraLabels: Record<string, string> = {
  CHEESE: "جبن",
  BACON: "لحم مقدد",
  TOMATO: "طماطم",
  ONION: "بصل",
  PEPPER: "فلفل",
};

const productLabels: Record<string, { name: string; description: string }> = {
  classic001asdfghjklqwe: {
    name: "بيتزا مارغريتا",
    description: "بيتزا مارغريتا كلاسيكية بالطماطم الطازجة وجبن الموزاريلا وأوراق الريحان.",
  },
  classic002zxcvbnmlkjhg: {
    name: "سباغيتي كاربونارا",
    description: "معكرونة إيطالية كلاسيكية بصلصة كريمية وجبن بارميزان.",
  },
  veg001mnbvcxzlkjhgfds: {
    name: "بيتزا الخضار",
    description: "بيتزا مليئة بالخضار الطازجة: الفلفل والزيتون والفطر والبصل.",
  },
  veg002poiuytrewqasdf: {
    name: "سلطة كابريزي",
    description: "موزاريلا طازجة وطماطم ناضجة وأوراق ريحان مع صلصة بلسمية.",
  },
  meat001qazxswedcvfrtgb: {
    name: "شاورما دجاج مشوي",
    description: "دجاج مشوي متبل بتوابل شرقية، يقدم في خبز دافئ مع صلصة الثوم والخضار.",
  },
  meat002ae79fc8oijnebcybo: {
    name: "طبق كباب لحم",
    description: "أسياخ لحم طرية مشوية بإتقان، تقدم مع أرز وخضار مشوية وحمص.",
  },
  meat003768oinjbvcxsr45678: {
    name: "برياني لحم الغنم",
    description: "أرز بسمتي عطري مطهو مع قطع لحم غنم طرية وتوابل مميزة.",
  },
  meat004a9kf9e0k687siahcunt: {
    name: "دجاج تيكا ماسالا",
    description: "قطع دجاج طرية في صلصة كريمية بالطماطم والتوابل، تقدم مع خبز نان.",
  },
  meat005qazxsw7568agidun: {
    name: "كفتة لحم بالكاري",
    description: "كرات لحم متبلة مطهوة في صلصة كاري غنية، تقدم مع أرز مطهو على البخار.",
  },
  cheese001qwertyuiopasd: {
    name: "ماك آند تشيز بأربعة أجبان",
    description: "معكرونة كريمية مخبوزة بمزيج من الشيدر والموزاريلا والبارميزان والجودا.",
  },
  cheese002lkjhgfdsazxcv: {
    name: "فوندو الجبن",
    description: "مزيج غني من الجبن الذائب يقدم مع قطع الخبز والخضار وشرائح التفاح.",
  },
  spicy001qazwsxedcrfvtg: {
    name: "أجنحة دجاج حارة",
    description: "أجنحة دجاج مقرمشة بصلصة حارة، تقدم مع صلصة الجبن الأزرق.",
  },
  spicy002plokmijnuhbyg: {
    name: "كاري تايلندي حار",
    description: "كاري تايلندي عطري بحليب جوز الهند والفلفل الحار مع الخضار أو اللحم.",
  },
};

const productImages: Record<string, string> = {
  classic001asdfghjklqwe: "/assets/images/menu/margherita-pizza.jpg",
  classic002zxcvbnmlkjhg: "/assets/images/menu/spaghetti-carbonara.jpg",
  veg001mnbvcxzlkjhgfds: "/assets/images/menu/veggie-supreme-pizza.jpg",
  veg002poiuytrewqasdf: "/assets/images/menu/caprese-salad.jpg",
  meat001qazxswedcvfrtgb: "/assets/images/menu/grilled-chicken-shawarma.jpg",
  meat002ae79fc8oijnebcybo: "/assets/images/menu/beef-kebab-platter.jpg",
  meat003768oinjbvcxsr45678: "/assets/images/menu/lamb-biryani.jpg",
  meat004a9kf9e0k687siahcunt: "/assets/images/menu/chicken-tikka-masala.jpg",
  meat005qazxsw7568agidun: "/assets/images/menu/beef-kofta-curry.jpg",
  cheese001qwertyuiopasd: "/assets/images/menu/four-cheese-mac.jpg",
  cheese002lkjhgfdsazxcv: "/assets/images/menu/cheese-fondue.jpg",
  spicy001qazwsxedcrfvtg: "/assets/images/menu/spicy-chicken-wings.jpg",
  spicy002plokmijnuhbyg: "/assets/images/menu/spicy-thai-curry.jpg",
};

export const localizeCategoryName = (name: string, locale?: string) =>
  locale === Languages.ARABIC ? categoryLabels[name] ?? name : name;

export const localizeExtraName = (name: string, locale?: string) =>
  locale === Languages.ARABIC ? extraLabels[name.toUpperCase()] ?? name : name;

export const localizeProduct = <T extends { id: string; name: string; description: string }>(
  product: T,
  locale: LanguageType
): T => {
  const image = productImages[product.id];

  if (locale !== Languages.ARABIC) {
    return image ? { ...product, image } : product;
  }

  const localized = productLabels[product.id];
  return { ...product, ...(localized ?? {}), ...(image ? { image } : {}) };
};
