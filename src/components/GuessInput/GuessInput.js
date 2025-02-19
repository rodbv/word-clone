import React from "react";

function GuessInput({ handleGuessSent }) {
  const [guessValue, setGuessValue] = React.useState("");

  function onChangeGuess(event) {
    const { value } = event.target;

    setGuessValue(value.trim().toUpperCase());
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (guessValue.length !== 5) return;

    handleGuessSent(guessValue);
    setGuessValue("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="guess">Enter guess:</label>
      <input
        id="guess"
        type="text"
        value={guessValue}
        onChange={onChangeGuess}
        maxLength={5}
        minLength={5}
        required
      />
      <button
        style={{
          color: "black",
          border: "1px solid black",
          borderRadius: "4px",
          marginLeft: "1em",
          padding: "0 1em",
        }}
      >
        Guess
      </button>
    </form>
  );
}

export default GuessInput;
