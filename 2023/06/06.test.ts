import { describe, expect, test } from 'bun:test';
import main, { mainP2 } from './06';
import getInput from '../../utils/getInput';

const input = await getInput('./2023/06/06.input.txt', true);

const exampleInput = await getInput('./2023/06/06.example.txt', true);

describe('2023-05', () => {
  test('program should solve example 1', () => {
    const output = main(exampleInput)
    expect(output).toBe(288);
  })

  test('program will finish puzzle 1', async () => {
    const output = main(input);
    expect(output).toBe(2449062);
  })

  test('program should solve example 2', () => {
    const output = mainP2(exampleInput);
    expect(output).toBe(71503);
  })

  test('program will finish puzzle 2', async () => {
    const output = mainP2(input);
    expect(output).toBe(33149631);
  })
})