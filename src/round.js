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

const calculatePercentCorrect = (round) => {
    const percentCorrect = ((round.turns - round.incorrectGuesses.length) / round.turns) * 100;
    return percentCorrect;
} 


const endRound = (round) => {
    const percentCorrect = calculatePercentCorrect(round);
    const endRoundMessage = `**Round over!** You answered ${percentCorrect}% of the questions correctly!`;

    console.log(endRoundMessage);

    if (percentCorrect < 90) {
        console.log("You did not pass the round. Please go through the entire dataset again.");
            round.deck = createDeck(round.cards);
            round.incorrectGuesses = [];
    } 

    return endRoundMessage;
}

module.exports = {
createRound,
takeTurn,
calculatePercentCorrect,
endRound,
};