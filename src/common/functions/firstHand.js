import { deckCard } from '../constans/deckCards';

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

export const beginingGame = (startGame, setAllCards) => {
  if (startGame) {
    setAllCards(shuffleArray(deckCard));
  }
};

export const firstHand = (
  allCards,
  setPlayerCards,
  setComputerCards,
  setTrumpCard,
  setDeckCards,
) => {
  if (allCards) {
    setPlayerCards(allCards?.slice(0, 6));
    setComputerCards(allCards?.slice(6, 12));
    setTrumpCard(allCards[12]);
    setDeckCards(allCards?.slice(13));
  }
};
