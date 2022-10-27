const Ladder = require("./ladder");

class LadderSnake {
  constructor(numberOfLadders, numberOfSnakes) {
    if (numberOfLadders < 0 || typeof numberOfLadders !== "number") {
      throw new Error("Invalid input");
    }
    this.ladder = {};
    this.snake = {};

    for (let i = 0; i < numberOfLadders; i += 1) {
      const newLadder = new Ladder();
    }
  }
}
