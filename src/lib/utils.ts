import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//  create a function which takes name as input slugify it add it to nanoid() and return id
export function generateItemId(name: string): string {
  const slugifiedName = slugify(name, { lower: true, strict: true });
  const nanoId = nanoid();
  return `${slugifiedName}-${nanoId}`;
}
