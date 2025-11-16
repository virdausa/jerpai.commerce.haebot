import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatIDR(value: string) {
  const number = Number(value);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(number) ? number : 0);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
