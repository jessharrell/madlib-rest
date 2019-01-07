module.exports = function(parsedPuzzleContent) {
    var puzzleStr = "";
    parsedPuzzleContent.forEach(function (piece) {
        if(piece.type === "static"){
            puzzleStr += " " + piece.text;
        } else if (piece.type === "newline") {
            puzzleStr += "\n";
        } else {
            puzzleStr += " _" + piece.type;
        }
    });
    return puzzleStr.trimLeft();
};
