import { Box as Card, Button, Stack } from '@mui/material';
import React from 'react';

export const Deck = ({
  deckCards,
  trumpCard,
  cardsOnTheTable,
  setCardsOnTheTable,
  isTakeButton,
  whoseMove,
  playerCards,
  setPlayerCards,
  computerCards,
  setComputerCard,
}) => {
  const takeCards = () => {
    if (whoseMove === 'Ход ПК') {
      setComputerCard([...computerCards, ...cardsOnTheTable]);
    } else {
      setPlayerCards([...playerCards, ...cardsOnTheTable]);
    }
    setCardsOnTheTable([]);
  };

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
      <Stack direction="column" marginLeft={1}>
        <Stack direction="row" marginBottom={1}>
          {trumpCard && (
            <Stack
              width={100}
              height={150}
              borderRadius={1}
              bgcolor="red"
              border={1}
            >
              {trumpCard.suit} {trumpCard.rank}
            </Stack>
          )}
          {deckCards && (
            <Stack
              marginLeft={-5}
              width={100}
              height={150}
              borderRadius={1}
              bgcolor="red"
              border={1}
            />
          )}
        </Stack>
        {isTakeButton && (
          <Button
            onClick={takeCards}
            variant="contained"
            color="success"
            size="medium"
          >
            Нечем бить
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
