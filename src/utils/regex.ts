const hebrewOnlyRegex = /^[\u0590-\u05FF]+$/;

export function isHebrew(text: string | undefined | null) {
  if (!text) return false;
  return hebrewOnlyRegex.test(text);
}
