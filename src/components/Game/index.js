import React, { useEffect, useState } from 'react';
import { Modal } from '../../common/modal/Modal';
import { Button, Container, Stack } from '@mui/material';
import { Table } from '../Table';
import { TotalScore } from '../TotalScore';

export const PLAYERS_MOVE = 'Ход Игрока';
export const COMPUTER_MOVE = 'Ход ПК';
export const PLAYERS_WIN = 'игрок';
export const COMPUTER_WIN = 'компьютер';

export const Game = () => {
  const [startGame, setStartGame] = useState(false);
  const [whoseMove, setMove] = useState(PLAYERS_MOVE);
  const [isGameEnd, setGame] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  useEffect(() => {
    if (winner === PLAYERS_WIN) {
      setPlayerScore((prev) => prev + 1);
    }
    if (winner === COMPUTER_WIN) {
      setComputerScore((prev) => prev + 1);
    }
  }, [winner]);

  const handleEndGame = (player) => {
    setWinner(player);
    setGame(true);
    setStartGame(false);
  };

  const handleStartGame = () => {
    setGame(false);
    setStartGame(true);
  };

  return (
    <>
      <Modal
        open={isGameEnd}
        onClose={() => handleStartGame()}
        winner={winner}
      />
      <Container
        sx={{
          height: '100vh',
          backgroundImage: 'linear-gradient(to bottom, #2196F3, #00d9d5)',
        }}
      >
        <Stack height="90vh" alignItems="center" justifyContent="space-evenly">
          <Stack direction="row" width="100%" justifyContent="space-between">
            <TotalScore
              playerScore={playerScore}
              computerScore={computerScore}
            />
            <Stack p={2} bgcolor="yellow" borderRadius={1}>
              {whoseMove}
            </Stack>
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
