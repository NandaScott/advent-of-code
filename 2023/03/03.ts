const example = Bun.file('./2023/03/03.input.txt');
const exampleInput = (await example.text()).split(/\n/);

const gridMap = exampleInput
  .map((val, i) => ({ [i]: val.split('') }))
  .reduce((prev, curr) => ({ ...prev, ...curr }), {})

function symbolCheck(x: number, y: number): boolean {
  const adjacent = [
    gridMap[x]?.[y + 1],      // n
    gridMap[x + 1]?.[y + 1],  // ne
    gridMap[x + 1]?.[y],      // e
    gridMap[x + 1]?.[y - 1],  // se
    gridMap[x]?.[y - 1],      // s
    gridMap[x - 1]?.[y - 1],  // sw
    gridMap[x - 1]?.[y],      // w
    gridMap[x - 1]?.[y + 1],   // nw
  ]

  for (let i = 0; i < adjacent.length; i++) {
    if (adjacent[i] && isNaN(parseInt(adjacent[i])) && adjacent[i] !== '.') {
      return true;
    }
  }

  return false;
}

const numbers: string[] = [];

function traverseMap(x: number, y: number, startNo?: string, include?: boolean) {
  let startNum = startNo ?? '';
  const currentValue = gridMap[x][y];
  if (!currentValue) { // at end of line
    if (startNum && include) {
      numbers.push(startNum);
    }
    if (!gridMap[x + 1]) return numbers;
    return traverseMap(x + 1, 0)
  }

  if (currentValue !== '.' && !isNaN(parseInt(currentValue))) {
    startNum += currentValue
    if (!include) {
      include = symbolCheck(x, y);
    }
    return traverseMap(x, y + 1, startNum, include)
  }

  if (startNum && include) {
    numbers.push(startNum);
  }

  return traverseMap(x, y + 1)
}

export default function main(input: string[]) {

  return traverseMap(0, 0);
}
