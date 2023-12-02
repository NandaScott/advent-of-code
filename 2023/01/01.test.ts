import { expect, test } from 'bun:test';
import main from './01';

const digitsOnly = /\d/gm;
const digitsAndNumbers = /(?=(one|two|three|four|five|six|seven|eight|nine))|\d/gm;

test('program should solve example 1', () => {
  const output = main([
    '1abc2',
    'pqr3stu8vwx',
    'a1b2c3d4e5f',
    'treb7uchet',
  ], digitsOnly)
  expect(output).toBe(142);
})

test('program will finish puzzle 1', async () => {
  const puzzle = Bun.file('./01.input.txt');
  const input = (await puzzle.text()).split(/\n/);
  const output = main(input, digitsOnly);
  expect(output).toBe(54927);
})

test('program should solve example 2', () => {
  const output = main([
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen',
  ], digitsAndNumbers)
  expect(output).toBe(281);
})

test('program will finish puzzle 2', async () => {
  const puzzle = Bun.file('./01.input.txt');
  const input = (await puzzle.text()).split(/\n/);
  const output = main(input, digitsAndNumbers);
  expect(output).toBe(54581);
})