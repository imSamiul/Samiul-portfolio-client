export function splitTechList(value: string): string[] {
  return value
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
}

export function joinTechList(value: string[] | string): string {
  return Array.isArray(value) ? value.join(", ") : value;
}
