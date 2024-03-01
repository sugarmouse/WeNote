import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A function that takes in an array of class values and returns a string of concatenated class names.
 *
 * @param {ClassValue[]} inputs - An array of class values to be concatenated.
 * @return {string} - A string of concatenated class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
