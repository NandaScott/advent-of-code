type Opcode = number;
type Parameters = [input1: number, input2: number, output: number];

const file = Bun.file('./2019/02/02.input.txt');
const contents = await file.text();

export default class IntCodeComputer {

  public memory: number[];
  public opcode: Opcode;
  public parameters: Parameters;
  public instructionPointer: number;

  constructor(program: string) {
    const parsedProgram = program.split(',').map((num) => parseInt(num))
    this.memory = parsedProgram;
    this.instructionPointer = 0;
    this.opcode = parsedProgram[this.instructionPointer];
    this.parameters = [
      parsedProgram[this.instructionPointer + 1],
      parsedProgram[this.instructionPointer + 2],
      parsedProgram[this.instructionPointer + 3]
    ];
  }

  debugInternalState() {
    console.log({
      memory: this.memory,
      opcode: this.opcode,
      parameters: this.parameters,
      instructionPointer: this.instructionPointer
    });
  }

  run() {
    main:
    while (true) {
      this.setOpcode();
      this.setParameters();

      switch (this.opcode) {
        case 1: {
          this.handleOp1();
          this.incrementPointer();
          continue;
        }
        case 2: {
          this.handleOp2();
          this.incrementPointer();
          continue;
        }
        case 99: {
          break main;
        }
        default:
          this.checkOpcode();
      }
    }
  }

  private add(num1: number, num2: number) {
    return num1 + num2;
  }

  private multiply(num1: number, num2: number) {
    return num1 * num2;
  }

  getOutput() {
    return this.memory[0];
  }

  handleOp1() {
    const [input1, input2, outputPointer] = this.getParameters();
    const sum = this.add(input1, input2);
    this.setValueAtAddress(outputPointer, sum);
  }

  handleOp2() {
    const [input1, input2, outputPointer] = this.getParameters();
    const product = this.multiply(input1, input2);
    this.setValueAtAddress(outputPointer, product);
  }

  setOpcode() {
    this.opcode = this.memory[this.instructionPointer];
  }

  checkOpcode() {
    if (![99, 1, 2].includes(this.opcode)) {
      throw new Error(`Unknown opcode: ${this.opcode}`);
    }
  }

  setValueAtAddress(address: number, value: number) {
    this.memory[address] = value;
  }

  getParameters() {
    return this.parameters;
  }

  setParameters() {
    const input1 = this.memory[this.memory[this.instructionPointer + 1]]
    const input2 = this.memory[this.memory[this.instructionPointer + 2]]
    const outputPointer = this.memory[this.instructionPointer + 3];
    this.parameters = [input1, input2, outputPointer];
  }

  incrementPointer() {
    this.instructionPointer += 4;
  }

  printModifiedProgram() {
    return this.memory.join(',');
  }
}
