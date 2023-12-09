function getDifferences(arr: number[]): number[] {
  const reversed = arr;
  const out = [];
  for (let i = 0; i < reversed.length; i++) {
    const current = reversed[i];
    const next = reversed[i + 1];
    out.push(next - current)
  }
  return out.filter((num) => !isNaN(num));
}

function predictNextValue(input: number[], direction: 'right' | 'left') {
  if (input.every((val) => val === 0)) return [...input, 0];

  const diffs = getDifferences(input);

  const values = predictNextValue(diffs, direction);
  const unreversed = direction === 'left' ? input : input.reverse();
  const lastVal = values[0];
  const nextVal: number = direction === 'left' ? unreversed[0] - lastVal : unreversed[0] + lastVal;

  return [nextVal, ...input];
}

export default function main(input: string[], direction: 'right' | 'left') {
  const inp = input
    .map((val) => val.split(' ').map(n => +n))
    .map((nums) => predictNextValue(nums, direction))
    .map(nums => nums[0])
    .reduce((a, b) => a + b);

  return inp
}
