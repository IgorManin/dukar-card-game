import { Box as Card, Stack } from '@mui/material';
import React from 'react';

export const Deck = ({ deckCards, trumpCard, cardsOnTheTable }) => {
  return (
    <Stack
      bgcolor="blue"
      p={5}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack
        direction="row"
        p={2}
        gap={1}
        height={200}
        width="80%"
        bgcolor="green"
      >
        {cardsOnTheTable?.map(({ suit, rank }, key) => (
          <Card
            width={100}
            height={150}
            borderRadius={1}
            key={key}
            bgcolor="red"
          >
            {suit} {rank}
          </Card>
        ))}
      </Stack>
      {deckCards && (
        <Stack width={100} height={150} borderRadius={1} bgcolor="red"></Stack>
      )}
    </Stack>
  );
};
