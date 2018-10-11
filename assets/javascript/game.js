/* 
    Javier Ventura
    Homework 3 Word Guess Game
    10/11/18
*/

//Global Variables
var numWins=0;      //Number of Wins for Player
var numLosses=0;    //Number of Losses for Player
var numGuess=9;     //Number of Guesses Left

//Letters to choose from
var pokemonList=['pikachu','charmander','bulbasaur','squirtle','zubat','bellsprout','rattata','eevee','snorlax','jigglypuff',
                'psyduck','venonat','abra','mankey','caterpie','meowth','dratini','mew','weedle','pidgey'];

//Letters user has tried
var guesses=[];     //Empty Array to be filled as user inputs tries

//Set answer to game
var answer=pokemonList[Math.floor(Math.random()*pokemonList.length)];

//Array to be built by user inputs that are correct 
var pieceTogether=[];

var playerWord;

/* 
==============================================================
    Restart Function
    - Will Reset Number of tries to 9
    - Reset What Letters User Has Tried
==============================================================
*/

function restart() {
    numGuess=9;
    guesses=[];
}

/* 
==============================================================
    Change Pokemon Function
    - Will Reset What the Answer is for another round
==============================================================
*/

function changePokemon() {
    answer=pokemonList[Math.floor(Math.random()*pokemonList.length)];
}

/* 
==============================================================
    Calculate Tries Function
    - Will Calculate How Many tries are left and Output it
==============================================================
*/

function calcTries() {
    document.querySelector("#numLeft").innerHTML="Guesses Left: "+numGuess;
}

/* 
==============================================================
    List Tries Function
    - Will Show What Letters User Has Tried
==============================================================
*/

function listTries() {
    document.querySelector("#usedLetters").innerHTML="Your Guesses So Far: "+guesses.join(' ');
}

/* 
==============================================================
    Reset Progress Function
    - Will Reset Array of the Word User has Built
==============================================================
*/

function resetProgress() {
    for(i=0;i<answer.length;i++){
        pieceTogether[i]='_';
    }
}

/* 
==============================================================
    Show Progress Function
    - Will Show Array of Word User has Built
==============================================================
*/

function showProgress() {
    document.querySelector("#wordSpace").innerHTML=playerWord;
}

/*
==============================================================
    Turn To String Function
    - Will Turn Array User has Built into 1 Word String
==============================================================
*/

function turnToString() {
    playerWord=JSON.stringify(pieceTogether);
}
 
calcTries();
resetProgress();
turnToString();
showProgress();
console.log(answer);

//When Player presses key game will start
document.onkeyup=function(event) {
    numGuess--;     //Take 1 try away

    var keyPressed=String.fromCharCode(event.keyCode).toLowerCase();   //Store Try into variable

    guesses.push(keyPressed);   //Add Attempt Into Array of Tries
    calcTries();                //Calculate Tries Again
    listTries();                //Show Tried Letters

    for(i=0;i<answer.length;i++){
        if(keyPressed===answer[i]){
            pieceTogether[i]=answer[i];
        }
    }

    turnToString();
    showProgress();

    //If The Word Player Has built Matches the Answer
    if(playerWord==answer){
        numWins++;          //Increase Number of Wins
        document.querySelector("#wins").innerHTML="Wins: "+numWins; //Output Updated Wins
        //Reset Everything 
        restart();      //Number of Guesses Back to 9 and Tries Array Empty
        changePokemon(); //Change the Answer to Game
        calcTries();    //Output Updated Tries Count
        listTries();    //Update Tried Letters
        resetProgress();
        showProgress(); 
    }

    //If Player Reaches 0 Tries Left
    if(numGuess<=0){
        numLosses++;          //Increase Number of Losses
        document.querySelector("#losses").innerHTML="Losses: "+numLosses;
        //Reset Everything 
        restart();      //Number of Guesses Back to 9 and Tries Array Empty
        changePokemon(); //Change the Answer to Game
        calcTries();    //Output Updated Tries Count
        listTries();    //Update Tried Letters
        resetProgress();
        showProgress(); 
    }
}