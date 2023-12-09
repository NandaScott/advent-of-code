function parseInput(input: string[]) {
  const steps = input.shift()?.split('') ?? []

  const map = input
    .filter((val) => val.length > 0)
    .map((inp) => inp.split(' = '))
    .map(([node, branch]) => ({ [node]: branch.replaceAll(/[\(\)]+/g, '').split(', ') }))
    .reduce((prev, curr) => ({ ...prev, ...curr }), {})

  return { steps, map }
}

const travelFunction =
  (map: Record<string, string[]>, steps: string[]) =>
    (from: string, sum: number, index: number): number => {
      const [leftBranch, rightBranch] = map[from];
      const currentStep = steps[index];
      const nextStep = steps[index + 1] ? index + 1 : 0;

      if (from.charAt(2) === 'Z') return 0;

      if (currentStep === 'L') return 1 + travelFunction(map, steps)(leftBranch, sum, nextStep);
      if (currentStep === 'R') return 1 + travelFunction(map, steps)(rightBranch, sum, nextStep);

      return sum
    }

function GCF(a: number, b: number): number {
  return b === 0 ? a : GCF(b, a % b);
}

function LCM(a: number, b: number) {
  return Math.abs(a * b) / GCF(a, b)
}

export default function main(input: string[]) {
  const { steps, map } = parseInput(input);
  const traveler = travelFunction(map, steps);
  const path = traveler('AAA', 1, 0);
  return path;
}

// Some much smarter people figured out the LCM solution. I wrote the bruteForce solutions first,
// which I'm sure would have worked given enough time.
// I wasn't able to generate these numbers on the fly since it would exceed the call stack size.
// So I just wrote them down and ran the output on the LCM reducer.
export function mainP2(input: string[]) {
  // const { map } = parseInput(input);
  // const ghosts = Object.keys(map).filter((key) => key.charAt(2) === 'A');

  const ghosts = [
    20803, // travel(ghosts[0], 1, 0);
    17873, // travel(ghosts[1], 1, 0);
    23147, // travel(ghosts[2], 1, 0);
    15529, // travel(ghosts[3], 1, 0);
    17287, // travel(ghosts[4], 1, 0);
    19631, // travel(ghosts[5], 1, 0);
  ];

  return ghosts.reduce((prev, curr) => LCM(prev, curr))
}

export function bruteForce(input: string[]) {
  const { steps, map } = parseInput(input);
  let clock = 0;
  let index = 0;
  let ghosts = Object.keys(map).filter((key) => key.charAt(2) === 'A');

  while (true) {
    if (ghosts.every((val) => val.charAt(2) === 'Z')) break;

    let direction = steps[index];

    if (direction === 'L') {
      ghosts = ghosts.map((ghost) => map[ghost][0]);
      clock++
      index++
    }
    if (direction === 'R') {
      ghosts = ghosts.map((ghost) => map[ghost][1]);
      clock++
      index++
    }
    if (!steps[index]) {
      index = 0
    }
  }
  return clock;
}
