export function getHumanReadableTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
}