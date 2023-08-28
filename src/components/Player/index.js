import React from 'react';
import { Box as Card, Container } from '@mui/material';

export const Player = ({ playerCards }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '25%',
        backgroundColor: 'blue',
        padding: '10px',
      }}
    >
      {playerCards?.map(({ suit, rank }, key) => (
        <Card
          key={key}
          sx={{
            width: '100px',
            height: '150px',
            backgroundColor: 'red',
            marginRight: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'margin 0.2s ease-in-out',
            '&:hover': {
              marginTop: '5px',
            },
          }}
        >
          {`${suit} ${rank}`}
        </Card>
      ))}
    </Container>
  );
};
