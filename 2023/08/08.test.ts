import { describe, expect, test } from 'bun:test';
import main, { bruteForce, mainP2 } from './08';
import getInput from '../../utils/getInput';

const input = await getInput('./2023/08/08.input.txt', true);

const exampleInput1 = await getInput('./2023/08/08.example.p1.txt', true);
const exampleInput2 = await getInput('./2023/08/08.example.p2.txt', true);

describe('2023-08', () => {
  test('program should solve example 1', () => {
    const output = main(exampleInput1)
    expect(output).toBe(6);
  })

  test('program will finish puzzle 1', async () => {
    const output = main(input);
    expect(output).toBe(19631);
  })

  test('program should solve example 2', () => {
    const output = bruteForce(exampleInput2);
    expect(output).toBe(6);
  })

  test('program will finish puzzle 2', async () => {
    const output = mainP2(input);
    expect(output).toBe(21003205388413);
  })
})