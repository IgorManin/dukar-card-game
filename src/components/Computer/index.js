import React from 'react';
import { Box as Card, Container } from '@mui/material';

export const Computer = ({ computerCards }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        height: '25%',
        backgroundColor: 'blue',
        padding: '10px',
      }}
    >
      {computerCards?.map(({ suit, rank }, key) => (
        <Card
          key={key}
          sx={{
            width: '100px',
            height: '150px',
            backgroundColor: 'red',
            marginRight: '5px',
            borderRadius: '5px',
          }}
        >
          {`${suit} ${rank}`}
        </Card>
      ))}
    </Container>
  );
};
