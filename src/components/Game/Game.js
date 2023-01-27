import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import ResultBanner from "../ResultBanner/ResultBanner";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

const initialAnswer = sample(WORDS);
console.log("Answer: ", initialAnswer);

function Game() {
  const [guessList, setGuessList] = React.useState([]);
  const DEFAULT_GAME_RESULT = {
    gameOver: false,
    won: false,
  };
  const [gameResult, setGameResult] = React.useState(DEFAULT_GAME_RESULT);
  const [answer, setAnswer] = React.useState(initialAnswer);

  function handleGuessSent(value) {
    if (gameResult.gameOver) return;

    if (WORDS.indexOf(value) < 0) {
      console.log("Invalid word: ", value);
      return;
    }

    console.log({ guess: value });

    if (guessList.indexOf(value) > -1) {
      console.log("Guess already sent!");
      return;
    }

    const nextGuessList = [...guessList, value];
    setGuessList(nextGuessList);

    // detect game won
    if (value === answer) {
      setGameResult({ gameOver: true, won: true });
    }

    // detect game lost
    if (nextGuessList.length === NUM_OF_GUESSES_ALLOWED) {
      setGameResult({ gameOver: true, won: false });
    }
  }

  function resetGame() {
    setGuessList([]);
    setGameResult(DEFAULT_GAME_RESULT);
    const nextAnswer = sample(WORDS);
    setAnswer(nextAnswer);
    console.log("Answer: ", nextAnswer);
  }
  return (
    <>
      <GuessResults guessList={guessList} answer={answer} />
      <GuessInput handleGuessSent={handleGuessSent} />
      {gameResult.gameOver && (
        <ResultBanner
          answer={answer}
          numGuesses={guessList.length}
          gameWon={gameResult.won}
          resetGame={resetGame}
        />
      )}
    </>
  );
}

export default Game;
