async function getInput(path: string): Promise<string>;
async function getInput(path: string, splitLines?: boolean): Promise<string[]>;
async function getInput(path: string, splitLines?: boolean) {
  const examplePuzzle = Bun.file(path);
  const exampleInput = (await examplePuzzle.text());
  if (splitLines) return exampleInput.split('\n');

  return exampleInput;
}

export default getInput;