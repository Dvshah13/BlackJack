function Card(point,suit) {
    this.point = point;
    this.suit = suit;
};

Card.prototype.getImageUrl = function() {
    var str = this.point;
    switch(this.point) {
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
    return 'images/'+ str + '_of_' + this.suit + '.png';
};

function Hand() {
    this.cards = [];
    this.numAces = 0;
};

Hand.prototype.addCard = function(card){
    this.cards.push(card);
    if(card.point == 1) {
    this.numAces++;
}
};

Hand.prototype.getPoints = function(card){
    var sum=0;
    var numAces = this.numAces;
    this.cards.forEach(function(card){
        if(card.point>10){
            sum+=10;
        }
        else if (card.point == 1) {
            sum += 11;
}
        else {
            sum += card.point;
        }
        while (sum > 21 && numAces > 0) {
            sum -= 10;
        }
    });
    return sum;
};

function Deck() {
  this.deck = [];
  this.played = [];
  var suits = ['spades', 'diamonds', 'clubs', 'hearts']
  for (var j=0; j <= 3; j++){
      for (var i=1; i<=13; i++){
  this.deck.push(new Card(i, suits[j]));
}};

Deck.prototype.draw = function(hand) {
    var card = this.deck.pop();
    hand.addCard(card);
  }

Deck.prototype.shuffle = function() {
    var currentIndex = this.deck.length;
    while (currentIndex !== 0) {
    var randomIndex = Math.floor(Math.random() * this.deck.length);
    currentIndex -= 1;
    var tempValue = this.deck[currentIndex];
        this.deck[currentIndex] = this.deck[randomIndex];
        this.deck[randomIndex] = tempValue;
    }
   };

Deck.prototype.numCardsLeft = function() {
    return this.deck.length;
}};

var playerHand = new Hand();
var dealerHand = new Hand();
myDeck = new Deck();

function clearBoard() {
    $('#dealer-hand').empty();
    $('#player-hand').empty();
    playerHand.cards=[];
    dealerHand.cards=[];
    $('#player-points').empty();
    $('#dealer-points').empty();
}

function startGame() {
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
    myDeck.draw(dealerHand);

dealerHand.cards.forEach(function(card){
    $('#dealer-hand').append('<img src="'+card.getImageUrl()+'" />');
});

playerHand.cards.forEach(function(card){
    $('#player-hand').append('<img src="'+card.getImageUrl()+'" />');


});
dealerPoints = dealerHand.getPoints();
playerPoints = playerHand.getPoints();

$('#player-points').append(playerPoints);
$('#dealer-points').append(dealerPoints);
if (playerPoints == 21 && dealerPoints !== 21) {
    $('#player-points').html("BLACKJACK, You WIN!");
}
else if (dealerPoints == 21) {
    $('#player-points').html("Dealer had BLACKJACK, You LOSE!");
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
    $('#player-points').html("BUST, You LOSE!");

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
        $('#player-points').html("Yay, You WIN!");
    }
    else if(dealerPoints > playerPoints) {
        $('#player-points').html("Sorry, You Lose, Dealer Wins!");
    }
    else {
        $('#player-points').html("You Draw!");
    }
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
});
