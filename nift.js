var stringToWordArray = function(string) {
    var badChars = ",.;:()'\"".split();

    // Replace noise characters
    barChars.forEach( function(chr) {
	string = string.replace(chr, "");
    });
    
    // Replace ws with spaces
    var wsChars = "\t\n\r\l"
    barChars.forEach( function(chr) {
	string = string.replace(chr, " ");
    });

    // Lowercase the string
    string = string.toLowerCase();

    // Break into words, remove and remove empty strings
    var werds = _.compact(string.split(" "));
    return werds;
};

var trunk = function (string) {
    return string.substring(0,4);
};


var wordArrayToFP = function (aray) {
    var fp = {};    
    var wPairs = _.zip(aray.slice(1), aray.slice(0,-1));
    
    wPairs.forEach(function (pair) {
	var kee = pair.join("-");
	if(kee in fp)
	    fp[kee] += 1;
	else
	    fp[kee] = 1;
    });
    return fp;
};

var maxScore = function (fp) {
    return sum(_.values(fp));
}

var computeMatchScore = function (fp1, fp2) {
    // Find the overlapping ngrams
    var sharedKeys = _.intersection(_.keys(fp1), _.keys(fp2));

    var score = 0;
    sharedKeys.forEach(function (kee) {
	score += min( fp1[kee], fp2[kee]);
    });

    return score;
}

var computeNormedMatchScore = function (fp1, fp2) {
    var score = computeMatchScore(fp1, fp2);
    
    // Normalize to the maximum score and return
    var maxScore = min(maxScore(fp1), maxScore(fp2)); 
    return score * 1.0 / maxScore;
}

var stringToFP = function (string) {
    return wordArrayToFP( stringToWordArray(string) );
}

var niftSearch = function (searchString, toBeSearched) {
    var searchArray = stringToWordArray(serach);
    var searchFP    = wordArrayToFP(searchArray);

    var lengthToSearch = searchArray.length();
    var toBeSearchedArray = stringToWordArray(toBeSearched);

    var bestOffset = 0;
    var bestScore  = -1

    for( var i = 0; i < toBeSearchedArray.length() - lengthToSearch; i++) {
	var subArray = toBeSearchedArray.slice(i, i + lengthToSearch);
	var subArrayFP = wordArrayToFP(subArray);
	
	var newScore = computeMatchScore(searchFP, subArrayFP)
	if( newScore > bestScore ){
	    bestOffset = i;
	    bestScore  = newScore;
	}
    }
    var bestMatchString = toBeSearchedArray.slice(bestOffset, bestOffset + lengthToSearch).join(" ")
    return [bestScore, bestMatchString];
}

