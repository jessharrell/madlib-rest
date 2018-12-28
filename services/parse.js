module.exports = function(text) {
    var indexOfDynamic = text.indexOf('_')
    if (indexOfDynamic < 0){
        return [{type: 'static', text: text}];
    } else {
        var list = parseStringWithDynamics(text)
        return removeBlankStaticTexts(list)
    }
};


function removeBlankStaticTexts(listOfPuzzlePieces) {
    return listOfPuzzlePieces.filter(function (piece) { return piece.type !== 'static' || piece.text.trim() !== ''});
}

function findLengthOfDynamic(restOfString, indexOfDynamic) {
    var startOfDynamicType = indexOfDynamic + 1;
    var length = restOfString.substr(startOfDynamicType).indexOf(" ");
    if (length < 0) {
        length = restOfString.length - startOfDynamicType;
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

        listOfPieces.push({type: 'static', text: restOfString.substr(0, indexOfDynamic - space)});
        listOfPieces.push({type: restOfString.substr(indexOfDynamic + underscore, lengthOfDynamic), text: ''});

        currentIndex =  indexOfDynamic + underscore + lengthOfDynamic + space;
        restOfString = restOfString.substr(currentIndex);
        indexOfDynamic = restOfString.indexOf('_');
    }

    if(currentIndex < text.length) {
        listOfPieces.push({type: 'static', text: restOfString});
    }

    return listOfPieces
}