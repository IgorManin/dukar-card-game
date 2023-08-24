export const deckCard = [
  { rank: '6', suit: 'hearts' },
  { rank: '7', suit: 'hearts' },
  { rank: '8', suit: 'hearts' },
  { rank: '9', suit: 'hearts' },
  { rank: '10', suit: 'hearts' },
  { rank: 'J', suit: 'hearts' },
  { rank: 'Q', suit: 'hearts' },
  { rank: 'K', suit: 'hearts' },
  { rank: 'A', suit: 'hearts' },

  { rank: '6', suit: 'diamonds' },
  { rank: '7', suit: 'diamonds' },
  { rank: '8', suit: 'diamonds' },
  { rank: '9', suit: 'diamonds' },
  { rank: '10', suit: 'diamonds' },
  { rank: 'J', suit: 'diamonds' },
  { rank: 'Q', suit: 'diamonds' },
  { rank: 'K', suit: 'diamonds' },
  { rank: 'A', suit: 'diamonds' },

  { rank: '6', suit: 'clubs' },
  { rank: '7', suit: 'clubs' },
  { rank: '8', suit: 'clubs' },
  { rank: '9', suit: 'clubs' },
  { rank: '10', suit: 'clubs' },
  { rank: 'J', suit: 'clubs' },
  { rank: 'Q', suit: 'clubs' },
  { rank: 'K', suit: 'clubs' },
  { rank: 'A', suit: 'clubs' },

  { rank: '6', suit: 'spades' },
  { rank: '7', suit: 'spades' },
  { rank: '8', suit: 'spades' },
  { rank: '9', suit: 'spades' },
  { rank: '10', suit: 'spades' },
  { rank: 'J', suit: 'spades' },
  { rank: 'Q', suit: 'spades' },
  { rank: 'K', suit: 'spades' },
  { rank: 'A', suit: 'spades' },
];

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export const Deck = () => {
  const shuffledDeck = shuffleArray(deckCard);

  console.log(shuffledDeck);

  return null;
};
