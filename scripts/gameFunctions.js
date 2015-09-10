'use strict';
/*
 * Returns the number 1 if the gameTypeString is 1 player and the number 2 if
 * the gameTypeString is 2 players. If the gameTypeString is invalid it should
 * return false.
 *
 * valid options include: '1', 'one', '2', or 'two'.
 * The function should be case insensitive, so 'one' and 'ONE' should both
 * result in true.
 */
function validateGameType(gameTypeString) {
	if (typeof gameTypeString === 'object') {
		return false;
	}
	if (gameTypeString == 1 || gameTypeString.toLowerCase() === 'one') {
		return 1;
	}
	else if (gameTypeString == 2 || gameTypeString.toLowerCase() === 'two') {
		return 2;
	}
		return false;
}

/*
 * Returns the players name if it is a valid name. Valid names must only contain
 * letters, hyphens or spaces and must contain at least one letter. Returns
 * false if the name is not valid.
 */
function validateName(name) {

	if (typeof validateName === 'object') {
		return false;
	}
	if (name === '' && !isNaN(name)){
		return false;
	}
	if (name !== /^[a-z\d\-_\s]+/) {
		return false;
	}
	else {
		return name;
	};
}

/*
 * Randomly generates and returns a name for a computer player.
 */
function generateComputerName() {
	var firstName = [
	'Aaron',
	'Gary',
	'John',
	'Ash',
	'Mike'
	];

	var nameChoose = Math.random();

	if (nameChoose <= 0.2) {
		return firstName[0];
	} else if (nameChoose > 0.21 && nameChoose <= 0.4) {
		return firstName[1];
	} else if (nameChoose > 0.41 && nameChoose <= 0.6) {
		return firstName[2];
	} else if (nameChoose > 0.61 && nameChoose <= 0.8) {
		return firstName[3];
	} else {
		return firstName[4];
	}
}

/*
 * Converts the moveString (which should be in the formate 'x y') into an object
 * with x and y properties as numbers. The x and y properties in the object
 * should be numbers that correspond to positions in the gameBoard matrix.
 *
 * For example:
 * If the moveString was '2 3' then the return value should be:
 * {
 *	  x: 1,
 *	  y: 2
 * }
 *
 * Notice that the values in the return object are one less than the inpute
 * values. This is because the gameBoard is zero-indexed (meaning it starts at
 * position 0 instead of position 1 so every position is one smaller than the
 * values in the moveString).
 *
 * If the moveString is not in the correct format (ie. 'x y') then the function
 * should throw an 'Invalid input: the move must be in the format "x y"'
 * exception.
 */
function parseMove(moveString) {
	if (typeof moveString === !String) {
		throw 'Invalid input: the move must be in the format "x y"'
	}
	if (moveString instanceof Object) {
		throw 'Invalid input: the move must be in the format "x y"';
	}
	if (moveString === false) {
		throw 'Invalid input: the move must be in the format "x y"';
	}

	var moveStringAnswer = moveString.split(' ');
	var x = moveStringAnswer[0]-1;
	var y = moveStringAnswer[1]-1;

	var moveObject = {
		x: x,
		y: y
	}

	
	if (isNaN(y) || isNaN(x) || (2 !== moveStringAnswer.length)) {
		throw 'Invalid input: the move must be in the format "x y"';
	}
	else {
		return moveObject;
	}

}

/*
 * Validate the moveObject.
 *
 * If the x and y coordinates in the moveObject are outside the game board (ie.
 * they are greater than 2 or less than 0) then the function should throw an
 * 'Invalid move: the coordinates are outside the game board' exception.
 *
 * If the position on the gameBoard associated with the x and y coordinates is
 * already taken (ie. the associated position on the game board is *not* and
 * single space) then the function should throw an 'Invalid move: that spot is
 * already taken' exception.
 *
 * If there are no errors then the function should return the move object.
 */
function validateMove(moveObject, gameBoard) {

	if ((moveObject.y < 0) || (moveObject.y >2) || (moveObject.x < 0) || (moveObject.x >2)) {
		throw'Invalid move: the coordinates are outside the game board';
	} else if (' ' !== gameBoard[moveObject.y][moveObject.x]) {
		throw'Invalid move: that spot is already taken';
	} else {
		return moveObject;
	}
}

/*
 * Convert the gameBoard matrix to a string. You can use \n to denote a newline
 * within a string. For a matrix like this:
 * gameBoard = [
 *     [' ', 'X', ' '],
 *     [' ', ' ', ' '],
 *     [' ', ' ', ' '],
 * ]
 * the resulting string should look like this:
 *      1   2   3
 *   ~~~~~~~~~~~~~
 * 1 |   | X |   |
 *   ~~~~~~~~~~~~~
 * 2 |   |   |   |
 *   ~~~~~~~~~~~~~
 * 3 |   |   |   |
 *   ~~~~~~~~~~~~~
 */
function getGameBoardString(gameBoard) {

	return '     1   2   3 \n  ~~~~~~~~~~~~~\n1 | '+ gameBoard[0][0] +' | '+ gameBoard[0][1] +' | '+ gameBoard[0][2] +' |\n  ~~~~~~~~~~~~~\n2 | '+ gameBoard[1][0] +' | '+ gameBoard[1][1] +' | '+ gameBoard[1][2] +' |\n  ~~~~~~~~~~~~~\n3 | '+ gameBoard[2][0] +' | '+ gameBoard[2][1] +' | '+ gameBoard[2][2] +' |\n  ~~~~~~~~~~~~~\n'
}

/*
 * Given a playerString (either 'X' or 'O'), a moveObject and a gameBoard
 * matrix, make the move on the gameBoard and return the gameBoard.
 */
function makeMove(playerString, moveObject, gameBoard) {
	gameBoard[moveObject.y][moveObject.x] = playerString;
	return gameBoard;
}

/*
 * Return the number of empty spaces that currently exist within the gameBoard
 * matrix. This function should work regardless of the size of the game board.
 * For example, the game board might be 3x3, 4x4, or 5x7.
 */
function getEmptySpaceCount(gameBoard) {
	function isEmpty(x, y) {
		return gameBoard[y][x] === ' ';
	}
	var emptySpaces = 0;
	for(var y = 0; y < gameBoard.length; y++){
		for(var x = 0; x < gameBoard[y].length; x++) {
			if (isEmpty(x, y)) {
				emptySpaces++;
			}
		}
	}
	console.log(emptySpaces);
	return emptySpaces;

}

/*
 * Return the player (either 'X' or 'O') who should go next, based on the
 * current player. If the currentPlayer is 'X' then the function should return
 * 'O' and vice versa.
 */
function getNextPlayer(currentPlayer) {
	if (currentPlayer === 'O') {
		return 'X';
	} 
	else {
			return 'O';
	}
}

/*
 * Determine and return the winning player (either 'X' or 'O') based on the
 * gameBoard matrix. If there is no winner than the function should return null.
 */
function getWinner(gameBoard) {
	var xGameBoard1 = gameBoard[0][0] && gameBoard[1][0] && gameBoard[2][0];
	var xGameBoard2 = gameBoard[0][1] && gameBoard[1][1] && gameBoard[1][2];
	var xGameBoard3 = gameBoard[0][2] && gameBoard[1][2] && gameBoard[2][2];
	var xGameBoard4 = gameBoard[0][0] && gameBoard[0][1] && gameBoard[0][2];
	var xGameBoard5 = gameBoard[1][0] && gameBoard[1][1] && gameBoard[1][2];
	var xGameBoard6 = gameBoard[2][0] && gameBoard[2][1] && gameBoard[2][2];
	var xGameBoard7 = gameBoard[0][0] && gameBoard[1][1] && gameBoard[2][2];
	var xGameBoard8 = gameBoard[2][0] && gameBoard[1][1] && gameBoard[0][2];
	var oGameBoard1 = gameBoard[0][0] && gameBoard[1][0] && gameBoard[2][0];
	var oGameBoard2 = gameBoard[0][1] && gameBoard[1][1] && gameBoard[1][2];
	var oGameBoard3 = gameBoard[0][2] && gameBoard[1][2] && gameBoard[2][2];
	var oGameBoard4 = gameBoard[0][0] && gameBoard[0][1] && gameBoard[0][2];
	var oGameBoard5 = gameBoard[1][0] && gameBoard[1][1] && gameBoard[1][2];
	var oGameBoard6 = gameBoard[2][0] && gameBoard[2][1] && gameBoard[2][2];
	var oGameBoard7 = gameBoard[0][0] && gameBoard[1][1] && gameBoard[2][2];
	var oGameBoard8 = gameBoard[2][0] && gameBoard[1][1] && gameBoard[0][2];
	if (xGameBoard1 === 'X' || xGameBoard2 === 'X' || xGameBoard3 === 'X' || xGameBoard4 === 'X' || xGameBoard5 === 'X' || xGameBoard6 === 'X' || xGameBoard7 === 'X' || xGameBoard8 === 'X') {
		return 'X';
	} else	if (oGameBoard1 === 'O' || oGameBoard2 === 'O' || oGameBoard3 === 'O' || oGameBoard4 === 'O' || oGameBoard5 === 'O' || oGameBoard6 === 'O' || oGameBoard7 === 'O' || oGameBoard8 === 'O') {
		return 'O';
	} else {
		return null;
	}
}

/*
 * Validate a yes/no answer. If the yesNoString is 'y' or 'yes' then the
 * function should return true. If the yesNoString is 'n' or 'no' then the
 * function should return false. If the yesNoString is neither of those options
 * then the function should return null. The function should be case
 * insensitive, so it should accept both 'Y' and 'y' for example.
 */
function validateYesNo(yesNoString) {
 var newAnswer = yesNoString.toLowerCase();

 if (newAnswer === 'y' || newAnswer === 'yes') {
 	return true;
 } else if (newAnswer === 'n' || newAnswer === 'no') {
 	return false;
 } else {
 	return null;
 }
}

/*
 * Receives a player (either 'X' or 'O') and a game board. Returns the best move
 * for the chosen player based on the following algorithm:
 *
 * Choose the first available move:
 * 1. Win: If the player has two in a row, they can place a third to get three
 *    in a row.
 * 2. Block: If the opponent has two in a row, the player must play the third
 *    themselves to block the opponent.
 * 3. Fork: Create an opportunity where the player has two threats to win (two
 *    non-blocked lines of 2).
 * 4. Blocking an opponent's fork:
 *       Option 1: The player should create two in a row to force the opponent
 *                 into defending, as long as it doesn't result in them creating
 *                 a fork. For example, if "X" has a corner, "O" has the center,
 *                 and "X" has the opposite corner as well, "O" must not play a
 *                 corner in order to win. (Playing a corner in this scenario
 *                 creates a fork for "X" to win.)
 *       Option 2: If there is a configuration where the opponent can fork, the
 *                 player should block that fork.
 * 7. Center: A player marks the center. (If it is the first move of the game,
 *    playing on a corner gives "O" more opportunities to make a mistake and may
 *    therefore be the better choice; however, it makes no difference between
 *    perfect players.)
 * 8. Opposite corner: If the opponent is in the corner, the player plays the
 *    opposite corner.
 * 9. Empty corner: The player plays in a corner square.
 * 10 Empty side: The player plays in a middle square on any of the 4 sides.
 *
 * This strategy taken from wikipedia:
 * https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
 *
 * You may want to break this function up into more tha one other functions.
 * Perhaps one for each type of moves a player could make.
 *
 * The move should be returned as a move object with x and y properties. For
 * example: { x: 0, y: 0 }.
 */
function getComputerPlayerMove(player, gameBoard) {
	// This code just moves to the next available space instead of using the
	// algorithm outlined above.
	for(var y = 0; y < gameBoard.length; y++) {
		for(var x = 0; x < gameBoard[y].length; x++) {
			if(gameBoard[y][x] === ' ') {
				return {x: x, y: y};
			}
		}
	}
	return null;
}

/*
 * Don't mess with this code :)
 */
module.exports = {
	validateGameType: validateGameType,
	validateName: validateName,
	generateComputerName: generateComputerName,
	parseMove: parseMove,
	validateMove: validateMove,
	getGameBoardString: getGameBoardString,
	makeMove: makeMove,
	getEmptySpaceCount: getEmptySpaceCount,
	getNextPlayer: getNextPlayer,
	getWinner: getWinner,
	validateYesNo: validateYesNo,
	getComputerPlayerMove: getComputerPlayerMove
};