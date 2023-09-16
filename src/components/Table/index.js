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
  const [isTakeButton, setIsTakeButton] = useState(false);

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

  const computerIsProtected = () => {
    if (cardsOnTheTable) {
      let requiredMap = [];
      const lastCardOnTable = cardsOnTheTable[cardsOnTheTable.length - 1];
      requiredMap = computerCards?.filter(
        (computerCard) =>
          computerCard.suit === lastCardOnTable.suit &&
          computerCard.rank > lastCardOnTable.rank,
      );
      if (requiredMap?.length === 0) {
        requiredMap = computerCards?.filter((computerCard) => {
          if (lastCardOnTable?.suit !== trumpCard.suit) {
            return computerCard.suit === trumpCard.suit;
          }
        });
        if (requiredMap?.length === 0) {
          setIsTakeButton(true);
          return null;
        }
      }

      const smallestCard = requiredMap?.reduce((minCard, currentCard) => {
        return currentCard.rank < minCard.rank ? currentCard : minCard;
      });
      if (smallestCard) {
        setMove('Ход Игрока');
        changePkCards(smallestCard, setComputerCards, computerCards);
        return setCardsOnTheTable([...cardsOnTheTable, smallestCard]);
      }
    }
  };

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
        computerIsProtected={computerIsProtected}
      />
      <Deck
        cardsOnTheTable={cardsOnTheTable}
        setCardsOnTheTable={setCardsOnTheTable}
        trumpCard={trumpCard}
        deckCards={deckCards}
        isTakeButton={isTakeButton}
        whoseMove={whoseMove}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        computerCards={computerCards}
        setComputerCard={setComputerCards}
      />
      <Player
        whoseMove={whoseMove}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        cardsOnTheTable={cardsOnTheTable}
        setCardsOnTheTable={setCardsOnTheTable}
        setMove={setMove}
        computerIsProtected={computerIsProtected}
      />
    </Stack>
  );
};
