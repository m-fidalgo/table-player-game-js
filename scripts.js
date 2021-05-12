var field, player, field;

class Field {
  constructor(cols, rows, containerId) {
    this.cols = cols;
    this.rows = rows;
    this.container = document.querySelector(containerId);
    this.createField();
  }

  createField() {
    var field = [];
    for (var i = 0; i < this.rows; i++) {
      field[i] = [];

      for (var j = 0; j < this.cols; j++) {
        field[i].push(this.createObstacle());
      }
    }

    this.field = field;
    this.drawField();
  }

  createObstacle() {
    return Math.trunc(Math.random() * 5) === 1 ? "@" : "";
  }

  drawField() {
    var template = "";

    for (var i = 0; i < this.rows; i++) {
      template += "<tr>";

      for (var j = 0; j < this.cols; j++) {
        template += `<td>${this.field[i][j]}</td>`;
      }

      template += "</tr>";
    }

    this.container.innerHTML = template;
  }
}

class Character {
  constructor(field, x, y, face) {
    this.face = face;
    this.x = x;
    this.y = y;
    this.table = field;
    if (!this.setPosition(this.x, this.y)) {
      throw Error();
    }
  }

  up() {
    if (this.y > 0) {
      this.setPosition(this.x, this.y - 1);
    }
  }

  down() {
    if (this.y + 1 < this.table.rows) {
      this.setPosition(this.x, this.y + 1);
    }
  }

  left() {
    if (this.x > 0) {
      this.setPosition(this.x - 1, this.y);
    }
  }

  right() {
    if (this.x + 1 < this.table.cols) {
      this.setPosition(this.x + 1, this.y);
    }
  }

  setPosition(x, y) {
    if (this.table.field[y][x] === "") {
      this.table.field[this.y][this.x] = "";
      this.x = x;
      this.y = y;
      this.table.field[this.y][this.x] = this.face;
      this.table.drawField();
      return true;
    }
    return false;
  }
}

class Player extends Character {
  constructor(field) {
    super(field, 0, 0, "o_o");
  }
}

class Npc extends Character {
  constructor(field) {
    var x = Math.trunc(Math.random() * field.cols);
    var y = Math.trunc(Math.random() * field.rows);

    super(field, x, y, ">_<");

    setInterval(this.walk.bind(this), 500);
  }

  walk() {
    var direction = Math.trunc(Math.random() * 4) + 1;

    switch (direction) {
      case 1:
        this.up();
        break;
      case 2:
        this.down();
        break;
      case 3:
        this.left();
        break;
      case 4:
        this.right();
        break;
    }
  }
}

function startGame() {
  field = new Field(3, 4, "#myTable");

  try {
    player = new Player(field);
    npc = new Npc(field);
  } catch (e) {
    console.log("Error! Starting again");
    startGame();
  }
}

startGame();
