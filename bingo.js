/*
 *
 * Main Bingo module
* */


var Bingo = {

  init: function() {
    // initialize index for search
    // and coloum rows diagonals for tracking
    //
    //
    this.numbers = [];
    this.hasPayload = true;
    this.SIZE = 5;
    this.index = {};
    for(i=0; i < this.SIZE; i++) {
      this["coloum"+i] = [];
      this["row"+i] = [];
    }
    this["diagonal1"] = [];
    this["diagonal2"] = [];
  },

  indexPayload: function(payload) {
    //parse payload
    var slots = payload.slots
    this.slots = [slots.B, slots.I , slots.N, slots.G, slots.O];

    //loop through payload
    for(var i=0; i < this.SIZE; i++ ) {
      for(var j=0; j< this.SIZE; j++) {
        //index all values for easy search
        this.index[this.slots[i][j]] = [i,j];
      }
    }
  },

  record: function(position, input) {
    //mark row number with entry and check duplicates
    //
    if(this["row"+position[0]].indexOf(input) === -1 ) {
      this["row"+position[0]].push(input);
    }
    //mark coloum with entry and check duplicates
    //
    if(this["coloum"+position[1]].indexOf(input) === -1 ) {
      this["coloum"+position[1]].push(input);
    }
    // mark diagonals and check duplicates
    // if row and coloum index are equal
    if((position[0] === position[1]) && (this["diagonal1"].indexOf(input) === -1)) {
      this["diagonal1"].push(input);
    }
    //sum of row and coloum index is equal to size - 1 (for 0 based index)
    if((position[0] + position[1] === this.SIZE - 1) && (this["diagonal2"].indexOf(input) === -1)) {
      this["diagonal2"].push(input);
    }
  },

  checkDiagonal: function () {
    return this["diagonal1"].length == this.SIZE || this["diagonal2"].length == this.SIZE;
  },

  checkColoumRows: function () {
    for(var i=0; i < this.SIZE; i++) {
      if(this["coloum"+i].length == this.SIZE || this["row"+i].length == this.SIZE) {
        return true;
      }
    }
  },

  checkForWin: function() {
    return this.checkDiagonal() || this.checkColoumRows();
  },

  play: function(input) {
    //check if number exists and get its position
    //from index
    //
    this.numbers.push(input);
    var position = this.index[input];
    //if exist
    if(position) {
      //record position
      //
      console.log("Position " + position);
      console.log("Input " + input);
      this.record(position,input);
      //check if we have row coloum or diagonal
      //
      console.log(this);
      return this.checkForWin();
    }
  }

};

module.exports = Bingo;
