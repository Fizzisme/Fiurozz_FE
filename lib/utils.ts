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