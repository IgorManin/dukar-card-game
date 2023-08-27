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
  setDeckCards,
) => {
  if (allCards) {
    const playerDrawn = allCards.slice(0, 6);
    const computerDrawn = allCards.slice(6, 12);
    const deckRemaining = allCards.slice(12);
    setPlayerCards(playerDrawn);
    setComputerCards(computerDrawn);
    setDeckCards(deckRemaining);
  }
};
