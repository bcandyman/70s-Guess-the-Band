// Variables
var bandNames = [
    "AC/DC",
    "Black Sabbath",
    "Deep Purple",
    "Iron Maiden",
    "Judas Priest",
    "Led Zeppelin",
    "Motorhead",
    "Rainbow",
    "Rush",
];

var bandSong = {
    "AC/DC"         : "High Voltage",
    "Black Sabbath" : "Children of the Grave",
    "Deep Purple"   : "Space Truckin'",
    "Iron Maiden"   : "Hallowed Be Thy Name",
    "Judas Priest"  : "Victim of Changes",
    "Led Zeppelin"  : "Black Dog",
    "Motorhead"     : "No Class",
    "Rainbow"       : "Man On the Silver Mountain",
    "Rush"          : "Working Man"
}

var chosenBandName;
var guessedCharacters = ["a"] ;
var guessesRemaining = 6;
var inGame = false ;
var wins = 0 ;
var correctCharacters = [] ;
var incorrectCharacters = [] ;
var audio ;

var x = document.getElementById("myAudio"); 




// +++++Functions+++++++

//Tests if string is present in array
//arr = array, char = string to find, addToArray is boolean and adds to array if true
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

//Populates ID tag in html document
//str = string to be displayed in html, ID = ID tag in html, appendMode is boolean and adds to end of current content if true
function populateID (str, ID, appendMode){
    if (appendMode){
        document.getElementById(ID).innerHTML = document.getElementById(ID).innerHTML + str ;
        // document.getElementById(ID).innerHTML = document.getElementById(ID).innerHTML + str ;
    }
    else{
        document.getElementById(ID).innerHTML = str ;
    }
}

//Resets variables and html content
function clearDocument(){
    inGame = false ;
    chosenBandName = "" ;
    correctCharacters = [] ;
    incorrectCharacters = [] ;
    guessesRemaining = 6 ;
    populateID("", "currentWord", false) ;
    populateID("", "guessedCharacters", false) ;
    populateID("", "guessesRemaining", false) ;
    document.getElementById("startGame").style.visibility = "initial" ;
    // x.pause()
    stopAudio()
}

//Plays audio
//audioFileName = file name only. Audio files must be in audio folder.
function playAudio(audioFileName){
    document.getElementById("myAudio").src = "assets/audio/" + audioFileName + ".mp3"
    x.volume=1;
    x.play();
}

//Fades audio out before pausing
function stopAudio(){
    for(i=1;i>0; i-= .01){
        sleep(10) ;
        console.log(i) ;
        x.volume=i ;
    }
    x.pause()
}

//Stalls reader in function for given time
//milliseconds = Amount of time to stall..
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
        }
    }


//
document.onkeypress = function(event) {
    //Variable is set to lower case ascii code of keypress
    var userGuessCode = event.key.toUpperCase().charCodeAt(0);
    var userGuess = String.fromCharCode(userGuessCode)

    //Starts game if not already started
    if (inGame === false && userGuess === " ") {
        clearDocument()
        inGame = true;
        //chooses word to guess
        chosenBandName = bandNames[Math.floor(Math.random() * bandNames.length)];
        //populates underlines and spaces on html document
        for(var i = 0; i < chosenBandName.length; i++){
            if (chosenBandName.charAt(i) === " "){
                console.log("band name has a space")
                populateID(" ", "currentWord", true)
            }
            else if (chosenBandName.charAt(i) === "/"){
                console.log("band name has a slash")
                populateID("/", "currentWord", true)
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
                        else if (character === "/"){
                            populateID("/", "currentWord", true)
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
                    //decrement guessesRemaining and update html document
                    guessesRemaining-- ;
                    populateID(guessesRemaining, "guessesRemaining", false) ;
                    if (guessesRemaining === 0){
                        alert("Brr... You ran out of tries. Please try again.") ;
                        clearDocument() ;
                    }
                }
            }
        }
    }
    if (chosenBandName === document.getElementById("currentWord").innerHTML){
        console.log(chosenBandName)
        console.log(bandSong[chosenBandName])
        playAudio(bandSong[chosenBandName])
        wins++
        populateID(wins, "wins", false)
        inGame = false ;
        document.getElementById("startGame").style.innerHTML = "PRESS SPACE BAR TO PLAY AGAIN!!"
        document.getElementById("startGame").style.visibility = "initial"

        // clearDocument()
        // playAudio(bandSong[chosenBandName])
    }
}

// document.getElementById("wins").innerHTML = wins ;
// document.getElementById("guessesRemaining").innerHTML = guessesRemaining ;
// document.getElementById("guessedCharacters").innerHTML = guessedCharacters[0] ;