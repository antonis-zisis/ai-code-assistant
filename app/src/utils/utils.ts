export function parseResponse(
  response: string,
): Array<{ type: 'code' | 'text'; content: string }> {
  const parts = response.split(/```/);
  return parts.map((part, index) => ({
    type: index % 2 === 1 ? 'code' : 'text',
    content: part.trim(),
  }));
}
