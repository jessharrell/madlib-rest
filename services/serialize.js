module.exports = function(parsedPuzzleContent) {
    var puzzleStr = "";
    parsedPuzzleContent.forEach(function (piece) {
        if(piece.type === "static"){
            puzzleStr += piece.text;
        } else {
            puzzleStr += " _" + piece.type + " ";
        }
    });
    return puzzleStr.trim();
};
