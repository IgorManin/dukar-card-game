import React, { useEffect } from 'react';
import { Box as Card, Stack } from '@mui/material';
import { COMPUTER_MOVE } from '../../App';

export const Player = ({
  whoseMove,
  playerCards,
  setPlayerCards,
  cardsOnTheTable,
  setCardsOnTheTable,
  setMove,
  computerIsProtected,
  color,
}) => {
  useEffect(() => {
    if (whoseMove === COMPUTER_MOVE && cardsOnTheTable.length !== 0) {
      computerIsProtected();
    }
  }, [whoseMove]);

  const PlayerMakeMove = (el) => {
    const selectedCard = playerCards.splice(el, 1)[0];
    setPlayerCards(playerCards);
    setCardsOnTheTable([...cardsOnTheTable, selectedCard]);
    setMove(COMPUTER_MOVE);
  };
  return (
    <Stack p={1} backgroundColor="blue" direction="row" gap={1}>
      {playerCards?.map(({ suit, rank }, key) => (
        <Card
          onClick={() => PlayerMakeMove(key)}
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
          {suit} {rank}
        </Card>
      ))}
    </Stack>
  );
};
