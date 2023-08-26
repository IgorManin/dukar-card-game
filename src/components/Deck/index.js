export const deckCard = [
  { spades: '6' },
  { spades: '7' },
  { spades: '8' },
  { spades: '9' },
  { spades: '10' },
  { spades: 'J' },
  { spades: 'Q' },
  { spades: 'K' },
  { spades: 'A' },

  { hearts: '6' },
  { hearts: '7' },
  { hearts: '8' },
  { hearts: '9' },
  { hearts: '10' },
  { hearts: 'J' },
  { hearts: 'Q' },
  { hearts: 'K' },
  { hearts: 'A' },

  { diamonds: '6' },
  { diamonds: '7' },
  { diamonds: '8' },
  { diamonds: '9' },
  { diamonds: '10' },
  { diamonds: 'J' },
  { diamonds: 'Q' },
  { diamonds: 'K' },
  { diamonds: 'A' },

  { clubs: '6' },
  { clubs: '7' },
  { clubs: '8' },
  { clubs: '9' },
  { clubs: '10' },
  { clubs: 'J' },
  { clubs: 'Q' },
  { clubs: 'K' },
  { clubs: 'A' },
];

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export const Deck = () => {
  const shuffledDeck = shuffleArray(deckCard);

  console.log(shuffledDeck);

  return null;
};
