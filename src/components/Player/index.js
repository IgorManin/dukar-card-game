import React, { useEffect } from 'react';
import { Box as Card, Stack } from '@mui/material';
import { COMPUTER_MOVE } from '../Game';
import { changingUserDeck } from '../Table';

export const Player = ({
  whoseMove,
  playerCards,
  setPlayerCards,
  cardsOnTheTable,
  setCardsOnTheTable,
  setMove,
  computerMakeMove,
  color,
  clickableCards,
  trumpCard,
  move,
  setBitButton,
}) => {
  useEffect(() => {
    if (whoseMove === COMPUTER_MOVE) {
      computerMakeMove();
    }
  }, [whoseMove]);

  const PlayerMakeMove = (el, playerCards, cardOnHand) => {
    if (move) {
      // console.log('Человек ходит');
      if (cardsOnTheTable.length === 0) {
        const selectedCard = playerCards.splice(el, 1)[0];
        setPlayerCards(playerCards);
        setCardsOnTheTable([...cardsOnTheTable, selectedCard]);
        setMove(COMPUTER_MOVE);
        setBitButton(true);
      } else {
        const selectedMap = cardOnHand.filter((card) => {
          const matchingCardOnTable = cardsOnTheTable.find(
            (tableCard) => tableCard.rank === card.rank,
          );
          return matchingCardOnTable !== undefined;
        });
        if (selectedMap.length > 0) {
          changingUserDeck(selectedMap[0], setPlayerCards, playerCards);
          setCardsOnTheTable([...cardsOnTheTable, ...selectedMap]);
          return setMove(COMPUTER_MOVE);
        }
      }
    } else {
      // console.log('Человек бьет карту');

      const lastCardOnTable = [cardsOnTheTable[cardsOnTheTable.length - 1]];
      const playableCards = playerCards.filter((handCard) => {
        const matchingCardOnTable = lastCardOnTable.find(
          (tableCard) =>
            tableCard.suit === handCard.suit && tableCard.rank < handCard.rank,
        );

        return matchingCardOnTable !== undefined;
      });

      if (playableCards.length > 0) {
        playableCards.forEach((playableCard) => {
          const matchingCardInHand = cardOnHand.find(
            (handCard) =>
              handCard.suit === playableCard.suit &&
              handCard.rank === playableCard.rank,
          );

          if (matchingCardInHand) {
            changingUserDeck(matchingCardInHand, setPlayerCards, playerCards);
            setCardsOnTheTable([...cardsOnTheTable, matchingCardInHand]);
            return setMove(COMPUTER_MOVE);
          }
        });
      }
      const trumpPlayerCards = playerCards.filter(
        (card) => card?.suit === trumpCard?.suit,
      );
      if (trumpPlayerCards.length > 0) {
        trumpPlayerCards.forEach((playableCard) => {
          const matchingCardInHand = cardOnHand.find(
            (handCard) =>
              handCard.suit === playableCard.suit &&
              handCard.rank === playableCard.rank,
          );

          if (matchingCardInHand) {
            changingUserDeck(matchingCardInHand, setPlayerCards, playerCards);
            setTimeout(() => {
              setMove(COMPUTER_MOVE);
            }, 2000);

            return setCardsOnTheTable([...cardsOnTheTable, matchingCardInHand]);
          }
        });
      }
    }
  };

  return (
    <Stack p={1} backgroundColor="blue" direction="row" gap={1}>
      {playerCards?.map((card, key) => (
        <Card
          aria-disabled={!clickableCards}
          onClick={() => PlayerMakeMove(key, playerCards, [card])}
          width={100}
          height={150}
          borderRadius={1}
          key={key}
          bgcolor={color}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              transition: 'transform 0.5s ease',
              transform: 'translateY(-7px)',
            },
          }}
        >
          {card?.suit} {card?.rank}
        </Card>
      ))}
    </Stack>
  );
};
