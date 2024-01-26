// Variables for different Game modes
var GAME_START = "game start";
var GAME_CARDS_DRAWN = "cards are drawn";
var GAME_RESULTS_SHOWN = "results are shown";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;
var GAME_RESTART = "game restart";

// Variables to store player and dealer hands
var playerHand = [];
var dealerHand = [];

// Empty variable to hold deck of cards
var gameDeck = [];

/*
///////////////////////////////////////////////////////////////////////////////////////
================================== DECK CREATION ======================================
///////////////////////////////////////////////////////////////////////////////////////
*/

var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  // Loop over the suits array
  var suitIndex = 0;

  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    console.log("current suit: " + currentSuit);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    var rankCounter = 1;

    while (rankCounter <= 13) {
      console.log("rank: " + rankCounter);

      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      }
      if (cardName == 11) {
        cardName = "jack";
      }
      if (cardName == 12) {
        cardName = "queen";
      }
      if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

// GENERATING RANDOM NUMBER FUNCTION
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// SHUFFLING A DECK FUNCTION
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[(randomIndex = currentItem)];
    index = index + 1;
  }
  return cards;
};

// CREATING AND SHUFFLING A DECK FUNCTION
var createNewDeck = function () {
  var newDeck = makeDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffleDeck;
};

/*
///////////////////////////////////////////////////////////////////////////////////////
================================== GAME FUNCTION ======================================
///////////////////////////////////////////////////////////////////////////////////////
*/

// CHECKING HAND FOR BLACKJACK FUNCTION
var checkForBlackjack = function (handArray) {
  //Loop through player hand. If blackjack exists, return true, else, return false
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackjack = false;

  //Blackjack scenarios
  // 1) 1st card: Ace; 2nd card: 10 or suits
  // 2) Vice versa

  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardTwo.name == "ace" && playerCardTwo.rank >= 10)
  ) {
    isBlackjack = true;
  }
  return isBlackjack;
};

// CALCULATING PLAYER'S HAND FUNCTION
var calculatePlayerHandValue = function (handArray) {
  var totalHandValue = 0;
  // Counter to keep track of the number of aces found within the given hand
  var aceCounter = 0;

  // Counter that resets the index for ace
  index = 0;
  // Loop for the number of aces found and -10 from total hand value when totalHandValue > 21
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
};

//

// MESSAGE FOR DISPLAYING BOTH PLAYER'S AND DEALER'S HAND
var displayPlayerAndDealerHands = function (playeHandArray, dealerHandArray) {
  var playerMessage = "Player hand: <br>";
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      "- " +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  index = 0;
  var dealerMessage = "Dealer hand:<br>";
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      "- " +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }

  return playerMessage + "<br>" + dealerMessage;
};

// MESSAGE FOR DISPLAYING THE TOTAL HAND VALUES OF BOTH PLAYER AND DEALER
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

/*
///////////////////////////////////////////////////////////////////////////////////////
================================== MAIN FUNCTION ======================================
///////////////////////////////////////////////////////////////////////////////////////
*/

var main = function (input) {
  var outputMessage = "";

  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    // create a deck of cards
    gameDeck = createNewDeck();

    // deal 2 cards to player and dealer
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    // check player and dealer cards
    console.log("Player Hand ==>");
    console.log(playerHand);
    console.log("Dealer Hand ==>");
    console.log(dealerHand);

    // update gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    // reassign output message
    outputMessage =
      "Everyone has recieved a card. Click 'Submit' button to calculate cards!";

    // return message
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // check for blackjack
    var playerHasBlackJack = checkForBlackJack(playerHand);
    var dealerHasBlackJack = checkForBlackJack(dealerHand);

    // Condition when either player or dealer has black jack
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // Condition where both have black jack
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a Black Jack Tie!" +
          "<br>Click submit to play again!";
        console.log("click submit to play again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }
      // Condition when only player has black jack
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player has gotten a Black Jack!" +
          "PLAYER WINS!" +
          "<br>Click submit to play another round again!";
        console.log("click submit to play another round again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }
      // Condition when only dealer has black jack
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer has gotten a Black Jack!" +
          "DEALER WINS!" +
          "<br>Click submit to play another round again!";
        console.log("click submit to play another round again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }
    }

    // Condition where neither player nor dealer has black jack
    // ask player to input 'hit' or 'stand'
    else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> No Blackjacks were obtained. <br>Please input "hit" or "stand".';

      // update gameMode
      currentGameMode = GAME_HIT_OR_STAND;
    }

    // return message
    return outputMessage;
  }

  // THIRD CLICK
  if (currentGameMode == GAME_HIT_OR_STAND) {
    // Condition where player inputs 'hit'
    if (input == "hit") {
      playerHand.push(gameDeck.pop());
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        '<br> You have drawn a card. <br>Please input "hit" or "stand".';
    }

    // Condition where player inputs 'stand'
    else if (input == "stand") {
      // Calculate hands
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);

      // Dealer's hit or stand logic
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }

      // Conditions for tied game
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Its a Tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br> Click submit to play another round again!";
        console.log("click submit to play another round again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }

      // Conditions for player win
      else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>Click submit to play another round again!";
        console.log("click submit to play another round again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }

      //Bust if the total hand value is 22 and above
      else if (playerHandTotalValue >= 22) {
        console.log("Player hand bust");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Player bust, Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>Click submit to play another round again!";
        console.log("click submit to play another roundagain");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      } else if (dealerHandTotalValue >= 22) {
        console.log("Dealer hand bust");
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer bust, player wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>Click submit to play another round again!";
        console.log("click submit to play another round again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }

      // Dealer wins when above two conditions are not met
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer wins!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>Click submit to play another round again!";
        console.log("click submit to play another round again");
        currentGameMode = GAME_RESTART;
        console.log("GAME MODE:" + currentGameMode);
      }

      // update game mode - GAME_RESULTS_SHOWN is not used in this base example
      // However, you may wish to implement your own game modes for further functionality
      // i.e. going back to GAME_START to loop the game
      currentGameMode = GAME_RESULTS_SHOWN;
    }

    // Input validation when player inputs anything outside of 'hit' or 'stand'
    else {
      outputMessage =
        'wrong input... only "hit" or "stand" are valid.<br><br>' +
        displayPlayerAndDealerHands(playerHand, dealerHand);
    }

    // return output message
    return outputMessage;
  }

  //RESTART GAME
  if (currentGameMode == GAME_RESTART) {
    //reset game variable
    playerHand = [];
    dealerHand = [];
    gameDeck = [];
    currentGameMode = GAME_START;
    console.log("GAME MODE:" + currentGameMode);

    outputMessage = "New game started. Click 'Submit' to draw cards.";
    console.log("Output Message:", outputMessage);
  }
  return outputMessage;
};
