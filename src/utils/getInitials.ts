/**
 * Utility to extract initials from a name string.
 * Trims the input, splits by whitespace, and takes the first character of the first two words.
 * @param name The full name to get initials from.
 * @returns A string containing up to 2 uppercase initials.
 */
export function getInitials(name: string): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
