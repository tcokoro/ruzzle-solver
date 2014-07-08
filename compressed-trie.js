TrieNode = function() {
	this._value = 0, this._children = [];
	
	for (var i = 0; i < 26; i++) {
		this._children.push(null);
	}
};

CompressedTrie = function() {
	this._root = new TrieNode();
	this._count = 0;
};

CompressedTrie.prototype.insert = function(keyStr) {
	var currentNode = this._root;
	keyStr = keyStr.toLowerCase();
	this._count ++;

	for (var level = 0; level < keyStr.length; level++){
		var index = CompressedTrie.getIndex(keyStr[level]);

		if (index < 0 || index > 25) continue;

		if (!currentNode._children[index]) {
			currentNode._children[index] = new TrieNode();
		}

		currentNode = currentNode._children[index];
	}

	// Mark last node as leaf
	currentNode._value = this._count;
};

CompressedTrie.prototype.search = function(keyStr) {
	var currentNode = this._root;
	keyStr = keyStr.toLowerCase();

	for (var level = 0; level < keyStr.length; level++ ){
		var index = CompressedTrie.getIndex(keyStr[level]);

		if (!currentNode._children[index]) return -1;

		currentNode = currentNode._children[index]
	}

	return currentNode._value;
};

CompressedTrie.getIndex = function(letter) {
	return letter.charCodeAt(0) - 'a'.charCodeAt(0);
}