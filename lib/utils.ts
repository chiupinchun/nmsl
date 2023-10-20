import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { marked as _marked } from 'marked';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const marked = (source: string): string => {
  return _marked(source.replaceAll('<', '&lt;'));
};