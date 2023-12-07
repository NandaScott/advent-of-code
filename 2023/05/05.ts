export type Map = Record<'destinationStart' | 'sourceStart' | 'rangeLength', number>;

interface Almanac {
  seeds: number[],
  seedToSoil: Map[],
  soilToFertilizer: Map[],
  fertilizerToWater: Map[],
  waterToLight: Map[],
  lightToTemp: Map[],
  tempToHumidity: Map[],
  humidityToLocation: Map[],
}

function parseAlmanac(input: string): Almanac {
  const match = input.match(/:[\d\s]+/gm);
  if (!match) throw new Error('whoops');
  const parsedInput = match
    .map((val) => {
      const sanitized = val.split('\n').filter((val) => val.length > 0 && val !== ':').map((val) => val.replace(':', '').trim());

      return sanitized;
    })
  const seeds = parsedInput.shift()![0].split(' ').map((val) => parseInt(val)) ?? [];
  const seedToSoil = createMap(parsedInput.shift()!);
  const soilToFertilizer = createMap(parsedInput.shift()!);
  const fertilizerToWater = createMap(parsedInput.shift()!);
  const waterToLight = createMap(parsedInput.shift()!);
  const lightToTemp = createMap(parsedInput.shift()!);
  const tempToHumidity = createMap(parsedInput.shift()!);
  const humidityToLocation = createMap(parsedInput.shift()!);

  function createMap(preMap: string[]): Map[] {
    return preMap.map<Map>((val) => {
      const [destinationStart, sourceStart, rangeLength] = val.split(' ').map((val) => parseInt(val));

      return {
        destinationStart,
        sourceStart,
        rangeLength
      }
    })
  }

  return {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemp,
    tempToHumidity,
    humidityToLocation,
  };
}

function rangeMap(
  inputVal: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number
) {
  const relativePosition = (inputVal - inputMin) / (inputMax - inputMin);
  const scaledPosition = relativePosition * (outputMax - outputMin);
  return scaledPosition + outputMin;
}

function calculateMap(input: number, mapping: Map[]): number {
  for (let i = 0; i < mapping.length; i++) {
    const { destinationStart, sourceStart, rangeLength } = mapping[i];
    const destinationEnd = destinationStart + rangeLength;
    const sourceEnd = sourceStart + rangeLength;

    if (!(input >= sourceStart && input <= sourceEnd - 1)) continue;

    return rangeMap(
      input,
      sourceStart,
      sourceEnd,
      destinationStart,
      destinationEnd
    );
  }

  return input;
}

export default function main(input: string) {
  const {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemp,
    tempToHumidity,
    humidityToLocation,
  } = parseAlmanac(input);

  const output = seeds.map((seed) => {
    const seedsToSoil = calculateMap(seed, seedToSoil);
    const soilsToFertilizer = calculateMap(seedsToSoil, soilToFertilizer);
    const fertilizersToWater = calculateMap(soilsToFertilizer, fertilizerToWater);
    const watersToLight = calculateMap(fertilizersToWater, waterToLight);
    const lightsToTemp = calculateMap(watersToLight, lightToTemp);
    const tempsToHumidity = calculateMap(lightsToTemp, tempToHumidity);
    const humiditiesToLocation = calculateMap(tempsToHumidity, humidityToLocation);
    return humiditiesToLocation;
  });
  return Math.min(...output);
}

export function mainP2(input: string) {
  const {
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemp,
    tempToHumidity,
    humidityToLocation,
  } = parseAlmanac(input);

  let output: number = Infinity;

  const seedStarts = seeds.filter((_, i) => i % 2 === 0);
  const seedEnds = seeds.filter((_, i) => i % 2 !== 0);

  for (let j = 0; j < seedStarts.length; j++) {
    const start = seedStarts[j];
    const end = seedEnds[j]

    for (let i = start; i < start + end; i++) {
      const seed = i;
      const seedsToSoil = calculateMap(seed, seedToSoil);
      const soilsToFertilizer = calculateMap(seedsToSoil, soilToFertilizer);
      const fertilizersToWater = calculateMap(soilsToFertilizer, fertilizerToWater);
      const watersToLight = calculateMap(fertilizersToWater, waterToLight);
      const lightsToTemp = calculateMap(watersToLight, lightToTemp);
      const tempsToHumidity = calculateMap(lightsToTemp, tempToHumidity);
      const humiditiesToLocation = calculateMap(tempsToHumidity, humidityToLocation);
      if (humiditiesToLocation < output) {
        output = humiditiesToLocation;
      }
    }
  }

  return output;
}