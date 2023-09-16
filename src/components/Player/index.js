import React, { useEffect } from 'react';
import { Box as Card, Stack } from '@mui/material';

export const Player = ({
  whoseMove,
  playerCards,
  setPlayerCards,
  cardsOnTheTable,
  setCardsOnTheTable,
  setMove,
  computerIsProtected,
}) => {
  useEffect(() => {
    if (whoseMove === 'Ход ПК') {
      computerIsProtected();
    }
  }, [whoseMove]);
  const MakeMove = (el) => {
    const selectedCard = playerCards.splice(el, 1)[0];
    setPlayerCards(playerCards);
    setCardsOnTheTable([...cardsOnTheTable, selectedCard]);
    setMove('Ход ПК');
  };
  return (
    <Stack p={1} backgroundColor="blue" direction="row" gap={1}>
      {playerCards?.map(({ suit, rank }, key) => (
        <Card
          onClick={() => MakeMove(key)}
          width={100}
          height={150}
          borderRadius={1}
          key={key}
          bgcolor="red"
          sx={{
            cursor: 'pointer',
            '&:hover': {
              transition: 'transform 0.5s ease',
              transform: 'translateY(-7px)',
            },
          }}
        >
          {suit} {rank}
        </Card>
      ))}
    </Stack>
  );
};
