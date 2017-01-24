function Card(point,suit) {
    var point = point;
    var suit = suit;

    function getImageUrl() {
        var str = point;
        switch(point) {
            case 11:
                str = 'jack';
                break;
            case 12:
                str = 'queen';
                break;
            case 13:
                str = 'king';
                break;
            case 1:
                str = 'ace';
        }
        return 'images/'+ str + '_of_' + suit + '.png';
    };
    return Card();
};

function Hand() {
    var cards = [];
    var numAces = 0;
    function addCard(card){
        cards.push(card);
        if(point == 1) {
        numAces++;
    }
    };
    function getPoint(card){
        var sum=0;
        cards.forEach(function(card){
            if(point>10){
                sum+=10;
            }
            else if (point == 1) {
                sum += 11;
    }
            else {
                sum += point;
            }
            while (sum > 21 && numAces > 0) {
                sum -= 10;
            }
        });
        return sum;
    };
    return Hand();
};

function Deck() {
  var deck = [];
  var played = [];
  var suits = ['spades', 'diamonds', 'clubs', 'hearts']
  for (var j=0; j <= 3; j++){
      for (var i=1; i<=13; i++){
  deck.push(new Card(i, suits[j]));
}
 function draw(hand) {
    var card = deck.pop();
    hand.addCard(card);
  }
  function shuffle() {
      var currentIndex = deck.length;
      while (currentIndex !== 0) {
      var randomIndex = Math.floor(Math.random() * deck.length);
      currentIndex -= 1;
      var tempValue = deck[currentIndex];
          deck[currentIndex] = deck[randomIndex];
          deck[randomIndex] = tempValue;
      }
     };
     function numCardsLeft() {
         return deck.length;
     }};
     return Deck();
};


var playerHand = new Hand();
var dealerHand = new Hand();
var hiddenHand = new Hand();
myDeck = new Deck();
var playerWin = 0;
var dealerWin = 0;
var draw = 0;
var money = 500;
var currentBet = 0;

function clearBoard() {
    $('#dealer-hand').empty();
    $('#player-hand').empty();
    playerHand.cards=[];
    dealerHand.cards=[];
    hiddenHand.cards=[];
    $('#player-points').empty();
    $('#dealer-points').empty();
}

function gameOver() {
    document.getElementById('hit-button').style.visibility='hidden';
    document.getElementById('stand-button').style.visibility='hidden';
    document.getElementById('bet-button').style.visibility='hidden';
}

function startGame() {
    document.getElementById('hit-button').style.visibility='visible';
    document.getElementById('stand-button').style.visibility='visible';
    document.getElementById('bet-button').style.visibility='visible';
    document.getElementById('bet1').style.visibility='hidden';
    document.getElementById('bet5').style.visibility='hidden';
    document.getElementById('bet10').style.visibility='hidden';
    document.getElementById('bet25').style.visibility='hidden';
    document.getElementById('betAll').style.visibility='hidden';
    //clear the board
    clearBoard();
    //count the deck
if (myDeck.numCardsLeft !== 52) {
    myDeck = new Deck();
}
    //shuffle cards
    myDeck.shuffle();
    //deal and initiazlize players
    myDeck.draw(playerHand);
    myDeck.draw(playerHand);
    myDeck.draw(dealerHand);
    myDeck.draw(hiddenHand);

dealerHand.cards.forEach(function(card){
    $('#dealer-hand').append('<img src="'+card.getImageUrl()+'" />');
});

playerHand.cards.forEach(function(card){
    $('#player-hand').append('<img src="'+card.getImageUrl()+'" />');
});
hiddenHand.cards.forEach(function(card){
    $('#dealer-hand').append('<img src="images/back.jpg" />');
});

dealerPoints = dealerHand.getPoints();
playerPoints = playerHand.getPoints();

$('#player-points').append(playerPoints);
$('#dealer-points').append(dealerPoints);
if (playerPoints == 21 && dealerPoints !== 21) {
    $('#player-points').html('<h3>"BLACKJACK, You WIN!"</h3>');
    gameOver();
}
else if (dealerPoints == 21) {
    $('#player-points').html('<h3>"Dealer had BLACKJACK, You LOSE!"</h3>');
    gameOver();
}
}

function hit() {
    $('#player-hand').empty();
    $('#player-points').empty();
    $('#dealer-points').empty();
    myDeck.draw(playerHand);
    playerHand.cards.forEach(function(card){
        $('#player-hand').append('<img src="'+card.getImageUrl()+'" />');
});

dealerPoints = dealerHand.getPoints();
playerPoints = playerHand.getPoints();
$('#player-points').append(playerPoints);
$('#dealer-points').append(dealerPoints);
if (playerPoints > 21) {
    $('#player-points').html('<h3>"BUST, You LOSE!"</h3>');
    gameOver();


    // alert("Please Play Again");
}
}

function stand() {
    $('#dealer-hand').empty();
    $('#player-points').empty();
    $('#dealer-points').empty();

    dealerPoints = dealerHand.getPoints();
    playerPoints = playerHand.getPoints();
    $('#player-points').append(playerPoints);
    $('#dealer-points').append(dealerPoints);

    while (dealerPoints < 17) {
        $('#dealer-hand').empty();
        myDeck.draw(dealerHand);
        dealerHand.cards.forEach(function(card){
            $('#dealer-hand').append('<img src="'+card.getImageUrl()+'" />');
            $('#dealer-points').empty();
        dealerPoints = dealerHand.getPoints();
        $('#dealer-points').append(dealerPoints);
    })
}
    if (dealerPoints > 21 || dealerPoints < playerPoints) {
        $('#player-points').html('<h3>"Yay, You WIN!"</h3>');
        gameOver();
    }
    else if(dealerPoints > playerPoints) {
        $('#player-points').html('<h3>"Sorry, You Lose, Dealer Wins!"</h3>');
        gameOver();
    }
    else {
        $('#player-points').html('<h3>"You Draw!"</h3>');
        gameOver();
    }
}

function bet() {
    document.getElementById('bet1').style.visibility='visible';
    document.getElementById('bet5').style.visibility='visible';
    document.getElementById('bet10').style.visibility='visible';
    document.getElementById('bet25').style.visibility='visible';
    document.getElementById('betAll').style.visibility='visible';
}


$("document").ready(function() {

$("#deal-button").click(function() {
    startGame();
});

$("#hit-button").click(function() {
    hit();
});

$("#stand-button").click(function() {
    stand();
});
$("#bet-button").click(function() {
    bet();
});
});
