module.exports = function(parsedPuzzleContent) {
    var puzzleStr = "";
    if (parsedPuzzleContent.length > 0) {
        puzzleStr += parsedPuzzleContent[0].text;
        puzzleStr += " _" + parsedPuzzleContent[1].type + " ";
    }
    return puzzleStr;
};
