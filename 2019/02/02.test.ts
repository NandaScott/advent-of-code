import { describe, expect, it } from "bun:test";
import IntCodeComputer from "./02";

const puzzle = Bun.file('./2019/02/02.input.txt');
const input = await puzzle.text();

describe('2019-02', () => {

  it('should solve example puzzle 1', () => {
    const computer1 = new IntCodeComputer('1,0,0,0,99');
    computer1.run();
    const output1 = computer1.printModifiedProgram();
    expect(output1).toEqual('2,0,0,0,99');

    const computer2 = new IntCodeComputer('2,3,0,3,99');
    computer2.run();
    const output2 = computer2.printModifiedProgram();
    expect(output2).toEqual('2,3,0,6,99');

    const computer3 = new IntCodeComputer('2,4,4,5,99,0');
    computer3.run();
    const output3 = computer3.printModifiedProgram();
    expect(output3).toEqual('2,4,4,5,99,9801');

    const computer4 = new IntCodeComputer('1,1,1,4,99,5,6,0,99');
    computer4.run();
    const output4 = computer4.printModifiedProgram();
    expect(output4).toEqual('30,1,1,4,2,5,6,0,99');
  })

  it('should solve puzzle 1', () => {
    const computer = new IntCodeComputer(input);
    computer.setValueAtAddress(1, 12);
    computer.setValueAtAddress(2, 2);
    computer.run();
    const output = computer.getOutput();
    expect(output).toBe(3224742);
  })

  it('should solve puzzle 2', () => {
    function generatePermutations(): number[][] {
      let permutations = [];
      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
          permutations.push([i, j]);
        }
      }
      return permutations;
    }

    const permutations = generatePermutations();

    for (let i = 0; i < permutations.length; i++) {
      const [noun, verb] = permutations[i];
      const computer = new IntCodeComputer(input);
      computer.setValueAtAddress(1, noun);
      computer.setValueAtAddress(2, verb);
      computer.run();
      const output = computer.getOutput();
      if (output === 19690720) {
        expect((100 * noun) + verb).toBe(7960);
        break;
      }
    }
  })
})