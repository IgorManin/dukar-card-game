import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Deck } from '../Deck';
import { Player } from '../Player';
import { beginingGame, firstHand } from '../../common/functions';
import { PLAYERS_MOVE } from '../../App';

const colors = ['red', 'purple'];

export const changingUserDeck = (selectedMap, setUserDeck, userDeck) => {
  const updatedComputerCards = userDeck.filter((item) => {
    return item !== selectedMap;
  });
  return setUserDeck(updatedComputerCards);
};

export const Table = ({ startGame, whoseMove, setMove }) => {
  const [allCards, setAllCards] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [deckCards, setDeckCards] = useState([]);
  const [trumpCard, setTrumpCard] = useState(null);
  const [cardsOnTheTable, setCardsOnTheTable] = useState([]);
  const [isTakeButton, setIsTakeButton] = useState(false);
  const [allCardsAreBeaten, setAllCardsAreBeaten] = useState([]);
  const [flag, setFlag] = useState(false);
  const [clickableCards, setClickableCards] = useState([]);

  const cheackFlag = () => {
    setFlag(!flag);
    setTimeout(() => {
      setFlag(!flag);
    }, 1000);
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

  const selectCard = (playerCards, trumpCard) => {
    let result = [];

    if (cardsOnTheTable.length === 0) {
      // Создаем массив, содержащий только карты, у которых масть не совпадает с козырной
      const nonTrumpCards = playerCards?.filter(
        (card) => card?.suit !== trumpCard[0]?.suit,
      );

      if (nonTrumpCards.length === 0) {
        // Если нет карт, у которых масть не совпадает с козырной, выбираем карту с наименьшим рангом из всех
        const selectedCard = playerCards.reduce(
          (minCard, card) => (card.rank < minCard.rank ? card : minCard),
          playerCards[0],
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
      changingUserDeck(result, setComputerCards, computerCards);
      return setCardsOnTheTable(result);
    }
    if (cardsOnTheTable.length !== 0) {
    }
  };

  const computerIsProtected = () => {
    if (cardsOnTheTable) {
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
        computerIsProtected={computerIsProtected}
        color={colors[0]}
        clickableCards={clickableCards}
        setClickableCards={setClickableCards}
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
        flag={flag}
        cheackFlag={cheackFlag}
        selectCard={selectCard}
      />
      <Player
        whoseMove={whoseMove}
        playerCards={playerCards}
        setPlayerCards={setPlayerCards}
        cardsOnTheTable={cardsOnTheTable}
        setCardsOnTheTable={setCardsOnTheTable}
        setMove={setMove}
        computerIsProtected={computerIsProtected}
        color={colors[1]}
        clickableCards={clickableCards}
        setClickableCards={setClickableCards}
      />
    </Stack>
  );
};
