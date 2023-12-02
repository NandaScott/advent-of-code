const translator: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
}

const filterNonMatches = (match: RegExpMatchArray) => match.filter(val => val !== undefined && val !== '');

const adder = (num1: number, num2: number) => num1 + num2;

export default function main(input: string[], regex: RegExp): number {
  const numbers = input.map((str) => {
    const matches = Array.from(str.matchAll(regex), (match) => filterNonMatches(match)[0]);
    const first = matches.shift() as string;
    const last = matches.pop() as string ?? first;

    return parseInt(translator[first] + translator[last])
  });
  return numbers.reduce(adder, 0);
}