export function getPercentage(value: number, valueArray: number[]) {
  const total = valueArray.reduce((acc, curr) => acc + curr, 0);

  if (total === 0 || isNaN(total)) {
    return '0%';
  }

  const percentage = Math.floor((value / total) * 100);
  return percentage + '%';
}
