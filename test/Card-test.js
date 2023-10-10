const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess } = require('../src/card');

describe('card', function() {
  let card; 

  beforeEach(function() {
    card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
  });

  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });

  it('should evaluate if answer is correct or incorrect', function () {
    const correctAnswer = evaluateGuess('Correct!', 'Correct!');
    const incorrectAnswer = evaluateGuess('Incorrect!', 'Correct!');
    
    expect(correctAnswer).to.equal('Correct!');
    expect(incorrectAnswer).to.equal('Incorrect!');
  });

});