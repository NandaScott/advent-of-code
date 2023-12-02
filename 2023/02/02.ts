type GameResult = [blue: number[], green: number[], red: number[]];

type GameRecord = [gameNumber: number, results: GameResult];

type FilterFunction = (game: GameRecord) => GameRecord | undefined;

type MathFunction = (games: GameRecord[]) => number

const getCubes = (game: string, regex: RegExp) =>
  Array.from(game.matchAll(regex), (match) => parseInt(match[2]))

function parseGames(arg: string[]): GameRecord[] {
  return arg.map((game, i) => {
    const gameNo = i + 1;
    const blue = getCubes(game, /((\d{1,})\sblue)/gm);
    const green = getCubes(game, /((\d{1,})\sgreen)/gm);
    const red = getCubes(game, /((\d{1,})\sred)/gm);
    return [gameNo, [blue, green, red]]
  });
}

const byMaximum: FilterFunction = (game) => {
  const [blue, green, red] = game[1];
  const MAX_BLUE = 14;
  const MAX_GREEN = 13;
  const MAX_RED = 12;

  const blueValid = blue.every((num) => num <= MAX_BLUE);
  const greenValid = green.every((num) => num <= MAX_GREEN);
  const redValid = red.every((num) => num <= MAX_RED);

  if (blueValid && greenValid && redValid) {
    return game;
  }
}

const byMinimum: FilterFunction = (game) => {
  const [blue, green, red] = game[1];
  const blueMin = [Math.max(...blue)];
  const greenMin = [Math.max(...green)];
  const redMin = [Math.max(...red)];
  game[1] = [blueMin, greenMin, redMin]
  return game;
}

const addGameIds: MathFunction = (games) => {
  return games.reduce((prev, curr) => (prev + curr[0]), 0)
}

const addPowers: MathFunction = (games) => {
  const multiplier = (a: number, b: number) => a * b;
  return games.reduce((prev, curr) => {
    const [blue, green, red] = curr[1];
    const bluePower = blue.reduce(multiplier);
    const greenPower = green.reduce(multiplier);
    const redPower = red.reduce(multiplier);
    const totalPower = bluePower * greenPower * redPower;
    return prev + totalPower;
  }, 0);
}

export default function main(input: string[], filterBy: FilterFunction, mathFunction: MathFunction): number {
  const gameRecords = parseGames(input);
  const validGames = gameRecords.filter(filterBy);
  const validGamesTotal = mathFunction(validGames);
  return validGamesTotal;
}

export { addGameIds, addPowers, byMaximum, byMinimum }