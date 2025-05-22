/**
 * Generates a simple unique ID
 * This is a basic implementation and not as robust as the uuid library,
 * but it's sufficient for most use cases in this application
 */
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36)
  );
}
