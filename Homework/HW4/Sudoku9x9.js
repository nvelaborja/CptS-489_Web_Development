// Student name: Nathan VelaBorja
// Student ID: 11392441
//"use strict";

/// Sudoku 9x9 Class
function Sudoku9x9(arrOf81Values) {
	this.cellArray2D = new Array();

	// Create 3D cell array from 2D cell array
	this.cells = [
		arrOf81Values.slice(0,9), 
		arrOf81Values.slice(9,18), 
		arrOf81Values.slice(18,27), 
		arrOf81Values.slice(27,36), 
		arrOf81Values.slice(36,45), 
		arrOf81Values.slice(45,54), 
		arrOf81Values.slice(54,63), 
		arrOf81Values.slice(63,72), 
		arrOf81Values.slice(72) 
	];
}

Sudoku9x9.prototype.get3x3 = function(rowIndex, colIndex) {
	// Get index of upper-left corner of 3x3
	var row = rowIndex * 3;
	var col = colIndex * 3
	var cellArray = new Array();
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			cellArray.push(this.cells[row + i][col + j]);
		}
	}
	return new Sudoku3x3Block(cellArray);
}

Sudoku9x9.prototype.getColumn = function(colIndex) {
	var cellArray = new Array();
	for (var i = 0; i < 9; i++) {
		cellArray.push(cells[i][colIndex]);
	}
	return new SudokuCellBlock(cellArray);
}

Sudoku9x9.prototype.getRow = function(rowIndex) {
	var cellArray = new Array();
	for (var i = 0; i < 9; i++) {
		cellArray.push(cells[rowIndex][i]);
	}
	return new SudokuCellBlock(cellArray);
}

Sudoku9x9.prototype.toArray = function() {
	return this.cellArray2D; 
}

/// SudokuCell Class
function SudokuCell(numPossibleValues) {

	var _finalizedValue = 0;
	var _isFinalized = false;

	this.possibleValues = new Array();

	for (var i = 1; i <= numPossibleValues; i++) {
		this.possibleValues.push(i);
	}

	var getFinalizedValue = function() {
		if (!_isFinalized) return undefined;
		return _finalizedValue;
	}

	var setFinalizedValue = function(value) {
		_isFinalized = true;
		_finalizedValue = value;

		// Clear possible values
		this.possibleValues = new Array();
		// Add value to possible values
		this.possibleValues.push(value);
	}

	var getIsFinalized = function() {
		return _isFinalized;
	}

	Object.defineProperty(this, "finalizedValue", {enumerable: true, get: getFinalizedValue, set: setFinalizedValue});
	Object.defineProperty(this, "isFinalized", {enumerable: true, get: getIsFinalized});
}

SudokuCell.prototype.containsPossibility = function(value) {
	return this.possibleValues.indexOf(value) > -1;
}

SudokuCell.prototype.getPossibilities = function() {
	this.possibleValues.sort();
	return this.possibleValues;
}

SudokuCell.prototype.removePossibility = function(value) {

	if (this.isFinalized) return false;

	var index = this.possibleValues.indexOf(value);
	if (index > -1) {
		this.possibleValues.splice(index, 1);

		// Check to see if cell is now finalized
		if (this.possibleValues.length === 1) {
			this.finalizedValue = this.possibleValues[0];
		}

		return true;
	}

	return false;
}

SudokuCell.prototype.removePossibilities = function(arrOfValues) {
	for (var value of arrOfValues) {
		this.removePossibility(value);
	}
}

SudokuCell.prototype.toString = function() {
	return this.getPossibilities().join();
}

/// SudokuCellCollection Class
function SudokuCellCollection(arrOfCells) {
	this.complimentPossibilities = function(possibilities) {
		var newPossibilities = [1,2,3,4,5,6,7,8,9];
		for (var possibility of possibilities) {
			var index = newPossibilities.indexOf(possibility);
			if (index > -1)
				newPossibilities.splice(index, 1);
		}
		return newPossibilities;
	}

	this.cells = new Array();

	//// The specifications say to make a deep copy of the array, but this makes it
	//// impossible to use reference comparisons in the remove function. For now I'm
	//// removing the deep copy, and everything still seems to function correctly
	// if (arrOfCells !== undefined && arrOfCells !== null) {
	// 	// Deep copy cell array
	// 	for (var arrCell of arrOfCells) {
	// 		// Skip undefined cells
	// 		if (!arrCell) continue;

	// 		var possibilities = arrCell.getPossibilities();
	// 		var compliment = this.complimentPossibilities(possibilities);
	// 		var newCell = new SudokuCell(9);
	// 		newCell.removePossibilities(compliment);
	// 		this.cells.push(newCell);
	// 	}
	// }

	if (arrOfCells !== undefined && arrOfCells !== null) {
		for (var arrCell of arrOfCells) {
			if (!arrCell) continue;
			this.cells.push(arrCell);
		}
	}

	var getLength = function() {
		var count = 0;

		for (var cell of this.allCells()) {
			if (cell) 
				count++;
		}
		return count;
	}

	Object.defineProperty(this, "length", {enumberable: true, configurable: false, get: getLength});
}

SudokuCellCollection.prototype.allCells = function() {
	return this.cells;
}

SudokuCellCollection.prototype.containsCell = function(cell) {
	for (var arrCell of this.cells) {
		if (arrCell === cell) 
			return true;
	}
	return false;
}

SudokuCellCollection.prototype.containsPossibility = function(value) {
	for (var cell of this.cells) {
		if (cell.containsPossibility(value)) 
			return true;
	}
	return false;
}

SudokuCellCollection.prototype.count = function(predicate) {
	// Predicate usage: predicate(cell) {}
	var count = 0;

	for (var cell of this.cells) {
		if (predicate(cell))
			count++;
	}
	return count;
}

SudokuCellCollection.prototype.forEach = function(functionThatTakes1CellParam, startIndex) {
	var start = startIndex ? startIndex : 0;

	var cells = this.allCells();

	for (var i = start; i < cells.length; i++) {
		functionThatTakes1CellParam(cells[i]);
	}
}

SudokuCellCollection.prototype.getFinalizedValues = function() {
	var finalValues = new Array();

	for (var cell of this.allCells()) {
		if (cell.finalizedValue)
			finalValues.push(cell.finalizedValue)
	}
	return finalValues;
}

SudokuCellCollection.prototype.getPossibilities = function() {
	// From my understanding, get all possibilities from each cell then remove duplicates
	var totalPossibilities = new Array();

	for (var cell of this.allCells()) {
		if (cell.isFinalized) continue;
		var possibilities = cell.getPossibilities();
		for (var possibility of possibilities) {
			// If it's not already in the master list, add it
			if (totalPossibilities.indexOf(possibility) < 0)
				totalPossibilities.push(possibility);
		}
	}

	totalPossibilities.sort();
	return totalPossibilities;
}

SudokuCellCollection.prototype.removeCell = function(cell) {
	var cellArray = new Array();

	for (var arrCell of this.cells) {
		if (arrCell !== cell)
			cellArray.push(arrCell);
	}
	return new SudokuCellCollection(cellArray);
}

SudokuCellCollection.prototype.removeCells = function(otherCellCollection) {
	if (!(otherCellCollection instanceof SudokuCellCollection))
		return this;

	var cellArray = new Array();

	for (var cell of this.cells) {
		if (!otherCellCollection.contains(cell))
			cellArray.push(cell);
	}

	return new SudokuCellCollection(cellArray);
}

SudokuCellCollection.prototype.removePossibility = function(value) {
	var removeCount = 0;

	for (cell of this.cells) {
		if (cell.removePossibility(value))
			removeCount++;
	}
	return removeCount;
}

/// SudokuCellBlock Class : SudokuCellCollection
function SudokuCellBlock(arrOf9Values) {
	// Setup Inheritance
	SudokuCellCollection.call(this, arrOf9Values);
}

// Setup inheritance
SudokuCellBlock.prototype = Object.create(SudokuCellCollection.prototype);

SudokuCellBlock.prototype.trySolve = function() {
	// If there are any finalized values, remove that value from all other cells
	var status = { changed: false, solved: true};

	var cells = this.allCells();

	for (var cell of cells){
		if (!cell.isFinalized) {
			// If a cell is the only cell in the block with a particular value, that must be its value
			var coll = new SudokuCellCollection(this.allCellsBut(cell));

			for (var possibility of cell.getPossibilities()) {
				if (!coll.containsPossibility(possibility)){
					cell.finalizedValue = possibility;
					status.changed = true;
					break;
				}
			}

			continue;
		}

		// If we have a finalized cell, remove finalizedValue from all other cells
		for (var updateCell of this.allCellsBut(cell)) {
			if (updateCell.removePossibility(cell.finalizedValue))
				status.changed = true;
		}
	}

	// Check to see if block is solved
	for (var cell of cells) {
		if (!cell.isFinalized) {
			status.solved = false;
			break;
		}
	}

	return status;
}

SudokuCellBlock.prototype.allCellsBut = function(cell) {
	var cellArray = new Array();

	for (var arrCell of this.allCells()) {
		if (arrCell !== cell)
			cellArray.push(arrCell);
	}
	return cellArray;
}

/// Sudoku3x3Block Class : SudokuCellBlock
function Sudoku3x3Block(arrOf9Values) {
	// Setup Inheritance
	SudokuCellBlock.call(this, arrOf9Values);

	this.cells = [
	arrOf9Values.slice(0,3), 
	arrOf9Values.slice(3,6), 
	arrOf9Values.slice(6)
	];
}

// Setup Inheritance
Sudoku3x3Block.prototype = Object.create(SudokuCellBlock.prototype);

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnColumn = function(colIndex) {
	var totalPossibilities = new Array();
	for (var i = 0; i < 3; i++) {
		var cell = this.cells[i][colIndex];
		for (var possibility of cell.getPossibilities()) {
			if (totalPossibilities.indexOf(possibility) < 0)
				totalPossibilities.push(possibility);
		}
	}
	return totalPossibilities;
}

Sudoku3x3Block.prototype.getPossibilitiesOnlyAvailableOnRow = function(rowIndex) {
	var totalPossibilities = new Array();
	for (var i = 0; i < 3; i++) {
		var cell = this.cells[rowIndex][i];
		for (var possibility of cell.getPossibilities()) {
			if (totalPossibilities.indexOf(possibility) < 0)
				totalPossibilities.push(possibility);
		}
	}
	return totalPossibilities;
}

Sudoku3x3Block.prototype.isColumnFinalized = function(columnIndex) {
	for (var i = 0; i < 3; i++) {
		if (!this.cells[i][columnIndex].isFinalized)
			return false;
	}
	return true;
}

Sudoku3x3Block.prototype.isRowFinalized = function(rowIndex) {
	for (var i = 0; i < 3; i++) {
		if (!this.cells[rowIndex][i].isFinalized)
			return false;
	}
	return true;
}

Sudoku3x3Block.prototype.toString = function() {
	var line1 = this.getRowString(0);
	var line2 = this.getRowString(1);
	var line3 = this.getRowString(2);
	return line1 + "\n" + line2 + "\n" + line3 + "\n";
}

Sudoku3x3Block.prototype.getRowString = function(rowIndex) {
	var rowString = "";

	if (this.cells[rowIndex][0].isFinalized)
		rowString += this.cells[rowIndex][0].finalizedValue.toString();
	else
		rowString += "X";

	if (this.cells[rowIndex][1].isFinalized)
		rowString += this.cells[rowIndex][1].finalizedValue.toString();
	else
		rowString += "X";

	if (this.cells[rowIndex][2].isFinalized)
		rowString += this.cells[rowIndex][2].finalizedValue.toString();
	else
		rowString += "X";

	return rowString;
}

// Override SudokuCellBlock's allCells()
Sudoku3x3Block.prototype.allCells = function() {
	var cellArray = new Array();

	for (var column of this.cells) {
		for (var arrCell of column) {
			cellArray.push(arrCell);
		}
	}
	return cellArray;
}










































