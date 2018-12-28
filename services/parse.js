module.exports = function(text) {
    var indexOfDynamic = text.indexOf('_')
    if (indexOfDynamic < 0){
        return [{type: 'static', text: text}];
    } else {
        var list = []
        var restOfString = text;
        var currentIndex = 0;
        while (indexOfDynamic >= 0) {
            var indexOfNextSpace = restOfString.substr(indexOfDynamic + 1).indexOf(" ");
            if (indexOfNextSpace < 0) {
                indexOfNextSpace = text.length - currentIndex;
            }
            list.push({type: 'static', text: restOfString.substr(0, indexOfDynamic - 1)});
            list.push({type: restOfString.substr(indexOfDynamic + 1, indexOfNextSpace), text: ''});
            currentIndex =  indexOfDynamic + indexOfNextSpace + 1;
            restOfString = restOfString.substr(currentIndex + 1);
            indexOfDynamic = restOfString.indexOf('_');
        }

        if(currentIndex < text.length) {
            list.push({type: 'static', text: restOfString});
        }

        return list.filter(function (element) { return element.type !== 'static' || element.text.trim() !== ''});
    }
};
