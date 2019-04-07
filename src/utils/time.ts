export function getHumanReadableTimestamp(timestamp: string): string {
  return new Date(timestamp)
    .toLocaleString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
}