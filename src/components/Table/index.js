import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Deck } from '../Deck';
import { Player } from '../Player';
import { beginingGame, firstHand } from '../../common/functions';
import {
  COMPUTER_MOVE,
  COMPUTER_WIN,
  PLAYERS_MOVE,
  PLAYERS_WIN,
} from '../../App';

const colors = ['red', 'purple'];

export const changingUserDeck = (selectedMap, setUserDeck, userDeck) => {
  const updatedComputerCards = userDeck.filter((item) => {
    return item !== selectedMap;
  });
  return setUserDeck(updatedComputerCards);
};

export const dealCards = (playersCards, deckCards, setPlayerCards) => {
  const count = 6;
  if (playersCards.length < 6) {
    const difference = Math.abs(count - playersCards?.length);
    const receivedCards = deckCards?.splice(0, difference);
    setPlayerCards([...playersCards, ...receivedCards]);
  }
};

export const removeCards = (
  allCardsAreBeaten,
  setAllCardsAreBeaten,
  cardsOnTheTable,
  setCardsOnTheTable,
  cheackFlag,
  whoseMove,
  setMove,
  setSet,
  setBitButton,
) => {
  setAllCardsAreBeaten([...allCardsAreBeaten, ...cardsOnTheTable]);
  setCardsOnTheTable([]);
  if (whoseMove === COMPUTER_MOVE) {
    setMove(PLAYERS_MOVE);
  }
  if (whoseMove === PLAYERS_MOVE) {
    setSet(false);
    setBitButton(false);
    setTimeout(() => {
      setMove(COMPUTER_MOVE);
    }, 1000);
  }
};

export const Table = ({ startGame, whoseMove, setMove, handleEndGame }) => {
  const [allCards, setAllCards] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [deckCards, setDeckCards] = useState([]);
  const [trumpCard, setTrumpCard] = useState([]);
  const [cardsOnTheTable, setCardsOnTheTable] = useState([]);
  const [isTakeButton, setIsTakeButton] = useState(false);
  const [allCardsAreBeaten, setAllCardsAreBeaten] = useState([]);
  const [clickableCards, setClickableCards] = useState([]);
  const [move, setSet] = useState(true);
  const [isBitButton, setBitButton] = useState(false);

  const endGame = () => {
    if (deckCards.length === 0 && allCardsAreBeaten.length > 0) {
      if (
        playerCards.length === 0 &&
        playerCards.length < computerCards.length
      ) {
        handleEndGame(PLAYERS_WIN);
      }
      if (
        computerCards.length === 0 &&
        computerCards.length < playerCards.length
      ) {
        handleEndGame(COMPUTER_WIN);
      }
    }
  };

  endGame();

  const suitValues = {
    suit: trumpCard?.suit,
  };

  const lastCard = () => {
    if (trumpCard?.rank && deckCards.length === 0) {
      if (playerCards.length > computerCards.length) {
        setComputerCards([...computerCards, trumpCard]);
        setTrumpCard(suitValues);
      } else {
        setPlayerCards([...playerCards, trumpCard]);
        setTrumpCard(suitValues);
      }
    }
  };

  useEffect(() => {
    beginingGame(startGame, setAllCards);
  }, [startGame]);

  useEffect(() => {
    firstHand(
      allCards,
      setPlayerCards,
      setComputerCards,
      setTrumpCard,
      setDeckCards,
    );
  }, [allCards]);

  useEffect(() => {
    dealCards(computerCards, deckCards, setComputerCards);
    dealCards(playerCards, deckCards, setPlayerCards);
    lastCard();
  }, [move]);

  const computerMakeMove = () => {
    if (move) {
      // console.log('Комп бьет карту');
      let requiredMap = [];
      const lastCardOnTable = cardsOnTheTable[cardsOnTheTable.length - 1];
      requiredMap = computerCards?.filter(
        (computerCard) =>
          computerCard.suit === lastCardOnTable.suit &&
          computerCard.rank > lastCardOnTable.rank,
      );
      if (requiredMap?.length === 0) {
        requiredMap = computerCards?.filter((computerCard) => {
          if (lastCardOnTable?.suit !== trumpCard.suit) {
            return computerCard.suit === trumpCard.suit;
          }
        });
        if (requiredMap?.length === 0) {
          setIsTakeButton(true);
          return null;
        }
      }
      const smallestCard = requiredMap?.reduce((minCard, currentCard) => {
        return currentCard.rank < minCard.rank ? currentCard : minCard;
      });
      if (smallestCard) {
        changingUserDeck(smallestCard, setComputerCards, computerCards);
        setMove(PLAYERS_MOVE);
        return setCardsOnTheTable([...cardsOnTheTable, smallestCard]);
      }
    } else {
      // console.log('Комп ходит');
      if (cardsOnTheTable.length === 0) {
        setBitButton(false);
        let result = [];
        // Создаем массив, содержащий только карты, у которых масть не совпадает с козырной
        const nonTrumpCards = computerCards?.filter(
          (card) => card?.suit !== trumpCard?.suit,
        );
        if (nonTrumpCards.length === 0) {
          // Если нет карт, у которых масть не совпадает с козырной, выбираем карту с наименьшим рангом из всех
          const selectedCard = computerCards.reduce(
            (minCard, card) => (card.rank < minCard.rank ? card : minCard),
            computerCards[0],
          );

          result.push(selectedCard);
        } else {
          // Иначе выбираем карту с наименьшим рангом из карт, у которых масть не совпадает с козырной
          const selectedCard = nonTrumpCards.reduce(
            (minCard, card) => (card.rank < minCard.rank ? card : minCard),
            nonTrumpCards[0],
          );
          result.push(selectedCard);
        }
        changingUserDeck(result[0], setComputerCards, computerCards);
        setMove(PLAYERS_MOVE);
        return setCardsOnTheTable([...cardsOnTheTable, ...result]);
      } else {
        setBitButton(false);
        let rezult = [];
        const filteredCards = [...computerCards];

        // Получаем все уровни rank из cardsOnTheTable.
        const targetRanks = cardsOnTheTable.map((card) => card.rank);

        // Получаем suit из trumpCard.
        const trumpSuit = trumpCard?.suit;

        // Фильтруем массив filteredCards по заданным условиям.
        const resultCard = filteredCards.filter((card) => {
          return targetRanks.includes(card.rank) && card.suit !== trumpSuit;
        });
        const minRankCard = resultCard.reduce((minCard, currentCard) => {
          return currentCard.rank < minCard.rank ? currentCard : minCard;
        }, resultCard[0]);
        if (minRankCard) {
          rezult.push(minRankCard);
          changingUserDeck(rezult[0], setComputerCards, computerCards);
          setCardsOnTheTable([...cardsOnTheTable, ...rezult]);
          return setMove(PLAYERS_MOVE);
        } else {
          setMove(PLAYERS_MOVE);
          setSet(true);
          return removeCards(
            allCardsAreBeaten,
            setAllCardsAreBeaten,
            cardsOnTheTable,
            setCardsOnTheTable,
            whoseMove,
            setMove,
            setSet,
            setBitButton,
          );
        }
      }
    }
  };

  return (
    <Stack
      justifyContent="space-between"
      width="100%"
      height="80%"
      backgroundColor="primary.dark"
    >
      <Player
        whoseMove={whoseMove}
        playerCards={computerCards}
        setPlayerCards={setComputerCards}
        cardsOnTheTable={cardsOnTheTable}
        setCardsOnTheTable={setCardsOnTheTable}
        setMove={setMove}
        computerMakeMove={computerMakeMove}
        color={colors[0]}
        clickableCards={clickableCards}
        setClickableCards={setClickableCards}
        setIsTakeButton={setIsTakeButton}
        trumpCard={trumpCard}
        move={move}
        handleEndGame={handleEndGame}
        isBitButton={isBitButton}
      />
      <Deck
        cardsOnTheTable={cardsOnTheTable}
        setCardsOnTheTable={setCardsOnTheTable}
        trumpCard={trumpCard}
        deckCards={deckCards}
        isTakeButton={isTakeButton}
        whoseMove={whoseMove}
        setMove={setMove}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        computerCards={computerCards}
        setComputerCards={setComputerCards}
        allCardsAreBeaten={allCardsAreBeaten}
        setAllCardsAreBeaten={setAllCardsAreBeaten}
        move={move}
        setSet={setSet}
        setIsTakeButton={setIsTakeButton}
        isBitButton={isBitButton}
        setBitButton={setBitButton}
      />
      <Player
        whoseMove={whoseMove}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        cardsOnTheTable={cardsOnTheTable}
        setCardsOnTheTable={setCardsOnTheTable}
        setMove={setMove}
        computerMakeMove={computerMakeMove}
        color={colors[1]}
        clickableCards={clickableCards}
        setClickableCards={setClickableCards}
        setIsTakeButton={setIsTakeButton}
        trumpCard={trumpCard}
        move={move}
        handleEndGame={handleEndGame}
        setBitButton={setBitButton}
      />
    </Stack>
  );
};
