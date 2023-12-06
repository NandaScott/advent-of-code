import { describe, expect, test } from 'bun:test';
import main from './05';

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

  test.todo('program should solve example 2', () => {

  })

  test.todo('program will finish puzzle 2', async () => {

  })
})