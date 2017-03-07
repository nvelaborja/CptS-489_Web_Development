// Student name: Nathan VelaBorja
// Student ID: 11392441

/// Sudoku 9x9 Class
function Sudoku9x9(arrOf81Values) {
	var cells = new Array();

}

Sudoku9x9.prototype.get3x3 = function(rowIndex, colIndex) {

}

Sudoku9x9.prototype.getColumn = function(colIndex) {

}

Sudoku9x9.prototype.getRow = function(rowIndex) {

}

Sudoku9x9.prototype.toArray = function() {

}

/// SudokuCell Class
function SudokuCell(numPossibleValues) {

	Object.defineProperty(this, "finalizedValue", {enumberable: true, configurable: false, writable: true, value: 0, get: getFinalizedValue, set: setFinalizedValue});
	Object.defineProperty(this, "isFinalized", {enumberable: true, configurable: false, writable: true, value: false, get: getIsFinalized});

	this.possibleValues = new Array();

	for (var i = 1; i <= numPossibleValues; i++) {
		possibleValues.push(i);
	}
}

SudokuCell.prototype.containsPossibility = function(value) {
	return possibleValues.indexOf(value) > -1;
}

SudokuCell.prototype.getFinalizedValue = function() {
	if (!isFinalized) return undefined;
	return isFinalized;
}

SudokuCell.prototype.setFinalizedValue = function(value) {
	isFinalized = true;
	finalizedValue = value;

	// Clear possible values
	possibleValues = new Array();
	// Add value to possible values
	possibleValues.push(value);
}

SudokuCell.prototype.getPossibilities = function() {
	possibleValues.sort();
	return possibleValues;
}

SudokuCell.prototype.getIsFinalized = function() {
	return (isFinalized && finalizedValue && possibleValues.length === 1);
}

SudokuCell.prototype.removePossibility = function(value) {

	if (isFinalized) return false;

	var index = possibleValues.indexOf(value);
	if (index > -1) {
		possibleValues.splice(index, 1);
		return true;
	}

	return false;
}

SudokuCell.prototype.removePossibilities = function(arrOfValues) {
	for (var value of arrOfValues) {
		removePossibility(value);
	}
}

SudokuCell.prototype.toString = function() {
	return getPossibilities().join();
}

/// SudokuCellCollection Class
function SudokuCellCollection(arrOfCells) {
	Object.defineProperty(this, "length", {enumberable: true, configurable: false, writable: true, value: 0, get: getLength});
	this.cells = new Array();
}

SudokuCellCollection.prototype.containsCell = function(cell) {

}

SudokuCellCollection.prototype.containsPossibility = function(value) {

}

SudokuCellCollection.prototype.count = function(predicate) {

}

SudokuCellCollection.prototype.forEach = function(functionThatTakes1CellParam[, startIndex]) {

}

SudokuCellCollection.prototype.getFinalizedValues = function() {

}

SudokuCellCollection.prototype.getPossibilities = function() {

}

SudokuCellCollection.prototype.getLength = function() {

}

SudokuCellCollection.prototype.removeCell = function(cell) {

}

SudokuCellCollection.prototype.removeCells = function(otherCellCollection) {

}

SudokuCellCollection.prototype.removePossibility = function(value) {

}

/// SudokuCellBlock Class : SudokuCellCollection
function SudokuCellBlock(arrOf9Values) {
	// Setup Inheritance
	SudokuCellCollection.call(this, arrOf9Values);

}

// Setup inheritance
SudokuCellBlock.prototype = Object.create(SudokuCellCollection.prototype);

SudokuCellBlock.prototype.trySolve = function() {

}

/// Sudoku3x3Block Class : SudokuCellBlock
function Sudoku3x3Block(arrOf9Values) {
	// Setup Inheritance
	SudokuCellBlock.call(this, arrOf9Values);
}

// Setup Inheritance
Sudoku3x3Block.prototype = Object.create(SudokuCellBlock.prototype);

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnColumn = function(colIndex) {

}

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnRow = function(rowIndex) {

}

Sudoku3x3Block.prototype.isColumnFinalized = function(columnIndex) {

}

Sudoku3x3Block.prototype.isRowFinalized = function(rowIndex) {

}

Sudoku3x3Block.prototype.toString = function() {
	
}











































