import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id.replace(/^#/, ""));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
