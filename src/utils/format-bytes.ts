export function formatBytes(bytes: number): string {
  if (bytes < 0) {
    throw new Error('Size in bytes cannot be negative');
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let index = 0;
  let updatedBytes = bytes;
  while (updatedBytes >= 1024 && index < units.length - 1) {
    updatedBytes /= 1024;
    index++;
  }
  return `${updatedBytes.toFixed(2)} ${units[index]}`;
}
