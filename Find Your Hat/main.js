const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "▒";
const pathCharacter = "*";

class Field {
  constructor() {
    this.gameField = [];
    this.displayField = [];
    this.playerX = 0;
    this.playerY = 0;
    this.gameOver = false;
  }

  generateField(height = 3, width = 3, percent = 5) {
    // turn percent into percentage
    let percentage = percent / 100;
    let playerIsStuck = false;
    let hatIsStuck = false;

    do {
      // generate fieldRows equal to player entered height
      for (let i = 0; i < height; i++) {
        let gameFieldRow = [];
        let displayFieldRow = [];
        // fill rows using player entered width
        // use random number to determine percentage of holes in gameField
        // fill displayField with fieldCharacters
        for (let j = 0; j < width; j++) {
          let ranNum = Math.random();
          gameFieldRow.push(ranNum <= percentage ? hole : fieldCharacter);
          displayFieldRow.push(fieldCharacter);
        }
        // push both generated rows into their respective fields
        this.gameField.push(gameFieldRow);
        this.displayField.push(displayFieldRow);
      }
      // place pathCharacter in top-left of both fields
      this.gameField[0][0] = pathCharacter;
      this.displayField[0][0] = pathCharacter;

      // get random index in last row and place hat
      const hatIndex = Math.floor(Math.random() * width);
      this.gameField[this.gameField.length - 1][hatIndex] = hat;

      // check if player is stuck
      if (this.gameField[0][1] === hole && this.gameField[1][0] === hole)
        playerIsStuck = true;

      // check if hat is stuck
      if (
        this.gameField[this.gameField.length - 1][hatIndex - 1] === hole &&
        this.gameField[this.gameField.length - 1][hatIndex + 1] === hole &&
        this.gameField[this.gameField.length - 2][hatIndex] === hole
      ) {
        hatIsStuck = true;
      }
    } while (playerIsStuck || hatIsStuck);
  }

  print() {
    // takes this.displayField and prints it real pretty
    let fieldPrint = "";
    for (let i = 0; i < this.displayField.length; i++) {
      for (let j = 0; j < this.displayField[i].length; j++) {
        fieldPrint += this.displayField[i][j] + " ";
      }
      console.log(fieldPrint);
      fieldPrint = "";
    }
  }

  checkGameState() {
    // check player's x and y coordinates and give appropraite response

    // if player tries to go off the course
    if (
      this.playerX < 0 ||
      this.playerY < 0 ||
      this.playerX > this.gameField.length - 1 ||
      this.playerY > this.gameField[0].length - 1
    ) {
      console.log(
        "You've reached the fringes of this wretched place and cannot proceed further, return whence you came."
      );
      // reset their position so they're not off the grid
      if (this.playerX < 0) {
        this.playerX += 1;
      } else if (this.playerY < 0) {
        this.playerY += 1;
      } else if (this.playerX > this.gameField.length - 1) {
        this.playerX -= 1;
      } else if (this.playerY > this.gameField[0].length - 1) {
        this.playerY -= 1;
      }
      this.promptMove();
    } else if (this.gameField[this.playerX][this.playerY] === hat) {
      this.displayField[this.playerX][this.playerY] = hat;
      this.print();
      console.log(
        "You've discovered your hat and feel the candle of hope reignite. GAME OVER."
      );
      this.GameOver = true;
    } else if (this.gameField[this.playerX][this.playerY] === hole) {
      this.displayField[this.playerX][this.playerY] = hole;
      this.print();
      console.log(
        "You've fallen in a hole and met with a terrible fate. GAME OVER."
      );
      this.gameOver = true;
    } else {
      this.displayField[this.playerX][this.playerY] = pathCharacter;
      this.print();
      console.log(
        "You proceed further through the twisting forest, and observe nothing but more confounding terrors. Proceed if you dare."
      );
      this.promptMove();
    }
  }

  // handle player movement
  promptMove() {
    this.print();
    let requestMove = prompt(
      "Which way will you move? Enter W for north / A for west / S for south / D for east."
    );
    requestMove = requestMove.toUpperCase();
    switch (requestMove) {
      case "W":
        this.playerX -= 1;
        this.checkGameState();
        break;

      case "A":
        this.playerY -= 1;
        this.checkGameState();
        break;

      case "S":
        this.playerX += 1;
        this.checkGameState();
        break;

      case "D":
        this.playerY += 1;
        this.checkGameState();
        break;

      default:
        console.log(
          "Invalid input, please enter W for north / A for west / S for south / D for east."
        );
        this.checkGameState();
    }
  }

  playGame() {
    this.promptMove();
  }
}

const myField = new Field();
myField.generateField(8, 10, 5);
myField.playGame();
