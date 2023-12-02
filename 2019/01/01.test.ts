import { describe, expect, it } from "bun:test";
import main, { puzzle1, puzzle2 } from "./01";

const puzzle = Bun.file('./2019/01/01.input.txt');
const input = (await puzzle.text()).split(/\n/);

describe.only('2019-01', () => {
  it('should solve example puzzle 1', () => {
    const output1 = main(['12'], puzzle1);
    expect(output1).toBe(2)

    const output2 = main(['14'], puzzle1);
    expect(output2).toBe(2);

    const output3 = main(['1969'], puzzle1);
    expect(output3).toBe(654);

    const output4 = main(['100756'], puzzle1);
    expect(output4).toBe(33583);
  })

  it('should solve puzzle 1', () => {
    const output = main(input, puzzle1);
    expect(output).toBe(3406527);
  })

  it('should solve example puzzle 2', () => {
    const output1 = main(['14'], puzzle2);
    expect(output1).toBe(2)

    const output2 = main(['1969'], puzzle2);
    expect(output2).toBe(966);

    const output3 = main(['100756'], puzzle2);
    expect(output3).toBe(50346);
  })

  it('should solve puzzle 2', () => {
    const output = main(input, puzzle2);
    expect(output).toBe(5106932);
  })
})