import { describe, expect, test } from 'bun:test';
import main from './09';
import getInput from '../../utils/getInput';

const input = await getInput('./2023/09/09.input.txt', true);

const exampleInput = await getInput('./2023/09/09.example.txt', true);

describe('2023-09', () => {
  test('program should solve example 1', () => {
    const output = main(exampleInput, 'right')
    expect(output).toBe(114);
  })

  test('program will finish puzzle 1', async () => {
    const output = main(input, 'right');
    expect(output).toBe(1938800261);
  })

  test('program should solve example 2', () => {
    const output = main(exampleInput, 'left');
    expect(output).toBe(2);
  })

  test('program will finish puzzle 2', async () => {
    const output = main(input, 'left');
    expect(output).toBe(1112);
  })
})