Ruzzle = function (inputStr, size) {
	this._mapping = [];
	this._board = this._makeBoard(inputStr, size);
	this._graph = this._makeGraph(inputStr, size);

};

Ruzzle.prototype._makeBoard = function(inputStr, size) {
	var board = [];
	var count = 0;

	for (var i = 0; i < size; i++) {
		var row = [];
		for (var j = 0; j <size; j++) {
			row.push(count);
			this._mapping.push(inputStr[count]);
			count ++;
		}
		board.push(row);
	}
	
	return board;
};

Ruzzle.prototype._makeGraph = function(inputStr, size) {
	var adjList = {};

	for (var node = 0; node < inputStr.length; node++) {
		var i, j , neighbors;
		i = parseInt(node / size);
		j = node % size;
		neighbors = {};

		// left neighbor
		if (j - 1 >= 0) {
			neighbors[this._board[i][j - 1]] = "LEFT";
		}

		//right neighbor
		if (j + 1 < size) {
			neighbors[this._board[i][j + 1]] = "RIGHT";
		}

		// top neighbor
		if (i - 1 >= 0) {
			neighbors[this._board[i - 1][j]] = "TOP";
		}

		//bottom neighbor
		if (i + 1 < size) {
			neighbors[this._board[i + 1][j]] = "BOTTOM";
		}

		//top left diagonal neighbor
		if (i - 1 >= 0 && j - 1 >= 0) {
			neighbors[this._board[i - 1][j - 1]] = "TOP_LEFT";
		}

		//top right diagonal neighbor
		if (i - 1 >= 0 && j + 1 < size) {
			neighbors[this._board[i - 1][j + 1]] = "TOP_RIGHT";
		}

		//bottom left diagonal neighbor
		if (i + 1 < size && j - 1 >= 0) {
			neighbors[this._board[i + 1][j - 1]] = "BOTTOM_LEFT";
		}

		//bottom right diagonal neighbor
		if (i + 1 < size && j + 1 < size) {
			neighbors[this._board[i + 1][j + 1]] = "BOTTOM_RIGHT";
		}

		adjList[node] = neighbors;

	}

	return adjList;

};

Ruzzle.prototype.getBoard = function() {
	return this._board;
}

Ruzzle.prototype.getGraph = function() {
	return this._graph;
};

Ruzzle.prototype.getMapping = function(path) {
	var word = "";

	for (var i = 0; i < path.length; i++) {
		word += this._mapping[parseInt(path[i])];
	}

	return word;
};


