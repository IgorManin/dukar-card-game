import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Deck } from '../Deck';
import { Computer } from '../Computer';
import { Player } from '../Player';
import { beginingGame, firstHand } from '../../common/functions/firstHand';

export const Table = ({ startGame }) => {
  const [allCards, setAllCards] = useState(null);
  const [playerCards, setPlayerCards] = useState(null);
  const [computerCards, setComputerCards] = useState(null);
  const [deckCards, setDeckCards] = useState(null);

  useEffect(() => {
    beginingGame(startGame, setAllCards);
  }, [startGame]);

  useEffect(() => {
    firstHand(allCards, setPlayerCards, setComputerCards, setDeckCards);
  }, [allCards]);

  return (
    <Box
      sx={{
        width: '90%',
        height: '80%',
        backgroundColor: 'primary.dark',
      }}
    >
      <Player playerCards={playerCards} />
      <Deck deckCards={deckCards} />
      <Computer computerCards={computerCards} />
    </Box>
  );
};
