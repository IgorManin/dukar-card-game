import { Button, Container, Stack } from '@mui/material';
import { Table } from './components';
import { useState } from 'react';

export const PLAYERS_MOVE = 'Ход Игрока';
export const COMPUTER_MOVE = 'Ход ПК';

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const [whoseMove, setMove] = useState(PLAYERS_MOVE);

  const handleStartGame = () => {
    setStartGame(true);
  };

  return (
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
        <Table startGame={startGame} whoseMove={whoseMove} setMove={setMove} />
        <Button onClick={handleStartGame} variant="contained" color="success">
          Начать игру
        </Button>
      </Stack>
    </Container>
  );
};

export default App;
