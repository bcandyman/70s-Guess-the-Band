// Variables
var bandNames = [
    "IRON MAIDEN",
    "MOTORHEAD",
    "SCORPIONS"
];

var chosenBandName;
var guessedCharacters = ["a"] ;
var guessesRemaining = 6;
var inGame = false ;
var wins = 0 ;
var correctCharacters = [] ;
var incorrectCharacters = [] ;


// Functions
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

function populateID (str, ID, appendMode){
    if (appendMode){
        document.getElementById(ID).innerHTML = document.getElementById(ID).innerHTML + str ;
    }
    else{
        document.getElementById(ID).innerHTML = str ;
    }
}


//
document.onkeypress = function(event) {
    //Variable is set to lower case ascii code of keypress
    var userGuess = event.key.charCodeAt(0);

    //Starts game if not already started
    if (inGame === false && userGuess === 32) {
        inGame = true;
        chosenBandName = bandNames[Math.floor(Math.random() * bandNames.length)];
        for(var i = 0; i < chosenBandName.length; i++){
            if (chosenBandName.charAt(i) === " "){
                populateID(" ", "currentWord", true)
            }
            else{
                populateID("_", "currentWord", true)
            }
            
        }
        console.log("Game has begun!")
        console.log (chosenBandName)
    }

    //If game was previously running
    else if (inGame === true) {

        //Tests if key pressed was a letter key
        if ((userGuess >= 97 && userGuess <= 122) || (userGuess >= 65 && userGuess <= 90)) {

            //Test if character selected has NOT already been selected.
            if (!inArr(correctCharacters,userGuess,true) && !inArr(incorrectCharacters,userGuess,true)){
                console.log(chosenBandName.includes(String.fromCharCode(userGuess)))

                //If selected letter is in bandName
                if (chosenBandName.includes(String.fromCharCode(userGuess))){
                    correctCharacters.push(String.fromCharCode(userGuess))
                    var index = 0;
                    populateID("", "currentWord", false)
                    for (var character of chosenBandName) {
                        
                        if (correctCharacters.includes(character)){
                            populateID(character, "currentWord", true)
                        }
                        else{
                            populateID("_", "currentWord", true)
                        }
                        // if (chosenBandName.charCodeAt(index) === character){
                        
                        // }
                        

                        if (character.toLowerCase() === String.fromCharCode(userGuess)) {
                            console.log(index);
                        }
                        index++;
                    }
                    console.log("adding " + String.fromCharCode(userGuess) + " to correctCharacters array")
                    
                }

                //If selected letter is not in bandName
                else{
                    incorrectCharacters.push(String.fromCharCode(userGuess))
                    if (incorrectCharacters.length != 1){
                        populateID(",", "guessedCharacters", true)
                    }
                    populateID(incorrectCharacters[incorrectCharacters.length - 1], "guessedCharacters", true)
                    guessesRemaining--
                    populateID(guessesRemaining, "guessesRemaining", false)
                }

            }
        }
    }
}

document.getElementById("wins").innerHTML = wins ;
// document.getElementById("guessesRemaining").innerHTML = guessesRemaining ;
// document.getElementById("guessedCharacters").innerHTML = guessedCharacters[0] ;