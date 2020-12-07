const { input } = require('./inputs/03');

class OverengineeringTheSolution {
  constructor(input, overInc, downInc) {
    this.input = input;
    this.over = 0;
    this.down = 0;
    this.overInc = overInc;
    this.downInc = downInc;
    this.collector = [];
  }

  main() {
    while (true) {
      try {
        this.moveOver();
        this.moveDown();
        const location = this.getCurrentLocation();
        this.pushToCollector(location);
      } catch (e) {
        if (e.message === 'Cannot move down more.') {
          break;
        } else if (e.message === 'Cannot move over more.') {
          this.wrap();
          this.pushToCollector(this.getCurrentLocation());
        }
      }
    }
    return this;
  }

  moveOver() {
    this.over = this.over + this.overInc;
  }

  moveDown() {
    this.down = this.down + this.downInc;
  }

  wrap() {
    this.over = this.over - this.input[this.down].length;
  }

  pushToCollector(item) {
    this.collector.push(item);
  }

  numberOfTrees() {
    const collectorCopy = this.collector;
    const treesOnly = collectorCopy.filter((val) => val === '#');
    return treesOnly.length;
  }

  getCurrentLocation() {
    const down = this.input[this.down];
    if (!down) {
      throw new RangeError('Cannot move down more.');
    }
    const over = down[this.over];
    if (!over) {
      throw new RangeError('Cannot move over more.');
    }
    return over;
  }
}

const answer1 = new OverengineeringTheSolution(input, 3, 1)
  .main()
  .numberOfTrees();
const varaint1 = new OverengineeringTheSolution(input, 1, 1)
  .main()
  .numberOfTrees();
const variant2 = new OverengineeringTheSolution(input, 5, 1)
  .main()
  .numberOfTrees();
const varaint3 = new OverengineeringTheSolution(input, 7, 1)
  .main()
  .numberOfTrees();
const variant4 = new OverengineeringTheSolution(input, 1, 2)
  .main()
  .numberOfTrees();

const answer2 = answer1 * varaint1 * variant2 * varaint3 * variant4;

console.log(answer1, answer2);
