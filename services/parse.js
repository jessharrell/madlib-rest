module.exports = function(rawPuzzleFileText) {
    if( rawPuzzleFileText.indexOf("/") < 0) {
        throw new Error("Missing Title");
    }

    var titleAndRawContent = rawPuzzleFileText.split("/", 2);
    var title = titleAndRawContent[0];
    var rawContent = titleAndRawContent[1];

    return [title, parsePuzzleContent(rawContent)]
};

function parsePuzzleContent(puzzleContent) {
    var indexOfDynamic = puzzleContent.indexOf('_');
    var list = [];
    if (indexOfDynamic < 0){
        list =  parseStaticTextForPotentialNewLines(puzzleContent);
    } else {
        list = parseStringWithDynamics(puzzleContent);
    }
    return removeBlankStaticTextsAndTrailingNewLine(list);
}

function removeBlankStaticTextsAndTrailingNewLine(listOfPuzzlePieces) {
    var list = listOfPuzzlePieces.filter(function (piece) { return piece.type !== 'static' || piece.text.trim() !== ''});
    if(list[list.length -1].type === 'newline') {
        list = list.slice(0, list.length -1);
    }
    return list;
}

function findLengthOfDynamic(stringContainingDynamic, indexOfDynamic) {
    var startOfDynamicType = indexOfDynamic + 1;
    var sanitizedString = stringContainingDynamic.replace(/\n/g, " ");
    var length = sanitizedString.substr(startOfDynamicType).indexOf(' ');
    if (length < 0) {
        length = sanitizedString.length - startOfDynamicType;
    }
    return length;
}

var space = 1;
var underscore = 1;

function parseStringWithDynamics(text) {
    var listOfPieces = [];
    var restOfString = text;
    var currentIndex = 0;
    var indexOfDynamic = text.indexOf('_');

    while (indexOfDynamic >= 0) {
        var lengthOfDynamic = findLengthOfDynamic(restOfString, indexOfDynamic);

        listOfPieces = listOfPieces.concat(parseStaticTextForPotentialNewLines(restOfString.substr(0, indexOfDynamic - space)));

        if(restOfString[indexOfDynamic - space] === "\n") {
            listOfPieces.push({type: 'newline', text:''});
        }

        listOfPieces.push({type: restOfString.substr(indexOfDynamic + underscore, lengthOfDynamic), text: ''});

        if(restOfString[indexOfDynamic + underscore + lengthOfDynamic] === "\n") {
            listOfPieces.push({type: 'newline', text:''});
        }

        currentIndex =  indexOfDynamic + underscore + lengthOfDynamic + space;
        restOfString = restOfString.substr(currentIndex);
        indexOfDynamic = restOfString.indexOf('_');
    }

    if(currentIndex < text.length) {
        listOfPieces = listOfPieces.concat(parseStaticTextForPotentialNewLines(restOfString));
    }

    return listOfPieces
}

function parseStaticTextForPotentialNewLines(staticText) {
    var statics = staticText.split('\n');
    var output = [];
    for(var i = 0; i < statics.length -1; i++) {
        output.push({type: 'static', text: statics[i]});
        output.push({type: 'newline', text: ''});
    }
    output.push({type: 'static', text: statics[statics.length-1]});
    return output;
}