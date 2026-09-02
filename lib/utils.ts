import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatSlugToTitle(slug: string) {
  return slug
      .split('-')
      .map(word => {
        if (word.toLowerCase() === 'and') return '&'
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(' ')
}
export function getInitials(name: string, length = 2): string {
  if (!name) return ''

  return name
      .trim()
      .split(/\s+/)          // tách theo khoảng trắng
      .slice(0, length)     // lấy 2 từ đầu
      .map(word => word[0]) // lấy chữ cái đầu
      .join('')
      .toUpperCase()
}

export function parseGithubUrl(url: string)  : {owner: string, repo: string} {
  const cleaned = url
      .replace(/^https?:\/\/github\.com\//, '')
      .replace(/\/$/, '');

  const [owner, repo] = cleaned.split('/');

  return { owner, repo };
}

export interface Star {
    id: number;
    top: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
}

export function createStars(
    count: number,
    sizeMin: number,
    sizeMax: number,
    durationMin: number,
    durationMax: number,
): Star[] {
    return Array.from({ length: count }, (_, id) => ({
        id,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * (sizeMax - sizeMin) + sizeMin,
        delay: Math.random() * 5,
        duration:
            Math.random() * (durationMax - durationMin) + durationMin,
    }));
}

export function getSpanClassName(index: number): string {
    const mobileRole = index % 3 < 2 ? 'mobile-span-small' : 'mobile-span-large';
    const desktopRole = index % 5 < 3 ? 'desktop-span-small' : 'desktop-span-large';
    return `${mobileRole} ${desktopRole}`;
}