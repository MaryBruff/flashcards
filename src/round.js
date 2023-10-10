const { createCard } = require("../src/card");
const { createDeck } = require("../src/deck");

const createRound = (deck, currentCard = deck[0], turns = 0, incorrectGuesses = []) => {
    return {
    deck,
    currentCard,
    turns,
    incorrectGuesses,
};
};

const evaluateGuess = (guess, correctAnswer) => (correctAnswer === guess) ? "correct!" : "incorrect!";

const takeTurn = (guess, round) => {
    const result = evaluateGuess(guess, round.currentCard.correctAnswer);
    if (result === "incorrect!") {
        round.incorrectGuesses.push(round.currentCard.id);
    }
    round.turns++;
    round.currentCard = round.deck[round.turns];
    return result;
};

function calculatePercentCorrect(round) {
    const percentCorrect = ((round.turns - round.incorrectGuesses.length) / round.turns) * 100;
    return percentCorrect;
} 

const endRound = (round) => {
    let percentageCorrect = calculatePercentCorrect(round);
    console.log(`**Round over!** You answered ${percentageCorrect}% of the questions correctly!`
    );
    return `**Round over!** You answered ${percentageCorrect}% of the questions correctly!`;
    };

module.exports = {
createRound,
takeTurn,
calculatePercentCorrect,
endRound,
};