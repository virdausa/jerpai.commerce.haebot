import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function getFullImageUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_ERP_URL}/${path}`;
}

export const debounce = <T extends unknown[]>(
  callback: (...args: T) => unknown,
  delay: number
) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeoutTimer);

    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

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
