"use strict";

// an array to hold a random list of words.
var myWords = ["aerolite","asteroid","astrology","astrophysics","astology","atom","aurora","cluster","constellation","cosmos","cosmology","eclipse","galaxy",
				"meteor","meteorite","nebula","neutrino","nova","orbit","ozone","parsec","photosphere","planet","proton","satellite","solar","solstice","star","supernova"];

// randomly select a word from the array above, and store in avariable called hiddenWord	.			
var hiddenWord = myWords[Math.floor(Math.random() * myWords.length)];

// split the characters of hiddenWord into an array
var hiddenWordArray = hiddenWord.split("");

// create an array displayedWordArray which will represent the selected word on screen.
var displayedWordArray = [];
for(var i = 0; i < hiddenWord.length; i++){
    displayedWordArray[i] = "-";
}

// create a variable to store the length of the selected word, another to set number of guesses equal to 10.
var hiddenWordLength = hiddenWord.length;
var numberOfGuesses = 10;

// create a variable to hold what the player guesses, another to act as a checker to see if the player has guesses a letter correctly.
var guess;
var isGuessCorrect = hiddenWordLength;

// A variable to represent which image should be displayed on screen, depending on how many guesses the player has left.
var imageNumber=0;

// a variable to alternate between two victory images, set to 0 initially until the player wins
var victoryImageNumber=0;

// call the function to start the game.
startGame();


// an unnamed function to reload the game if the player clicks the reset button.
$("#initialiser").click(function(){
    $("#initialiser").text("Reset");
    window.location.reload();
})

// a function to update the image on screen
function getImage(){
	 if(imageNumber==1){
		$("img").attr("src","images/1.png").append("#canvas");
	}else if(imageNumber==2){
		$("img").attr("src","images/2.png").append("#canvas");
	}else if(imageNumber==3){
		$("img").attr("src","images/3.png").append("#canvas");
	}else if(imageNumber==4){
		$("img").attr("src","images/4.png").append("#canvas");
	}else if(imageNumber==5){
		$("img").attr("src","images/5.png").append("#canvas");
	}else if(imageNumber==6){
		$("img").attr("src","images/6.png").append("#canvas");
	}else if(imageNumber==7){
		$("img").attr("src","images/7.png").append("#canvas");
	}else if(imageNumber==8){
		$("img").attr("src","images/8.png").append("#canvas");
	}else if(imageNumber==9){
		$("img").attr("src","images/9.png").append("#canvas");
	}else if(imageNumber==10){
		$("img").attr("src","images/10.png").append("#canvas");
	}
}

// a function to display the victory image and alter between the two
function getVictoryImage(){
	 if(victoryImageNumber==1){
		$("img").attr("src","images/victory_1.png").append("#canvas");
		victoryImageNumber=2;
	}else if (victoryImageNumber==2){
		$("img").attr("src","images/victory_2.png").append("#canvas");
		victoryImageNumber=1;
	}
}
setInterval(getVictoryImage, 500);


// the main function to play the game
function startGame(){

    //initial display on screen
    $("#display").text(displayedWordArray.join(""));
    $("#info").text("Think outer space! Type a letter! You have 10 lives!");

	// disable a clicked letter button. Change it's class to disabled
    $('.letter').click(function(){
        $("#display").text(displayedWordArray.join(""));
        guess = $(this).text();
        $(this).prop('disabled', true);
		$(this).attr('class', 'disabled');
		
		// set the guess checker, isGuessCorrect, equal to the length of hidden letters of the selected word
        isGuessCorrect = hiddenWordLength;
		
        if((numberOfGuesses>0) && (hiddenWordLength>0)){

		// if guess is correct, update the index of the correctly guesses letter and display on screen. Decrement hiddenWordLength for each hidden letter found
            for(var i in hiddenWordArray) {
                if ((hiddenWordArray[i] == guess) && (displayedWordArray[i] != guess)) {
                    displayedWordArray[i] = guess;
                    hiddenWordLength--;
					// increase guess checker if the letter has already been guessed to avoid losing a life
                }else if((hiddenWordArray[i] == guess) && (displayedWordArray[i] == guess)){
                    isGuessCorrect++;
                }
            }
            $("#display").text(displayedWordArray.join(""));

			// this loop runs if the player guesses a wrong letter
            if(isGuessCorrect == hiddenWordLength){
                numberOfGuesses--;
				imageNumber++;
				getImage();
            }
			if(numberOfGuesses ==  1){
            $("#info").text("You have " + numberOfGuesses + " life left!");
			}else{
				$("#info").text("You have " + numberOfGuesses + " lives left!");
			}
        }
		// check if the player wins or loses
        if(numberOfGuesses==0){
			$("#display").text("The answer was " + hiddenWordArray.join(""));
            $("#letters").empty();
            $("#info").text("Game over! End of the line for this space cowboy :(")
        }else if(hiddenWordLength==0){
            $("#letters").empty();
            $("#info").text("Congratulations! Space cowboy lives to fly another day! :D");
			victoryImageNumber=1;
			getVictoryImage();
        }

    });

}

