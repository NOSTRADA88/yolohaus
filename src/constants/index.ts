import axios from "axios";
import { Kit } from "../interfaces";

export const API_URL = "https://nostrada-kys.ru";
const token =
  "8cb66fdf1102d5404bef9b30ef9a471b22a7e87c9cb339d9b3ed4443540f7c518d69b854215273175db5539407b00b28e1d634d3a79253ada4b98cb795f06480863207c52cc28f4fee96e975f38c82ed0add20af151333ebd775af573a0e5fc5ae82cc690ae5002fcd9fb64098d7a7ca2da4a7c587f7ab0f3bd9f3804fe9f282";

export const axiosInstanse = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthorizationHeader = () => {
  axiosInstanse.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

setAuthorizationHeader();

export const slug = {
  main: "/",
  about: "/about",
  projects: "/projects",
  guarantee: "/guarantee",
  reviews: "/reviews",
  contact: "/contact",
  vacancies: "/vacancies",
  services: "/services",
  privacy: "/privacy-policy",
  built: "/built",
  stocks: "/stocks",
  blog: "/blog",
  mortgage: "/mortgage",
  error: "/*",
};

export const navLinks = [
  { href: slug.projects, label: "Проекты и цены" },
  { href: slug.built, label: "Построенные дома" },
  { href: slug.reviews, label: "Отзывы" },
  { href: slug.stocks, label: "Акции" },
  { href: slug.mortgage, label: "Ипотека" },
  {
    href: slug.about,
    label: "О компании",
    submenu: [
      { href: slug.blog, label: "Блог" },
      { href: slug.services, label: "Услуги" },
      { href: slug.guarantee, label: "Гарантия" },
      { href: slug.vacancies, label: "Вакансии" },
    ],
  },
  { href: slug.contact, label: "Контакты" },
];

export function formatPhoneNumber(number: string | undefined) {
  if (!number) {
    return null;
  }
  return number.replace(
    /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
    "$1 ($2) $3-$4-$5"
  );
}

export const getMinPrice = (kits: Kit[] = []): number => {
  if (!kits || kits.length === 0) {
    return 0;
  }

  const prices = kits.map((kit) =>
    Math.min(
      parsePrice(kit.basePrice),
      parsePrice(kit.standardPrice),
      parsePrice(kit.comfortPrice)
    )
  );
  return Math.min(...prices);
};

const parsePrice = (price: string | null): number => {
  return price ? parseInt(price.replace(/\D/g, ""), 10) : Infinity;
};

export const formatPrice = (price: number) => price.toLocaleString("ru-RU");

export const MAX_TERM_YEARS = 30;
export const MAX_TERM_MONTHS = 360;
