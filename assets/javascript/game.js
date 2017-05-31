document.addEventListener("DOMContentLoaded", function(event) { 

var dictionary = ["thundercats", "recess", "futurama", "superman", "animaniacs", "arthur", "daria", "doug", "freakazoid", "pokemon", "rugrats", "ultraforce", "hammerman", "voltron", "batman"];
var game_round = 0;
var word = '';
var cur_word = [];
var guesses = [];
var guess = '';
var remaining = 0;
var score = 0;

initialize_game();

document.onkeyup = function(event){

	guess = event.key;

	var result = check_guess(guess,word);

	if(result){
		fill_in_blanks(guess);
	}
	update_progress();

	if (check_win()){
		score ++;
		game_round ++;
		word = dictionary[game_round];
		reset_new_round();
	}
	else if (remaining === 0){
		game_round ++;
		word = dictionary[game_round];
		reset_new_round();
	}
}

function initialize_game (){
	word = dictionary[game_round];
	remaining = 12;
	score = 0;
	initialize_cur_word(word);
	print_word(cur_word);
	print_guesses(guesses);
	document.getElementById("remaining").innerHTML = remaining;
	document.getElementById("score").innerHTML = score;
	
}

function reset_new_round (){
	word = dictionary[game_round];
	remaining = 12;
	guesses = [];
	cur_word = [];
	initialize_cur_word(word);
	print_word(cur_word);
	print_guesses(guesses);
	document.getElementById("remaining").innerHTML = remaining;
	document.getElementById("score").innerHTML = score;
	
}

function check_win(){

	var result = false;

	if (cur_word.indexOf('-') === -1){
		result = true;
	}
	else {
		result = false;
	}

	return result;

}

function update_progress(){

	if(guesses.indexOf(guess) === -1){
		guesses.push(guess);
		remaining --;

		document.getElementById("remaining").innerHTML = remaining;
		document.getElementById("score").innerHTML = score;

		print_word(cur_word);
		print_guesses(guesses);
	}

}

function initialize_cur_word(){
	for(var i = 0; i<word.length; i++){
		cur_word.push("-");
	}
}

function fill_in_blanks(guess){
	for(var i = 0; i < word.length; i++){
		if (word[i] === guess){
			cur_word[i] = guess;
		}
	}
}

function print_word (word){
	var output = "";

	for(var i = 0; i < word.length; i++){
		output += word[i];

		if (i !== word.length){
			output += " ";
		}
	}

	document.getElementById("word").innerHTML = output;
}

function print_guesses(guesses){
	var output = "";

	for(var i = 0; i < 12; i++){
		
		if(typeof guesses[i] == 'undefined'){
        	output += '-';
		}
		else{
			output += guesses[i];
		}

		if (i !== 12){
			output += " ";
		}
	}

	document.getElementById("guesses").innerHTML = output;
}

function check_guess(guess, word){

	var result = false;

	if (word.indexOf(guess) !== -1){
		result = true;
	}
	else {
		result = false;
	}

	return result;
}

});