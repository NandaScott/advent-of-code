const { input } = require('./inputs/02');

const validateByRegex = (min, max, char, string) => {
  const regex = new RegExp(`${char}`, 'g');
  const found = string.match(regex) || [];
  if (found.length < min) {
    return false;
  } else if (found.length > max) {
    return false;
  }
  return true;
};

const validateByPosition = (index1, index2, char, string) => {
  const i1 = index1 - 1;
  const i2 = index2 - 1;
  const charAtIndex1 = string[i1];
  const charAtIndex2 = string[i2];
  if (charAtIndex1 === char && charAtIndex2 === char) {
    return false;
  } else if (charAtIndex1 === char) {
    return true;
  } else if (charAtIndex2 === char) {
    return true;
  }
  return false;
};

const parseInput = (string) => {
  const [rules, password] = string.split(': ');
  const [minMax, char] = rules.split(' ');
  const [min, max] = minMax.split('-');
  return [parseInt(min), parseInt(max), char, password];
};

const countValidPasswordsByRegex = (inputs) => {
  let count = 0;
  inputs.forEach((val) => {
    const [min, max, char, password] = parseInput(val);
    const passwordMatchesRules = validateByRegex(min, max, char, password);
    if (passwordMatchesRules) {
      count++;
    }
  });
  return count;
};

const countValidPasswordsByPosition = (inputs) => {
  let count = 0;
  inputs.forEach((val) => {
    const [index1, index2, char, password] = parseInput(val);
    const passwordMatchesRules = validateByPosition(
      index1,
      index2,
      char,
      password
    );
    if (passwordMatchesRules) {
      count++;
    }
  });
  return count;
};

const answer1 = countValidPasswordsByRegex(input);
console.log(answer1);

const answer2 = countValidPasswordsByPosition(input);
console.log(answer2);

//13- 15 c: c q b h n c c c j s   n   c   q   c   c
//          0 1 2 3 4 5 6 7 8 9  10  11  12  13  14
//          1 2 3 4 5 6 7 8 9 10 11  12  13  14  15
//                                        ^       ^
//9 - 14 b: r b r b n b b b q d   f   r   h   t
//          0 1 2 3 4 5 6 7 8 9  10  11  12  13
//          1 2 3 4 5 6 7 8 9 10 11  12  13  14
//                          ^                ^
