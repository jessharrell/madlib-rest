module.exports = function(text) {
    var indexOfDynamic = text.indexOf("_")
    if (indexOfDynamic < 0){
        return [{type: "static", text: text}];
    } else {
        if (indexOfDynamic !== 0) {

            var indexOfNextSpace = text.substr(indexOfDynamic+1).indexOf(" ");
            if( indexOfNextSpace < 0 ) {
                return [{ type : 'static', text : text.substr(0 , indexOfDynamic - 1)},
                    { type : text.substr(indexOfDynamic+1), text : '' }];
            }

            return [{ type : 'static', text : text.substr(0 , indexOfDynamic - 1)},
                { type : text.substr(indexOfDynamic+1, indexOfNextSpace), text : '' },
                { type : 'static', text : text.substr( indexOfDynamic +1 + indexOfNextSpace + 1)}];

        }

        var firstSpace = text.indexOf(" ");
        return [ { type : text.substr(indexOfDynamic, firstSpace).substr(1), text : '' },
                 { type : 'static', text : text.substr(firstSpace + 1)} ];
    }
};