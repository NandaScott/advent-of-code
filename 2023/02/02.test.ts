import { describe, expect, it } from 'bun:test';
import main, { addGameIds, byMaximum, byMinimum, addPowers } from './02';
import getInput from '../../utils/getInput';

const exampleInput = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
]

const input = await getInput('./2023/02/02.input.txt', true);

describe('2023-02', () => {
  it('should solve example 1', () => {
    const output = main(exampleInput, byMaximum, addGameIds);
    expect(output).toBe(8);
  })

  it('should solve puzzle 1', () => {
    const output = main(input, byMaximum, addGameIds);
    expect(output).toBe(2006);
  })

  it('should solve example 2', () => {
    const output = main(exampleInput, byMinimum, addPowers);
    expect(output).toBe(2286);
  })

  it('should solve puzzle 2', () => {
    const output = main(input, byMinimum, addPowers);
    expect(output).toBe(84911);
  })
})
