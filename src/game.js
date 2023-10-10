const data = require("./data");
const prototypeQuestions = data.prototypeData;
const util = require("./util");
const { createDeck, countCards } = require("./deck");
const { createRound, endRound } = require("./round");
const { createCard } = require("./card");

function printMessage(deck) {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

function printQuestion(round) {
  util.main(round);
}

function startGame() {
  let cards = prototypeQuestions.map((data) => {
    return createCard(data.id, data.question, data.answers, data.correctAnswer);
  });
  let deck = createDeck(cards);
  let round = createRound(deck);

  printMessage(deck);
  printQuestion(round);

  if (round.turns === 30) {
    endRound(round);
  }

  return { currentRound: round };
}

module.exports = { printMessage, printQuestion, startGame };