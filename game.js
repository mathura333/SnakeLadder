const Dice = require("./dice");
const LadderSnake = require("./ladderSnake");
const Player = require("./player");

class Game {
  constructor(numberOfPlayers = 2) {
    if (numberOfPlayers <= 1 || typeof numberOfPlayers !== "number") {
      throw new Error("Invalid input");
    }
    this.numberOfPlayers = numberOfPlayers;
    this.players = [];

    for (let i = 0; i < this.numberOfPlayers; i += 1) {
      this.players.push(new Player(i));
    }
    this.currentPlayer = 0;

    this.ladders = new LadderSnake({
      4: 14,
      6: 9,
      10: 80,
      60: 70,
    });

    this.snakes = new LadderSnake({
      7: 1,
      10: 3,
      81: 40,
      66: 6,
    });
  }

  play() {
    const currentDiceValue = Dice.rollDice();

    if (
      this.players[this.currentPlayer].currentCell + currentDiceValue > 100 ||
      (this.players[this.currentPlayer].currentCell === 0 &&
        currentDiceValue !== 1)
    ) {
      this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers;
      this.play();
      return;
    }

    this.players[this.currentPlayer].currentCell += currentDiceValue;

    if (
      this.ladders[this.players[this.currentPlayer].currentCell] !== undefined
    ) {
      this.players[this.currentPlayer].currentCell =
        this.ladders[this.players[this.currentPlayer].currentCell];
    }

    if (
      this.snakes[this.players[this.currentPlayer].currentCell] !== undefined
    ) {
      this.players[this.currentPlayer].currentCell =
        this.snakes[this.players[this.currentPlayer].currentCell];
    }

    console.log(
      `Current Player :  ${this.players[this.currentPlayer].playerId} `
    );
    console.log(
      `Current position : ${this.players[this.currentPlayer].currentCell}`
    );

    if (this.players[this.currentPlayer].currentCell === 100) {
      console.log(
        `Player ${this.players[this.currentPlayer].playerId} won the game.`
      );
      return;
    }

    this.currentPlayer = (this.currentPlayer + 1) % this.numberOfPlayers;

    this.play();
  }
}

const snakeLadderGame = new Game(2);

snakeLadderGame.play();
