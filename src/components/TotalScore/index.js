import React from 'react';
import { Stack } from '@mui/material';

export const TotalScore = ({ playerScore, computerScore }) => {
  return (
    <Stack border={2}>
      <Stack> Игрок: {playerScore}</Stack>
      <Stack> Компьютер: {computerScore}</Stack>
    </Stack>
  );
};
