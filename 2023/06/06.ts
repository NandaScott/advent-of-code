
function quadraticRoots(a: number, b: number, c: number) {
  const distance = b ** 2 - 4 * a * c;
  if (distance <= 0) {
    throw new Error('Unable to solve it this way');
  }

  const squareRoot = Math.sqrt(Math.abs(distance));

  const root1 = (-b + squareRoot) / (2 * a);
  const root2 = (-b - squareRoot) / (2 * a);

  return [root1, root2];
}

function solveForMargin(time: number, distance: number) {
  const a = -1
  const b = time;
  const c = (0 - distance);

  const roots = quadraticRoots(a, b, c);

  const winStart = Math.floor(roots[0] + 1);
  const winEnd = Math.ceil(roots[1] - 1);

  const margin = winEnd - winStart + 1;

  return margin;
}

export default function main(inputFile: string[]) {
  const [times, distances] = inputFile.map((line) => line.match(/\d+/g)!.map(n => +n));

  const output: number[] = [];

  for (let i = 0; i < times.length; i++) {
    const time: number = times[i];
    const distance: number = distances[i];

    output.push(solveForMargin(time, distance))
  }

  return output.reduce((prev, curr) => prev * curr);
}

export function mainP2(inputFile: string[]) {
  const [time, distance] = inputFile.map(
    (line) => {
      const match = line.match(/\d+/g);
      if (!match) return 0;

      return parseInt(match.reduce((prev, curr) => prev + curr, ''))
    });

  return solveForMargin(time, distance);
}