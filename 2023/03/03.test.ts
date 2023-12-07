import { describe, expect, it } from 'bun:test';
import main from './03';
import getInput from '../../utils/getInput';

const exampleInput = await getInput('./2023/03/03.example.txt', true);

const input = await getInput('./2023/03/03.input.txt', true);

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
