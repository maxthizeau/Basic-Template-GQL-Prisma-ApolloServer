export function removeSpecialChar(stringToFormat: string): string {
  return stringToFormat.replace(/[^A-Z0-9]+/gi, "_")
}
