// Variables
var bandNames = [
    "Iron Maiden",
    "Judas Priest",
    "Motorhead",
    "Rush",
    "Scorpions",
    "Thin Lizzy"
];

var chosenBandName;
var guessedCharacters = ["a"] ;
var guessesRemaining = 6;
var inGame = false ;
var wins = 0 ;
var correctCharacters = [] ;
var incorrectCharacters = [] ;


// Functions
function inArr(arr,char,addToArray){
    var wasInArr = arr.includes(char) ;
    if (arr.includes(char)){
        console.log("Character was in array")
    }
    else{
        console.log("Character was not in array")
    }
    return wasInArr
}

function populateID (str, ID, appendMode){
    if (appendMode){
        document.getElementById(ID).innerHTML = document.getElementById(ID).innerHTML + str ;
    }
    else{
        document.getElementById(ID).innerHTML = str ;
    }
}

function clearDocument(){
    inGame = false ;
    chosenBandName = "" ;
    correctCharacters = [] ;
    incorrectCharacters = [] ;
    populateID("", "currentWord", false) ;
    populateID("", "guessedCharacters", false) ;
    populateID("", "guessesRemaining", false) ;
    document.getElementById("startGame").style.visibility = "initial" ;

    // document.location.reload(false) ;
}


//
document.onkeypress = function(event) {
    //Variable is set to lower case ascii code of keypress
    var userGuessCode = event.key.toUpperCase().charCodeAt(0);
    var userGuess = String.fromCharCode(userGuessCode)

    //Starts game if not already started
    if (inGame === false && userGuess === " ") {
        inGame = true;
        //chooses word to guess
        chosenBandName = bandNames[Math.floor(Math.random() * bandNames.length)];
        //populates underlines and spaces on html document
        for(var i = 0; i < chosenBandName.length; i++){
            if (chosenBandName.charAt(i) === " "){
                console.log("band name has a space")
                populateID(" ", "currentWord", true)
            }
            else{
                populateID("_", "currentWord", true)
            }
        document.getElementById("startGame").style.visibility = "hidden" ;
            
        }
    }

    //If game was previously running
    else if (inGame === true) {

        //Tests if key pressed was a letter key
        if (userGuessCode >= 65 && userGuessCode <= 90) {

            //Test if character selected has NOT already been selected.
            if (!inArr(correctCharacters,userGuess,true) && !inArr(incorrectCharacters,userGuess,true)){

                //If selected letter is in bandName
                if (chosenBandName.toUpperCase().includes(userGuess.toUpperCase())){
                    //Add character to correctCharacters array so user cannot reselect letter
                    correctCharacters.push(userGuess)
                    //Clear currentWord field in html document and repopulate with all letters in correctCharacters array
                    populateID("", "currentWord", false)
                    for (var character of chosenBandName) {
                        if (correctCharacters.includes(character.toUpperCase())){
                            populateID(character, "currentWord", true)
                        }
                        else if (character === " "){
                            populateID(" ", "currentWord", true)
                        }
                        else{
                            populateID("_", "currentWord", true)
                        }
                    }
                }

                //If selected letter is not in bandName
                else{
                    //Add character to incorrectCharacters array so user cannot reselect letter
                    incorrectCharacters.push(userGuess) ;
                    //Add character to "guessedCharacters" field on html document
                    if (incorrectCharacters.length != 1){
                        populateID(", ", "guessedCharacters", true)
                    }
                    populateID(incorrectCharacters[incorrectCharacters.length - 1], "guessedCharacters", true)

                    if (guessesRemaining === 0){
                        alert("Brr... You ran out of tries. Please try again.")
                        clearDocument()
                    }
                    //decrement guessesRemaining and update html document
                    guessesRemaining--
                    populateID(guessesRemaining, "guessesRemaining", false)
                }
            }
        }
    }
    if (chosenBandName === document.getElementById("currentWord").innerHTML){
        alert("You did it!!")
        clearDocument()
        wins++
        populateID(wins, "wins", false)
    }
}

document.getElementById("wins").innerHTML = wins ;
// document.getElementById("guessesRemaining").innerHTML = guessesRemaining ;
// document.getElementById("guessedCharacters").innerHTML = guessedCharacters[0] ;