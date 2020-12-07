const { input } = require('./inputs/06');

class Day6 {
  constructor(input) {
    this.input = input;
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  }

  inputProcessing(mapFunc) {
    return this.input.split('\n\n').map(mapFunc);
  }

  part1Map(group) {
    return group.replace(/(\r\n|\n|\r)/gm, '');
  }

  part2Map(group) {
    const allGroupAnswers = group.replace(/(\r\n|\n|\r)/gm, '');
    const numberOfMembers = group.split('\n').filter((val) => val !== '')
      .length;
    return {
      memberCount: numberOfMembers,
      answers: allGroupAnswers,
    };
  }

  sumOfArray(array) {
    return array.reduce((acc, val) => acc + val);
  }

  greater(a, b) {
    return a > b;
  }

  equals(a, b) {
    return a === b;
  }

  iterateOverAlphabet(
    lengthQuantifier,
    groupString,
    accumulator,
    comparisonFunc
  ) {
    return this.alphabet.forEach((letter) => {
      const count = this.countInstances(groupString, letter).length;
      if (comparisonFunc(count, lengthQuantifier)) {
        accumulator.push(letter);
      }
    });
  }

  main2() {
    const allGroupsCount = this.inputProcessing(this.part2Map).map(
      (groupAnswers) => {
        const allMembersAnswered = [];
        this.iterateOverAlphabet(
          groupAnswers.memberCount,
          groupAnswers.answers,
          allMembersAnswered,
          this.equals
        );
        return allMembersAnswered.length;
      }
    );
    const grandTotal = this.sumOfArray(allGroupsCount);
    return grandTotal;
  }

  main1() {
    const allGroupsCount = this.inputProcessing(this.part1Map).map((group) => {
      const questionsAnswered = [];
      this.iterateOverAlphabet(0, group, questionsAnswered, this.greater);
      return questionsAnswered.length;
    });
    const grandTotal = this.sumOfArray(allGroupsCount);
    return grandTotal;
  }

  countInstances(group, filter) {
    const groupArray = group.split('');
    return groupArray.filter((val) => val === filter);
  }
}

const answer1 = new Day6(input).main1(); //6726

const answer2 = new Day6(input).main2(); //3316

console.log(answer1, answer2);
