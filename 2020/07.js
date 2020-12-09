const { input } = require('./inputs/07');

const example = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

class Day7 {
  constructor(input) {
    this.input = this.processInput(input);
    this.parentBags = [];
  }

  /**
   * Transforms the input into an object, where each key
   * is the name of the rule, and the values are the other bags
   * in that rule.
   * { 'bright bronze bag': 'wavy blue bag, clear violet bag' ...}
   * @param {string} input the puzzle input;
   */
  processInput(input) {
    return input
      .split('\n')
      .map((rule) => {
        const bags = rule.match(/([a-zA-Z]+\s[A-Za-z]+)\sbag/g);
        const parent = bags[0];
        const children = bags.splice(1).join(', ');
        return { [parent]: children };
      })
      .reduce((obj, item) => {
        const ruleName = Object.keys(item)[0];
        return (obj[ruleName] = item[ruleName]), obj;
      }, {});
  }

  main(target) {
    let successes = 0;
    Object.keys(this.input).forEach((rule) => {
      const result = this.recursivelyGetBagChildren(target, rule);
      if (result) {
        this.parentBags.push(rule);
        successes++;
      }
    });
    return successes;
  }

  recursivelyGetBagChildren(target, bagRule) {
    const ruleChildren = this.input[bagRule];
    if (ruleChildren.includes('no other bag')) return false;
    if (ruleChildren.includes(target)) return true;

    const subBags = ruleChildren.split(', ');
    for (let i = 0; i < subBags.length; i++) {
      const bag = subBags[i];
      const subRuleChildren = this.recursivelyGetBagChildren(target, bag);
      if (subRuleChildren) {
        return true;
      }
    }
  }
}

const answer1 = new Day7(input);
console.log(answer1.main('shiny gold'));
