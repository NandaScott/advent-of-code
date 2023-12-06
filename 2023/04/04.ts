const example = Bun.file('./2023/04/04.example.txt');
const input = (await example.text()).split(/\n/);

type ScratchCards = [cardNumbers: string, winningNumbers: string[]];

const serializeCards = (input: string[]): ScratchCards[] =>
  input
    .map((card) => card.match(/[\d\s\|]+/g)?.[1].trim()) // just the lotto numbers
    .map((card) => {
      if (!card) throw Error('bruh');
      const [cardNums, winningNums] = card.split('|');

      const cardNums2 = cardNums.trim().split(' ').map((num) => {
        if (num.length === 2) return num;
        return `0${num}`;
      }).join(' ');


      const wins = winningNums
        .split(' ')
        .filter((num) => !!num)
        .map((num) => {
          if (num.length === 2) return num;
          return `0${num}`;
        })


      return [cardNums2, wins]
    })

const calculateCardScore = (winningNums: string[]): number => {
  return Math.floor(Math.pow(2, winningNums.length - 1));
}

const add = (a: number, b: number) => a + b;

const copyCard = (arr: ScratchCards[], cardNumber: number) => arr[cardNumber];

const logCard = (card: number, cardNums: string, winNums: string) =>
  console.log(`Card ${card}:`, cardNums, '|', winNums);

export default function main(input: string[]) {
  const cards = serializeCards(input);

  const pileScore = cards
    .map((card) => {
      const [card1, card1Wins] = card;
      const onlyWins = card1Wins.filter((num) => card1.includes(num));
      return onlyWins
    })
    .map((wins) => calculateCardScore(wins))
    .reduce(add);

  return pileScore;
}

function main2(input: string[]) {
  const cards = serializeCards(input);
  const pileScore: ScratchCards[] = cards
    .map((card) => {
      const [card1, card1Wins] = card;
      const onlyWins = card1Wins.filter((num) => card1.includes(num));
      return [card1, onlyWins]
    })

  // const card = pileScore[1]
  // for (let i = card[1].length; i > 0; i--) {
  //   pileScore.splice(i, 0, copyCard(pileScore, i))
  // }

  // pileScore.splice(4, 0, copyCard(pileScore, 4))
  // pileScore.splice(3, 0, copyCard(pileScore, 3))
  // pileScore.splice(2, 0, copyCard(pileScore, 2))
  // pileScore.splice(1, 0, copyCard(pileScore, 1))

  return pileScore
}

const output = main2(input);
output.forEach((card, i) => logCard(i + 1, card[0], card[1].join(' ')))
