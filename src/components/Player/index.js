import React, { useEffect } from 'react';
import { Box as Card, Stack } from '@mui/material';
import { COMPUTER_MOVE } from '../../App';
import { changingUserDeck } from '../Table';

export const Player = ({
  whoseMove,
  playerCards,
  setPlayerCards,
  cardsOnTheTable,
  setCardsOnTheTable,
  setMove,
  computerIsProtected,
  color,
  clickableCards,
  setClickableCards,
}) => {
  useEffect(() => {
    if (whoseMove === COMPUTER_MOVE && cardsOnTheTable.length !== 0) {
      computerIsProtected();
    }
  }, [whoseMove]);

  const PlayerMakeMove = (el, playerCards, cardOnHand) => {
    if (cardsOnTheTable.length === 0) {
      const selectedCard = playerCards.splice(el, 1)[0];
      setPlayerCards(playerCards);
      setCardsOnTheTable([...cardsOnTheTable, selectedCard]);
      setMove(COMPUTER_MOVE);
    } else {
      const playableCards = playerCards.filter((handCard) => {
        const matchingCardOnTable = cardsOnTheTable.find(
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
            return setCardsOnTheTable([...cardsOnTheTable, matchingCardInHand]);
          }
        });
      } else {
        return null;
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
          {card.suit} {card.rank}
        </Card>
      ))}
    </Stack>
  );
};
