import { Box as Card, Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { COMPUTER_MOVE, PLAYERS_MOVE } from '../../App';
import { dealCards, removeCards } from '../Table';

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
  move,
  setSet,
  setIsTakeButton,
}) => {
  useEffect(() => {
    if (move === false && cardsOnTheTable.length % 2 !== 0) {
      setIsTakeButton(true);
    } else {
      setIsTakeButton(false);
    }
  }, [move, cardsOnTheTable]);

  const deckCardLength = deckCards.length;

  const takeCards = () => {
    if (whoseMove === COMPUTER_MOVE) {
      setComputerCards([...computerCards, ...cardsOnTheTable]);
      dealCards(playerCards, deckCards, setPlayerCards);
      setMove(PLAYERS_MOVE);
    } else {
      setPlayerCards([...playerCards, ...cardsOnTheTable]);
      dealCards(computerCards, deckCards, setComputerCards);
      setMove(COMPUTER_MOVE);
    }
    setCardsOnTheTable([]);
  };

  // const removeCards = () => {
  //   console.log('allCardsAreBeaten', allCardsAreBeaten);
  //   console.log('setCardsOnTheTable', setCardsOnTheTable);
  //   setAllCardsAreBeaten([...allCardsAreBeaten, ...cardsOnTheTable]);
  //   setCardsOnTheTable([]);
  //   cheackFlag();
  //
  //   if (whoseMove === COMPUTER_MOVE) {
  //     setMove(PLAYERS_MOVE);
  //   }
  //   if (whoseMove === PLAYERS_MOVE) {
  //     setSet(false);
  //     setTimeout(() => {
  //       setMove(COMPUTER_MOVE);
  //     }, 1000);
  //   }
  // };
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
              justifyContent="center"
              alignItems="center"
              marginLeft={-5}
              width={100}
              height={150}
              borderRadius={1}
              bgcolor="red"
              border={1}
            >
              <Typography variant="h3" component="h2">
                {deckCardLength}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Button
          onClick={() =>
            removeCards(
              allCardsAreBeaten,
              setAllCardsAreBeaten,
              cardsOnTheTable,
              setCardsOnTheTable,
              cheackFlag,
              whoseMove,
              setMove,
              setSet,
            )
          }
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
