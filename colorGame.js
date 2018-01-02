//creates the initial array of random rgb colors.
var colors = populateColorsArray(6);

//select initial random goal color.
var goalColor = colorPickerRandom();

//display goal color.
var colorDisplay = document.querySelector("#goal");
colorDisplay.textContent = goalColor;

//displays try again or correct message.
var wlMessageDisplay = document.querySelector("#message");

//selects squares.
var squares = document.querySelectorAll(".square");

//used to select a new color if you want to reset the game.
var newColorButton = document.querySelector("#newColor");

//selects the Easy and Hard difficulty buttons.
var easyButton = document.querySelectorAll(".difficulty")[0];
var hardButton = document.querySelectorAll(".difficulty")[1];



//					------------------------
//					  Listener Assignments
//					-------------------------

//Assigns event listeners to the 'squares' (now circles) & main logic.
for(var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click", function () {
		console.log(this.style.backgroundColor);
		if(this.style.backgroundColor === goalColor){

			wlMessageDisplay.textContent = "Correct";
			changeAllTiles(this.style.backgroundColor, 6);
			document.querySelector("h1").style.backgroundColor=this.style.backgroundColor;
			newColorButton.textContent = "Play Again?";
		}else{

			this.style.backgroundColor = "#232323"; 
			wlMessageDisplay.textContent = "Try again";

		}

	});

}

/**	
*	Adds listener to each button and calls Reset (difficulty) function for easy or hard mode.
*	Adds or removes the easyMode class from the bottom row of squares (toggles visability).
*	Toggles the selected class on and off between buttons.
*/
easyButton.addEventListener("click",function(){
	hardButton.classList.remove("selected");
	this.classList.add("selected");
	reset("easy");
	for (var i = 3; i < squares.length; i++) {
		squares[i].classList.add("easyMode");
	}
});
hardButton.addEventListener("click",function(){
	easyButton.classList.remove("selected");
	this.classList.add("selected");
	reset("hard");
	for (var i = 3; i < squares.length; i++) {
		squares[i].classList.remove("easyMode");
	}
});


//Creates a reset button, changes the botton text to new color,
//if the squares contain class easyMode: easy reset, else hardMode reset.
newColorButton.addEventListener("click", function () {
		this.textContent = "New Color ?"
		if(squares[3].classList.contains("easyMode"))
			reset("easy");
		else
			reset("hard");
});



//						------------------------
//							   Functions
//						-------------------------

//Populates an array with a specified(length)number of random RGB colors [0,255]
function populateColorsArray(length){
	var arr = new Array();
	for(var i = 0; i < length; i++){
		var str ="rgb(";
		for(var j = 0; j<3; j++){
			if(j !== 2)
				str+= Math.floor(Math.random() * 256) + ", ";
			else
				str += Math.floor(Math.random() * 256) + ")";
		}
		arr[i]= str;
	}
	return arr;
}

//return: returns a color in the colors array with an index [0, colors.length)
function colorPickerRandom () {
	return colors[goalColor= Math.floor(Math.random() * colors.length)];
}

/**
*@param(color): this method switches its function based on what is passed in,
* 	If color === null, it will reset all the color squares b/c the user reset them.
* 	If color !== null, it will change all tiles to the winning color b/c the user won.
*@param(len): the number of squares to color (changes from 3 to 6 based on difficulty).
*/
function changeAllTiles(color, len) {
	if(color=== null){ //reset the colors
		for(var i = 0; i < len; i++){
			squares[i].style.backgroundColor = colors[i];
		}
	}else{ // change all colors to winning color
		for(var i = 0; i < len; i++){
			squares[i].style.backgroundColor = color;
		}
	}
}

/**
*@param(difficulty): This method resets h1 background styling, repopulates the colors array,
*	changes the goal color to a new color from that array based on difficulty,
*	updates the color display to display the newly selected goal color,
*	removes the try again/correct message by setting it to empty string,
*	changes all the tiles to the newly generated color tiles from colors aray.
*/
function reset (difficulty) {
	if(difficulty === "easy"){
		document.querySelector("h1").style.backgroundColor= null;
		colors = populateColorsArray(3);
		goalColor = colorPickerRandom();
		colorDisplay.textContent = goalColor;
		wlMessageDisplay.textContent = "";
		changeAllTiles(null,3);
	}else{
		document.querySelector("h1").style.backgroundColor= null;
		colors = populateColorsArray(6);
		goalColor = colorPickerRandom();
		colorDisplay.textContent = goalColor;
		wlMessageDisplay.textContent = "";
		changeAllTiles(null,6);
	}
}

