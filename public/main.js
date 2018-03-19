// All this code runs as soon as the page loads

// empty arrays that will get populated with cards as the game starts
var playerCards = [];
var dealerCards = [];
var cardsInDeck = 52;

// get card DOM elements so you can populate them with card values
var playerCardContainer = document.getElementById('player-cards');
var dealerCardContainer = document.getElementById('dealer-cards');

// get control DOM elements so you can assign callbacks
var hitMeButton = document.getElementById('hit');
var stayButton = document.getElementById('stay');

// generate deck
var deck = makeDeck();
// distribute first 2 cards 
dealCards(deck);

// populate HTML with cards dealt to player
for(var i = 0; i < playerCards.length; i++) {
  var newCardElement = document.createElement('span'); 
  newCardElement.innerHTML = playerCards[i].name + ' of ' + playerCards[i].suit;

  playerCardContainer.appendChild(newCardElement);
}

// populate HTML with cards dealt to dealer
for(var i = 0; i < dealerCards.length; i++) {
  var newCardElement = document.createElement('span'); 
  newCardElement.innerHTML = dealerCards[i].name + ' of ' + dealerCards[i].suit;

  dealerCardContainer.appendChild(newCardElement);
}

// click event for when you decide to hit
hitMeButton.addEventListener('click', function() {
  var playerCardSum = 0;
  var newCard = hitMe(deck);
  
  // add card to list
  playerCards.push(newCard);

  // populate html with new card
  var newCardElement = document.createElement('span'); 
  newCardElement.innerHTML = newCard.name + ' of ' + newCard.suit;
  playerCardContainer.appendChild(newCardElement);
  
  // sum up the values of all cards
  for(var i = 0; i < playerCards.length; i++) {
    playerCardSum = playerCardSum + playerCards[i].value;
  }
  
  // player bust
  if (playerCardSum > 21) {
    disableButtons();
    
    var bustMessage = document.createElement('span'); 
    bustMessage.innerHTML = ' OVER 21! BUST! ';
    playerCardContainer.appendChild(bustMessage);
    
    // do dealer stuff here because player is done
    dealerPlay();
  }
});

// click event for when you decide to stay
stayButton.addEventListener('click', function() {
  disableButtons();
  dealerPlay();
});


//----- DIVIDER ---- ///

// all functions that get used above are declared down here
function makeDeck() {
  var names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
	var suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
	var cards = [];
    
  for(var suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    for(var nameIndex = 0; nameIndex < names.length; nameIndex++) {
      
      var card = {
        suit: suits[suitIndex],
        name: names[nameIndex],
        value: values[nameIndex]
      };

      cards.push(card);
    }
  }

  return cards;
}

function getRandomCard(deck) {
  var cardIndex = Math.floor(Math.random() * cardsInDeck);
  var card = deck.splice(cardIndex, 1);
  cardsInDeck = cardsInDeck - 1;
  // splice returns an array, you only want the first value of that array
  return card[0];
}

function dealCards(deck) {
  var dealerCard1 = getRandomCard(deck);
  var dealerCard2 = getRandomCard(deck);
  dealerCards.push(dealerCard1);
  dealerCards.push(dealerCard2);

  var playerCard1 = getRandomCard(deck);
  var playerCard2 = getRandomCard(deck);
  playerCards.push(playerCard1);
  playerCards.push(playerCard2);
}

// removes random card from the deck and returns it
function hitMe(deck) {
  var newCard = getRandomCard(deck);
  return newCard;
}

function disableButtons() {
  hitMeButton.disabled = true;
  stayButton.disabled = true;
}

function dealerPlay() {
  var dealerCardSum = 0;
  // sum up the values of first 2 cards
  for(var i = 0; i < dealerCards.length; i++) {
    dealerCardSum = dealerCardSum + dealerCards[i].value;
  }
  
  // keep dealing new cards until the dealer is over 18
  while(dealerCardSum < 19) {
    var newCard = hitMe(deck);
  
    // add card to list
    dealerCards.push(newCard);

    // populate html with new card
    var newCardElement = document.createElement('span'); 
    newCardElement.innerHTML = newCard.name + ' of ' + newCard.suit;
    dealerCardContainer.appendChild(newCardElement);
    
    // add new card value to dealer sum
    dealerCardSum = dealerCardSum + newCard.value;
    
    // dealer bust
    if (dealerCardSum > 21) {
      var bustMessage = document.createElement('span'); 
      bustMessage.innerHTML = ' OVER 21! BUST! ';
      dealerCardContainer.appendChild(bustMessage);
    }
  }

  function playerPlay() {
    var playerCardSum = 0;
    for (var i = 0; i <playerCards.length; i++){
      playerCardSum = playerCardSum + playerCards[i].value;
    }
  }
  
  dealerCardContainer.style.display = "block";
}


// if (playerCardSum > dealerCardSum) {
//   alert("You have won this round!");
// } else if (dealerCardSum > playerCardSum) {
//   alert("The dealer has won this round!")
// } else {
//   alert("You have tied this round!")
// }
// }

// function playerPlay() {
//   var playerCardSum = 0;
//   for (var i = 0; i < playerCards.length; i++) {
//     playerCardSum = playerCardSum + playerCards[i].value;
//   }
// }

