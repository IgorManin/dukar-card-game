import React from 'react';
import { Box } from '@mui/material';
import { Deck } from '../Deck';
import { Computer } from '../Computer';
import { Player } from '../Player';

export const Table = () => {
  return (
    <Box
      sx={{
        width: '90%',
        height: '80%',
        backgroundColor: 'primary.dark',
      }}
    >
      <Player />
      <Deck />
      <Computer />
    </Box>
  );
};
