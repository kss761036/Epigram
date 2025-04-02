export function truncateText(text: string, maxLength: number = 10) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
