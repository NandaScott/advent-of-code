const { input } = require('./inputs/01');

const findTwoInputs = (inputs) => {
  const output = [];
  inputs.forEach((active) => {
    inputs.forEach((compare) => {
      if (active + compare === 2020) {
        output.push(active);
        output.push(compare);
      }
    });
  });
  return output;
};

const findThreeInputs = (inputs) => {
  const output = [];
  inputs.forEach((active) => {
    inputs.forEach((compare1) => {
      inputs.forEach((compare2) => {
        if (active + compare1 + compare2 === 2020) {
          output.push(active);
          output.push(compare1);
          output.push(compare2);
        }
      });
    });
  });
  return output;
};

const [input1, input2] = findTwoInputs(input);

const answer1 = input1 * input2;

const [input3, input4, input5] = findThreeInputs(input);

const answer2 = input3 * input4 * input5;

console.log(answer1, answer2);
