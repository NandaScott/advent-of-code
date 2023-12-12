import getInput from "../../utils/getInput";

const input = await getInput(`${process.cwd()}/11.input.txt`, true);

type GalaxyCoordinate = [y: number, x: number];

function rotateMap(input: string[], direction: 'clockwise' | 'counter-clockwise'): string[] {
  const output: string[] = [];
  for (let i = 0; i < input[0].length; i++) {
    const foo: string[] = [];
    input.forEach((l) => {
      foo.push(l[i])
    })
    if (direction === 'counter-clockwise') {
      output.unshift(foo.join(''));
      continue;
    }
    output.push(foo.reverse().join(''))
  }
  return output
}

function addRows(input: string[], rowNum: number): string[] {
  const newUniverse: string[] = [];

  for (let j = 0; j < input.length; j++) {
    const line = input[j];
    if (line.includes('#')) {
      newUniverse.push(line);
      continue;
    };
    for (let i = 0; i < rowNum; i++) {
      newUniverse.push(line);
    }
  }

  return newUniverse
}

function expandUniverse(input: string[], expandNum: number): string[] {
  const expandRows = addRows(input, expandNum);
  const rotated = rotateMap(expandRows, 'clockwise');
  const expandColumns = addRows(rotated, expandNum);
  const newMap = rotateMap(expandColumns, 'counter-clockwise'); // Bottle necks here with part 2
  return newMap
}

function getAllGalaxyCoordinates(input: string[]) {
  const output: GalaxyCoordinate[] = []
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === '#') {
        output.push([i, j]);
      }
    }
  }
  return output;
}

function getDistanceBetweenGalaxies(galaxyA: GalaxyCoordinate, galaxyB: GalaxyCoordinate): number {
  const yDiff = galaxyB[0] - galaxyA[0];
  const xDiff = Math.abs(galaxyB[1] - galaxyA[1]);

  const totalDistance = xDiff + yDiff;
  return totalDistance;
}

// part 1 done
// part 2 needs mathy solution
export default function main(input: string[], expansionMultiplier: number) {
  const newMap = expandUniverse(input, expansionMultiplier + 1);

  const galaxyCoordinates = getAllGalaxyCoordinates(newMap);

  let totalDistance = 0;

  for (let i = 0; i < galaxyCoordinates.length; i++) {
    const galaxyA = galaxyCoordinates[i];
    for (let j = i + 1; j < galaxyCoordinates.length; j++) {
      const galaxyB = galaxyCoordinates[j];
      totalDistance += getDistanceBetweenGalaxies(galaxyA, galaxyB);
    }
  }

  return totalDistance
}

console.time()
const output = main(input, 1000000);
console.log(output);
console.timeEnd()

// output.forEach(l => console.log(l))