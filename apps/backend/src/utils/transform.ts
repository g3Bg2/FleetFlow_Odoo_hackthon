function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function convertToCamelCase<T>(obj: Record<string, unknown>): T {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return obj as T;
  }

  const result: Record<string, unknown> = {};

  for (const key in obj) {
    const camelKey = toCamelCase(key);
    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      result[camelKey] = convertToCamelCase(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      result[camelKey] = value.map((item) =>
        typeof item === "object" && item !== null
          ? convertToCamelCase(item as Record<string, unknown>)
          : item
      );
    } else {
      result[camelKey] = value;
    }
  }

  return result as T;
}

export function convertToSnakeCase<T>(obj: Record<string, unknown>): T {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return obj as T;
  }

  const result: Record<string, unknown> = {};

  for (const key in obj) {
    const snakeKey = toSnakeCase(key);
    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      if (value instanceof Date) {
        result[snakeKey] = value.toISOString();
      } else {
        result[snakeKey] = convertToSnakeCase(value as Record<string, unknown>);
      }
    } else if (Array.isArray(value)) {
      result[snakeKey] = value.map((item) =>
        typeof item === "object" && item !== null
          ? convertToSnakeCase(item as Record<string, unknown>)
          : item
      );
    } else {
      result[snakeKey] = value;
    }
  }

  return result as T;
}
