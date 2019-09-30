var bandNames = [
    "Iron Maiden",
    "Motorhead",
    "Scorpions"
];

var chosenBandName;
var guessedCharacters = ["a"] ;
var guessesRemaining = 0;
var inGame = false ;
var wins = 0 ;
var correctCharacters = [] ;
var incorrectCharacters = [] ;

function inArr(arr,charCode,addToArray){
    var wasInArr = arr.includes(String.fromCharCode(charCode));
    if (arr.includes(String.fromCharCode(charCode))){
        console.log("Character was in array")
    }
    else{
        console.log("Character was not in array")
        // if (addToArray){
            // console.log("Character is being saved into array")
            // arr.push(String.fromCharCode(charCode)) ;
        // }
    }
    return wasInArr
}

document.onkeypress = function(event) {
    //Variable is set to lower case ascii code of keypress
    var userGuess = event.key.toLowerCase().charCodeAt(0);

    //Starts game if not already started
    if (inGame === false && userGuess === 32) {
        inGame = true;
        chosenBandName = bandNames[Math.floor(Math.random() * bandNames.length)];
        console.log("Game has begun!")
        console.log (chosenBandName)
    }

    //If game was previously running
    else if (inGame === true) {

        //Tests if key pressed was a letter key
        if (userGuess >= 97 && userGuess <= 122) {

            //Test if character selected has already been selected.
            if (!inArr(correctCharacters,userGuess,true) && !inArr(incorrectCharacters,userGuess,true)){
                console.log(chosenBandName.includes(String.fromCharCode(userGuess)))
                if (chosenBandName.includes(String.fromCharCode(userGuess))){
                    var index = 0;
                    for (var character of chosenBandName) {
                        if (character.toLowerCase() === String.fromCharCode(userGuess)) {
                            console.log(index);
                        }
                        index++;
                    }
                    console.log("adding " + String.fromCharCode(userGuess) + " to correctCharacters array")
                    correctCharacters.push(String.fromCharCode(userGuess))
                }
                else{
                    console.log("adding " + String.fromCharCode(userGuess) + " to incorrectCharacters array")
                    incorrectCharacters.push(String.fromCharCode(userGuess))
                    console.log("length: " + incorrectCharacters.length)
                    // document.getElementById("guessedCharacters").innerHTML = document.getElementById("guessedCharacters").innerHTML + ", " ;
                    if (incorrectCharacters.length != 1){
                        document.getElementById("guessedCharacters").innerHTML = document.getElementById("guessedCharacters").innerHTML + ", " ;
                    }
                    document.getElementById("guessedCharacters").innerHTML = document.getElementById("guessedCharacters").innerHTML + incorrectCharacters[incorrectCharacters.length - 1] ;
                }

            }
        }
    }
}

document.getElementById("wins").innerHTML = wins ;
// document.getElementById("guessesRemaining").innerHTML = guessesRemaining ;
// document.getElementById("guessedCharacters").innerHTML = guessedCharacters[0] ;