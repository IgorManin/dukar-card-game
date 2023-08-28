import { Box, Container } from '@mui/material';
import React from 'react';

export const Deck = ({ deckCards }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '35%',
        backgroundColor: 'blue',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '80%',
          backgroundColor: 'green',
          marginRight: '25px',
        }}
      ></Box>
      <Box
        sx={{
          width: '100px',
          height: '150px',
          backgroundColor: 'red',
          marginRight: '5px',
          borderRadius: '5px',
        }}
      >
        [deckCards]
      </Box>
    </Container>
  );
};
