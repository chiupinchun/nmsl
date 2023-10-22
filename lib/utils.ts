import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { marked as _marked } from 'marked';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const marked = (source?: string): string => {
  if (!source) return '';
  return _marked(source.replaceAll('<', '&lt;'));
};

/**
 * 只支援過濾沒有屬性的標籤，
 * 例如editor或markdown。
 */
export const editorDataWithoutHtml = (source?: string) => {
  if (!source) return '';
  return source.replace(/<(\/)?[a-z0-9]+([^>]+)?(src="[^"]+")?([^>]+)?>/ig, '').replaceAll('<', '&gt;');
};