import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSlug(slug: string): string {
  if (!slug) return '';
  const specialCases: Record<string, string> = {
    'cse': 'CSE',
    'it': 'IT',
    'ece': 'ECE',
    'me': 'ME',
    'ce': 'CE',
    'ee': 'EE',
    'mtech': 'M.Tech',
    'btech': 'B.Tech',
    'bca': 'BCA',
    'mca': 'MCA',
    'bba': 'BBA',
    'mba': 'MBA',
    'bsc': 'B.Sc',
    'msc': 'M.Sc',
    'bcom': 'B.Com',
    'mcom': 'M.Com',
  };

  if (specialCases[slug.toLowerCase()]) {
    return specialCases[slug.toLowerCase()];
  }

  // Handle standard "word-word" slugs via simple capitalization
  return slug
    .split('-')
    .map((word) => specialCases[word.toLowerCase()] || (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join(' ');
}
