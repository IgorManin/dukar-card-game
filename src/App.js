import { Button, Container, Stack } from '@mui/material';
import { Table } from './components';
import React, { useState } from 'react';
import { Modal } from './common/modal/Modal';

export const PLAYERS_MOVE = 'Ход Игрока';
export const COMPUTER_MOVE = 'Ход ПК';
export const PLAYERS_WIN = 'игрок';
export const COMPUTER_WIN = 'компьютер';

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const [whoseMove, setMove] = useState(PLAYERS_MOVE);
  const [isGameEnd, setGame] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleEndGame = (player) => {
    setGame(true);
    setWinner(player);
  };

  const handleStartGame = () => {
    setStartGame(true);
    setGame(false);
  };

  return (
    <>
      <Modal open={isGameEnd} onClose={() => setGame(false)} winner={winner} />
      <Container
        sx={{
          height: '100vh',
          backgroundImage: 'linear-gradient(to bottom, #2196F3, #00d9d5)',
        }}
      >
        <Stack height="90vh" alignItems="center" justifyContent="space-evenly">
          <Stack p={2} bgcolor="yellow" borderRadius={1}>
            {whoseMove}
          </Stack>
          <Table
            startGame={startGame}
            whoseMove={whoseMove}
            setMove={setMove}
            handleEndGame={handleEndGame}
          />
          <Button onClick={handleStartGame} variant="contained" color="success">
            Начать игру
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default App;
