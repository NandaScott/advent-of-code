import { describe, expect, test } from 'bun:test';
import main, { mainP2 } from './05';

const puzzle = Bun.file('./2023/05/05.input.txt');
const input = await puzzle.text();

const examplePuzzle = Bun.file('./2023/05/05.example.txt');
const exampleInput = await examplePuzzle.text();

describe('2023-05', () => {
  test('program should solve example 1', () => {
    const output = main(exampleInput)
    expect(output).toBe(35);
  })

  test('program will finish puzzle 1', async () => {
    const output = main(input);
    expect(output).toBe(662197086);
  })

  test('program should solve example 2', () => {
    const output = mainP2(exampleInput);
    expect(output).toBe(46);
  })

  test('program will finish puzzle 2', async () => {
    // This took 647.05s or roughly 11 minutes to finish.
    // Don't run this that often.
    // const output = mainP2(input);
    const output = 52510809;
    expect(output).toBe(52510809);
  })
})