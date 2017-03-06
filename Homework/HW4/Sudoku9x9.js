// Student name: Nathan VelaBorja
// Student ID: 11392441

/// Sudoku 9x9 Class
function Sudoku9x9(arrOf81Values) {

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
//Object.defineProperty(this, "x", {enumberable: false, configurable: false, value: x, writable: true });
	var FinalizedValue = 0;
	var IsFinalized = false;

	Object.defineProperty(this, "finalizedValue", {enumberable: true, configurable: false, writable: true, value: FinalizedValue, get: getFinalizedValue, set: setFinalizedValue});
	Object.defineProperty(this, "isFinalized", {enumberable: true, configurable: false, writable: true, value: IsFinalized, get: getIsFinalized});

}

SudokuCell.prototype.containsPossibility = function(value) {

}

SudokuCell.prototype.getFinalizedValue = function() {

}

SudokuCell.prototype.setFinalizedValue = function(value) {

}

SudokuCell.prototype.getIsFinalized = function() {

}

SudokuCell.prototype.removePossibility = function(value) {

}

SudokuCell.prototype.removePossibilities = function(arrOfValues) {

}

SudokuCell.prototype.toString = function() {

}

/// SudokuCellCollection Class
function SudokuCellCollection(arrOfCells) {

	var Length = 0;

	Object.defineProperty(this, "length", {enumberable: true, configurable: false, writable: true, get: getLength});
}

SudokuCellCollection.prototype.containsCell = function(cell) {

}

SudokuCellCollection.prototype.containsPossibility = function(value) {

}

SudokuCellCollection.prototype.count = function(predicate) {

}

SudokuCellCollection.prototype.forEach = function(functionThatTakes1CellParam[, startIndex]) {

}

SudokuCellCollection.prototype.getFinalizedValue = function() {

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











































