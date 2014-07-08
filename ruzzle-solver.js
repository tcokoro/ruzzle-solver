var ruzzle;

var solveRuzzle = function(inputStr) {
	ruzzle = new Ruzzle(inputStr, 4), trie = initiateTrie();
	return getCandidateList(ruzzle, trie);
};

var initiateTrie = function() {
	var trie = new CompressedTrie();

	for (var i = 0; i < DictWords.length; i++ ) {
		trie.insert(DictWords[i]);
	}

	return trie;
};

var getCandidateList = function(ruzzle, trie) {
	var startingNodes = [[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],
	[10],[11],[12],[13],[14],[15]];

	var result = BFS(startingNodes, ruzzle, trie);
	return result;
};

var BFS = function(startingNodes, ruzzle, trie) {
	var ruzzleGraph = ruzzle.getGraph();
	var node;
	var unvisitedNodes = startingNodes;
	var candidateListHash = {}
	var candidateList = []; 
	var candidatePathList = [];

	while (unvisitedNodes.length > 0) {
		node = unvisitedNodes[0];
		unvisitedNodes.splice(0,1);
	 	var neighbors = Object.keys(ruzzleGraph[node[node.length - 1]]);
	 	
		
	 	for (var j = 0; j < neighbors.length; j++) {
			var neighbor = parseInt(neighbors[j]);
			var newNode = node.slice();
			
			if (!isVisited(newNode, neighbor)) {
				
				newNode.push(neighbor);
				var newNodeWord = ruzzle.getMapping(newNode);
				var searchResult = trie.search(newNodeWord);

				if (searchResult > -1) {
					unvisitedNodes.push(newNode);
		
					if (searchResult > 0 && !(newNodeWord in candidateListHash)) {
						candidateListHash[newNodeWord] = true;
						candidateList.push(newNodeWord);
						candidatePathList.push(newNode);
					}
				}
				
			}
		}
	}
	
	return {candidateList: candidateList.sort(function(a,b){return b.length - a.length}),
	 candidatePathList: candidatePathList.sort(function(a,b){return b.length - a.length})}
};

var isVisited = function(path, newNode) {
	for (var i = 0; i < path.length; i++) {
		if (path[i] === newNode) {
			return true;
		}
	}

	return false;
};

var getWordPathDirections = function(wordPath) {
	var ruzzleGraph = ruzzle.getGraph(); directions = [];

	for (var i = 0; i < (wordPath.length - 1); i++) {
		directions.push(ruzzleGraph[wordPath[i]][wordPath[i + 1]]);
	}

	return directions;

}