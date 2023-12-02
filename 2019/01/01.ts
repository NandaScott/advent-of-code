type OutputFunction = (num: number[]) => number[];

function massAlgorithm(input: number): number {
  return Math.floor(input / 3) - 2;
}

function addTogether(nums: number[]): number {
  return nums.reduce((acc, curr) => acc + curr, 0);
}

function recursivelyAddTogether(num: number): number {
  const mass = massAlgorithm(num);

  if (Math.sign(mass) === -1) return 0;

  return mass + recursivelyAddTogether(mass);
}

const puzzle1: OutputFunction = (input) => {
  return input.map((num) => massAlgorithm(num));
}

const puzzle2: OutputFunction = (input) => {
  return input.map((num) => recursivelyAddTogether(num));
}

export default function main(input: string[], processOutput: OutputFunction): number {
  const number = input.map((num) => parseInt(num));
  const processedNums = processOutput(number);
  return addTogether(processedNums);
}

export { puzzle1, puzzle2 }