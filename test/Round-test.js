const chai = require("chai");
const expect = chai.expect;

const { createCard, evaluateGuess } = require("../src/card");
const { createDeck } = require("../src/deck");
const { createRound, takeTurn, calculatePercentCorrect, endRound } = require("../src/round");

describe("round", function () {
  it("should return a round", function () {
    let card1, card2, card3, deck, round;
    beforeEach(function () {
      card1 = createCard(1, "What is Robbie's favorite animal", ["sea otter", "pug", "capybara"], "sea otter");
      card2 = createCard(14, "What organ is Khalid missing?", ["spleen", "appendix", "gallbladder"], "gallbladder");
      card3 = createCard(12, "What is Travis's favorite stress reliever?", ["listening to music", "watching Netflix", "playing with bubble wrap"], "playing with bubble wrap");

      deck = createDeck([card1, card2, card3]);
      round = createRound(deck, card1, 0, []);
    });
  });

  it("should create a deck and its properties", function () {
    const card1 = createCard(1, "What is Robbie's favorite animal", ["sea otter", "pug", "capybara"], "sea otter");
    const card2 = createCard(14, "What organ is Khalid missing?", ["spleen", "appendix", "gallbladder"], "gallbladder");
    const card3 = createCard(12, "What is Travis's favorite stress reliever?", ["listening to music", "watching Netflix", "playing with bubble wrap"], "playing with bubble wrap");

    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);

    expect(round.deck).to.equal(deck);
    expect(round.currentCard).to.equal(deck[0]);
    expect(round.turns).to.deep.equal(0);
    expect(round.incorrectGuesses).to.deep.equal([]);
    });
});

describe("takeTurn", function () {
  it("should be a function", function () {
    expect(takeTurn).to.be.a("function");
    });

  it("should update the turns count", function () {
    const card1 = createCard(1, "What is Robbie's favorite animal", ["sea otter", "pug", "capybara"], "sea otter");
    const card2 = createCard(14, "What organ is Khalid missing?", ["spleen", "appendix", "gallbladder"], "gallbladder");
    const card3 = createCard(12, "What is Travis's favorite stress reliever?", ["listening to music", "watching Netflix", "playing with bubble wrap"], "playing with bubble wrap");

    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);

    expect(round.turns).to.equal(0);

    takeTurn("sea otter", round);
    expect(round.turns).to.equal(1);

    takeTurn("pug", round);
    expect(round.turns).to.equal(2);
    });

  it("should state if answer is correct", function () {
    const card1 = createCard(1, "What is Robbie's favorite animal", ["sea otter", "pug", "capybara"], "sea otter");
    const correctGuess = evaluateGuess("sea otter", card1.correctAnswer);
    const expectedResponse = "Correct!";

    expect(correctGuess).to.equal(expectedResponse);
    });

  it("should state if answer is incorrect", function () {
    const card1 = createCard(1, "What is Robbie's favorite animal", ["sea otter", "pug", "capybara"], "sea otter");
    const incorrectGuess = evaluateGuess("not sea otter", card1.correctAnswer);
    const expectedResponse = "Incorrect!";

    expect(incorrectGuess).to.equal(expectedResponse);
    });

  it("should update the current card after each turn", function () {
    const card1 = createCard(1, "What is Robbie's favorite animal", ["sea otter", "pug", "capybara"], "sea otter");
    const card2 = createCard(14, "What organ is Khalid missing?", ["spleen", "appendix", "gallbladder"], "gallbladder");
    const card3 = createCard(12, "What is Travis's favorite stress reliever?", ["listening to music", "watching Netflix", "playing with bubble wrap"], "playing with bubble wrap");

    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck);

    expect(round.currentCard).to.equal(card1);

    takeTurn("sea otter", round);
    expect(round.currentCard).to.equal(card2);

    takeTurn("gallbladder", round);
    expect(round.currentCard).to.equal(card3);
    });

  it("should calculatePercentCorrect", function () {
    const card1 = createCard(1, "What is Robbie's favorite animal", ["sea otter", "pug", "capybara"], "sea otter");
    const card2 = createCard(14, "What organ is Khalid missing?", ["spleen", "appendix", "gallbladder"], "gallbladder");
    const card3 = createCard(12, "What is Travis's favorite stress reliever?", ["listening to music", "watching Netflix", "playing with bubble wrap"], "playing with bubble wrap");

    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck, card1, 0, []);

    takeTurn("sea otter", round);
    takeTurn("spleen", round);

    const percentCorrect = calculatePercentCorrect(round);
    expect(percentCorrect).to.equal(50);
    });

  it("should endRound", function () {
    const card1 = createCard(1, "What is Robbie's favorite animal", ["sea otter", "pug", "capybara"], "sea otter");
    const card2 = createCard(14, "What organ is Khalid missing?", ["spleen", "appendix", "gallbladder"], "gallbladder");
    const card3 = createCard(12, "What is Travis's favorite stress reliever?", ["listening to music", "watching Netflix", "playing with bubble wrap"], "playing with bubble wrap");

    const deck = createDeck([card1, card2, card3]);
    const round = createRound(deck, card1, 0, []);

    takeTurn("sea otter", round);
    takeTurn("spleen", round);
    takeTurn("playing with bubble wrap", round);

    const endRoundMessage = endRound(round);
    expect(endRoundMessage).to.equal("**Round over!** You answered 66.66666666666666% of the questions correctly!");
    });
});
