import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Deck } from '../Deck';
import { Player } from '../Player';
import { beginingGame, firstHand } from '../../common/functions';

const changePkCards = (smallestCard, setComputerCards, computerCards) => {
  const updatedComputerCards = computerCards.filter((item) => {
    return item !== smallestCard;
  });
  return setComputerCards(updatedComputerCards);
};

export const Table = ({ startGame, whoseMove, setMove }) => {
  const [allCards, setAllCards] = useState(null);
  const [playerCards, setPlayerCards] = useState(null);
  const [computerCards, setComputerCards] = useState(null);
  const [deckCards, setDeckCards] = useState(null);
  const [trumpCard, setTrumpCard] = useState(null);
  const [cardsOnTheTable, setCardsOnTheTable] = useState([]);

  const findMatchingCards = () => {
    if (cardsOnTheTable) {
      const lastCardOnTable = cardsOnTheTable[cardsOnTheTable.length - 1];
      const matchingCards = computerCards?.filter((computerCard) => {
        return (
          computerCard.suit === lastCardOnTable.suit &&
          computerCard.rank > lastCardOnTable.rank
        );
      });
      if (matchingCards?.length === 0) {
        return null;
      }

      const smallestCard = matchingCards?.reduce((minCard, currentCard) => {
        return currentCard.rank < minCard.rank ? currentCard : minCard;
      });
      if (smallestCard) {
        setMove('Ход Игрока');
        changePkCards(smallestCard, setComputerCards, computerCards);
        return setCardsOnTheTable([...cardsOnTheTable, smallestCard]);
      }
    }
  };

  useEffect(() => {
    beginingGame(startGame, setAllCards);
  }, [startGame]);

  useEffect(() => {
    firstHand(
      allCards,
      setPlayerCards,
      setComputerCards,
      setTrumpCard,
      setDeckCards,
    );
  }, [allCards]);

  return (
    <Stack
      justifyContent="space-between"
      width="100%"
      height="80%"
      backgroundColor="primary.dark"
    >
      <Player
        whoseMove={whoseMove}
        playerCards={computerCards}
        setPlayerCards={setComputerCards}
        cardsOnTheTable={cardsOnTheTable}
        setCardsOnTheTable={setCardsOnTheTable}
        setMove={setMove}
        findMatchingCards={findMatchingCards}
      />
      <Deck
        cardsOnTheTable={cardsOnTheTable}
        trumpCard={trumpCard}
        deckCards={deckCards}
      />
      <Player
        whoseMove={whoseMove}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        cardsOnTheTable={cardsOnTheTable}
        setCardsOnTheTable={setCardsOnTheTable}
        setMove={setMove}
        findMatchingCards={findMatchingCards}
      />
    </Stack>
  );
};
