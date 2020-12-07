const { input } = require('./inputs/04');

class PassportCompy {
  constructor(inputs) {
    // Parses the input string into arrays of objects,
    // where each object is a passport. { iyr: '2010', ...}
    const remapped = inputs.split('\n\n').map((val) => {
      const passports = val.replace(/(\r\n|\n|\r)/gm, ' ');
      const toArrayOfStrings = passports.split(' ');
      const toArrayOfObj = toArrayOfStrings.map((val) => {
        const [key, value] = val.split(':');
        return { [key]: value };
      });
      const passportsAsObj = toArrayOfObj.reduce(
        (r, c) => Object.assign(r, c),
        {}
      );
      return passportsAsObj;
    });
    this.inputs = remapped;
    this.validPassports = [];
  }

  _betweenRange(val, min, max) {
    if (val >= min && val <= max) {
      return true;
    }
    return false;
  }

  thoroughValidation() {
    this.inputs.forEach((passport) => {
      const allFieldsPresent = this.validateFields(passport);
      if (allFieldsPresent) {
        const validBirthYear = this.validateBirthYear(passport);
        const validIssueYear = this.validateIssueYear(passport);
        const validExpirationYear = this.validateExpirationYear(passport);
        const validHeight = this.validateHeight(passport);
        const validHairColor = this.validateHairColor(passport);
        const validEyeColor = this.validateEyeColor(passport);
        const validPassportID = this.validatePassportID(passport);
        const validationCollection = [
          validBirthYear,
          validIssueYear,
          validExpirationYear,
          validHeight,
          validHairColor,
          validEyeColor,
          validPassportID,
        ];

        const totallyValid = validationCollection.every((val) => val === true);
        if (totallyValid) {
          this.acceptPassport(passport);
        }
        return;
      }
    });
    return this;
  }

  simpleValidation() {
    this.inputs.forEach((passport) => {
      const valid = this.validateFields(passport);
      if (valid) {
        this.acceptPassport(passport);
      }
    });
    return this;
  }

  acceptPassport(passport) {
    this.validPassports.push(passport);
  }

  countValidPassports() {
    return this.validPassports.length;
  }

  validateFields(passport) {
    const requiredFields = [
      'ecl',
      'pid',
      'eyr',
      'hcl',
      'byr',
      'iyr',
      'cid',
      'hgt',
    ];
    const allFieldsFound = requiredFields.filter(
      (val) => !Object.keys(passport).includes(val)
    );
    if (allFieldsFound.length === 0) {
      return true;
    }
    if (allFieldsFound.length === 1 && allFieldsFound[0] === 'cid') {
      return true;
    }
    return false;
  }

  validateBirthYear(passport) {
    const { byr } = passport;
    if (byr.length !== 4) {
      return false;
    }
    const test = parseInt(byr);
    if (this._betweenRange(test, 1920, 2002)) {
      return true;
    }
    return false;
  }

  validateIssueYear(passport) {
    const { iyr } = passport;
    if (iyr.length !== 4) {
      return false;
    }
    const test = parseInt(iyr);
    if (this._betweenRange(test, 2010, 2020)) {
      return true;
    }
    return false;
  }

  validateExpirationYear(passport) {
    const { eyr } = passport;
    if (eyr.length !== 4) {
      return false;
    }
    const test = parseInt(eyr);
    if (this._betweenRange(test, 2020, 2030)) {
      return true;
    }
    return false;
  }

  validateHeight(passport) {
    const { hgt } = passport;
    if (hgt.includes('in')) {
      const test = parseInt(hgt.replace('in', ''));
      if (this._betweenRange(test, 59, 76)) {
        return true;
      }
      return false;
    } else if (hgt.includes('cm')) {
      const test = parseInt(hgt.replace('cm', ''));
      if (this._betweenRange(test, 150, 193)) {
        return true;
      }
      return false;
    }
    return false;
  }

  validateHairColor(passport) {
    const { hcl } = passport;
    const matched = hcl.match(/#[0-9a-f]{6}/g);
    if (matched) {
      return true;
    }
    return false;
  }

  validateEyeColor(passport) {
    const { ecl } = passport;
    const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    const test = validColors.includes(ecl);
    if (test) {
      return true;
    }
    return false;
  }

  validatePassportID(passport) {
    const { pid } = passport;
    if (pid.length === 9) {
      const test = parseInt(pid);
      if (!isNaN(test)) {
        return true;
      }
    }
    return false;
  }
}

const answer1 = new PassportCompy(input)
  .simpleValidation()
  .countValidPassports();
console.log(answer1);

const answer2 = new PassportCompy(input)
  .thoroughValidation()
  .countValidPassports();
console.log(answer2);
