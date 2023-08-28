import { Button, Container } from '@mui/material';
import { Table } from './components';
import { useState } from 'react';

const App = () => {
  const [startGame, setStartGame] = useState(false);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100vh',
        backgroundImage: 'linear-gradient(to bottom, #2196F3, #00d9d5)',
      }}
    >
      <Table startGame={startGame} />
      <Button
        onClick={() => setStartGame(true)}
        variant="contained"
        color="success"
      >
        Начать игру
      </Button>
    </Container>
  );
};

export default App;
