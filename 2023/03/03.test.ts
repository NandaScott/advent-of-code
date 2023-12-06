import { describe, expect, it } from 'bun:test';
import main from './03';

const example = Bun.file('./2023/03/03.example.txt');
const exampleInput = (await example.text()).split(/\n/);

const puzzle = Bun.file('./2023/03/03.input.txt');
const input = (await puzzle.text()).split(/\n/);

describe('2023-03', () => {
  it.todo('should solve example 1', () => {
    const output = main(exampleInput);
    // expect(output).toBe(4361);
  })

  it.todo('should solve puzzle 1', () => {
    const output = main(input);
    // expect(output).toBe(507214);
  })

  it.todo('should solve example 2', () => {

  })

  it.todo('should solve puzzle 2', () => {
  })
})
