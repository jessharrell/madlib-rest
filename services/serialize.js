module.exports = function(parsedPuzzleContent) {
    var puzzleStr = "";
    if (parsedPuzzleContent.length > 0) {
        puzzleStr += parsedPuzzleContent[0].text;
    }
    return puzzleStr;
};
