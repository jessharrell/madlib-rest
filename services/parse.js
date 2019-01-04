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
    if (indexOfDynamic < 0){
        if(puzzleContent.indexOf('\n') < 0) {
            return [{type: 'static', text: puzzleContent}];
        }

        var statics = puzzleContent.split('\n');
        var output = [];
        for(var i = 0; i < statics.length -1; i++) {
            output.push({type: 'static', text: statics[i]});
            output.push({type: 'newline', text: ''});
        }
        output.push({type: 'static', text: statics[statics.length-1]});
        return output;
    } else {
        var list = parseStringWithDynamics(puzzleContent);
        return removeBlankStaticTexts(list);
    }
}

function removeBlankStaticTexts(listOfPuzzlePieces) {
    return listOfPuzzlePieces.filter(function (piece) { return piece.type !== 'static' || piece.text.trim() !== ''});
}

function findLengthOfDynamic(restOfString, indexOfDynamic) {
    var startOfDynamicType = indexOfDynamic + 1;
    var length = restOfString.substr(startOfDynamicType).indexOf('\n');
    if (length < 0) {
        length = restOfString.substr(startOfDynamicType).indexOf(' ');
        if (length < 0) {
            length = restOfString.length - startOfDynamicType;
        }
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

        // listOfPieces.push({type: 'static', text: restOfString.substr(0, indexOfDynamic - space)});

        var statics = restOfString.substr(0, indexOfDynamic - space).split('\n');
        var output = [];
        for(var i = 0; i < statics.length -1; i++) {
            output.push({type: 'static', text: statics[i]});
            output.push({type: 'newline', text: ''});
        }
        output.push({type: 'static', text: statics[statics.length-1]});

        listOfPieces = listOfPieces.concat(output);

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
        listOfPieces.push({type: 'static', text: restOfString});
    }

    return listOfPieces
}