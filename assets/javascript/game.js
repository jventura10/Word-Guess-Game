/* 
    Javier Ventura
    Homework 3 Word Guess Game
    10/11/18
*/

//Global Variables
var userName = prompt("Enter Desired Username: ");
var numWins = 0;      //Number of Wins for Player
var numLosses = 0;    //Number of Losses for Player
var numGuess = 10;     //Number of Guesses Left

//Letters to choose from
var pokemonList = ['pikachu', 'charmander', 'bulbasaur', 'squirtle', 'zubat', 'bellsprout', 'rattata', 'eevee', 'snorlax', 'jigglypuff',
    'psyduck', 'venonat', 'abra', 'mankey', 'caterpie', 'meowth', 'dratini', 'mew', 'weedle', 'pidgey'];

//Letters user has tried
var guesses = [];     //Empty Array to be filled as user inputs tries

//Set answer to game
var answer = pokemonList[Math.floor(Math.random() * pokemonList.length)];

//Array to be built by user inputs that are correct 
var pieceTogether = [];

//Number of Letters Left
var lettersLeft;

/* 
==============================================================
    Restart Function
    - Will Reset Number of tries to 9
    - Reset What Letters User Has Tried
==============================================================
*/

function restart() {
    numGuess = 10;
    guesses = [];
}

/* 
==============================================================
    Change Pokemon Function
    - Will Reset What the Answer is for another round
==============================================================
*/

function changePokemon() {
    answer = pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

/* 
==============================================================
    Calculate Tries Function
    - Will Calculate How Many tries are left and Output it
==============================================================
*/

function calcTries() {
    document.querySelector("#numLeft").innerHTML = "Guesses Left: " + numGuess;
}

/* 
==============================================================
    List Tries Function
    - Will Show What Letters User Has Tried
==============================================================
*/

function listTries() {
    document.querySelector("#usedLetters").innerHTML = "Your Guesses So Far: " + guesses.join(' ');
}

/* 
==============================================================
    Reset Progress Function
    - Will Reset Array of the Word User has Built
==============================================================
*/

function resetProgress() {
    pieceTogether = [];
    for (i = 0; i < answer.length; i++) {
        pieceTogether[i] = '_';
    }
}

/* 
==============================================================
    Show Progress Function
    - Will Show Array of Word User has Built
==============================================================
*/

function showProgress() {
    document.querySelector("#wordSpace").innerHTML = pieceTogether.join(" ");
}

/* 
==============================================================
    Set Letters Left Function
    - Will Set the Initial Letters Left to Guess 
    - Based on Length of Answer
==============================================================
*/

function setLettersLeft() {
    lettersLeft = answer.length;
}


/* 
==============================================================
    Round Reset Function
    - Will Reset Everything and Start a New Round
==============================================================
*/

function roundReset() {
    document.getElementById("giveAnswer").style.visibility = "hidden";
    restart();      //Number of Guesses Back to 9 and Tries Array Empty
    changePokemon(); //Change the Answer to Game
    setLettersLeft();   //Set Letters Left Based on New Answer
    calcTries();    //Output Updated Tries Count
    listTries();    //Update Tried Letters
    resetProgress();    //Set pieceTogether back to all _ 
    showProgress();     //Show the New Empty Word
}

//First Round
document.querySelector("#statsTitle").innerHTML = userName + "'s Stats"
calcTries();
changePokemon();
setLettersLeft();
resetProgress();
showProgress();
console.log(answer);

//When Player presses key game will start
document.onkeyup = function (event) {
    if (numGuess > 0) {
        numGuess--;     //Take 1 try away

        var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();   //Store Try into variable

        guesses.push(keyPressed);   //Add Attempt Into Array of Tries
        calcTries();                //Calculate Tries Again
        listTries();                //Show Tried Letters

        for (i = 0; i < answer.length; i++) {
            if (keyPressed === answer[i]) {
                pieceTogether[i] = answer[i];
                lettersLeft--;
            }
        }

        showProgress();

        //If The Word Player Has built Matches the Answer
        if (lettersLeft == 0) {
            numWins++;          //Increase Number of Wins
            document.querySelector("#wins").innerHTML = "Wins: " + numWins; //Output Updated Wins
            //Reset Everything 
            restart();      //Number of Guesses Back to 9 and Tries Array Empty
            changePokemon(); //Change the Answer to Game
            setLettersLeft();   //Set Letters Left Based on New Answer
            calcTries();    //Output Updated Tries Count
            listTries();    //Update Tried Letters
            resetProgress();    //Set pieceTogether back to all _ 
            showProgress();     //Show Empty Word
        }

        //If Player Reaches 0 Tries Left
        if (numGuess <= 0) {
            numLosses++;          //Increase Number of Losses
            document.querySelector("#losses").innerHTML = "Losses: " + numLosses;
            document.querySelector("#giveAnswer").innerHTML = "The Answer was: " + answer;
            document.getElementById("giveAnswer").style.visibility = "visible";
        }
    }
}