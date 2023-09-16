import { Box as Card, Button, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { COMPUTER_MOVE, PLAYERS_MOVE } from '../../App';

const dealCards = (playersCards, deckCards, setPlayerCards) => {
  const count = 6;
  if (playersCards.length < 6) {
    const difference = Math.abs(count - playersCards?.length);
    const receivedCards = deckCards?.splice(0, difference);
    setPlayerCards([...playersCards, ...receivedCards]);
  }
};

export const Deck = ({
  deckCards,
  trumpCard,
  cardsOnTheTable,
  setCardsOnTheTable,
  isTakeButton,
  whoseMove,
  setMove,
  playerCards,
  setPlayerCards,
  computerCards,
  setComputerCards,
  allCardsAreBeaten,
  setAllCardsAreBeaten,
  cheackFlag,
  flag,
}) => {
  useEffect(() => {
    dealCards(computerCards, deckCards, setComputerCards);
    dealCards(playerCards, deckCards, setPlayerCards);
  }, [flag]);

  const takeCards = () => {
    if (whoseMove === COMPUTER_MOVE) {
      setComputerCards([...computerCards, ...cardsOnTheTable]);
      setMove(PLAYERS_MOVE);
    } else {
      setPlayerCards([...playerCards, ...cardsOnTheTable]);
      setMove(PLAYERS_MOVE);
    }
    setCardsOnTheTable([]);
    cheackFlag();
  };

  const removeCards = () => {
    setAllCardsAreBeaten([...allCardsAreBeaten, ...cardsOnTheTable]);
    setCardsOnTheTable([]);
    if (whoseMove === COMPUTER_MOVE) {
      setMove(PLAYERS_MOVE);
    }
    if (whoseMove === PLAYERS_MOVE) {
      setMove(COMPUTER_MOVE);
    }
    cheackFlag();
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
        <Button
          onClick={removeCards}
          variant="contained"
          color="success"
          size="medium"
          sx={{
            marginBottom: '5px',
          }}
        >
          Бита
        </Button>
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
