var Bingo = require('./bingo');

var socketClient = require('socket.io-client');

var client = socketClient.connect('ws://yahoobingo.herokuapp.com');



var payload = {
  name: 'Anuj Thapliyal',
  email: 'contact@anujthapliyal.com',
  url: 'https://github.com/anuj123/Bingo'
}

client.emit('register', payload)

client.on('connect', function () {
  console.log('Connected to Bingo Server');
});


client.on('card', function (payload) {
  console.log('Receiving card');
  Bingo.init();
  Bingo.indexPayload(payload);
});

client.on('number', function(number) {
  console.log("Number is " + number);
  // Check if we have payload
  if (Bingo.hasPayload) {
    var digit = number.match(/\d+/)[0];
    var isWinner = Bingo.play(digit);
    if(isWinner) {
      //if we have match on row coloum diagonals
      //emit bingo
      client.emit('bingo');
    }
  }
})

client.on('win', function (message) {
  console.log(message)
})

client.on('lose', function (message) {
  console.log(message);
})

client.on('disconnect', function() {
  console.log('Hasta la vista Baby!');
})

