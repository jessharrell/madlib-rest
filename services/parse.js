module.exports = function(text) {
    var indexOfDynamic = text.indexOf("_")
    if (indexOfDynamic < 0){
        return [{type: "static", text: text}];
    } else {
        if (indexOfDynamic !== 0) {
            return [{ type : 'static', text : text.substr(0 , indexOfDynamic - 1)},
                { type : text.substr(indexOfDynamic+1), text : '' }]
        }

        var firstSpace = text.indexOf(" ");
        return [ { type : text.substr(indexOfDynamic, firstSpace).substr(1), text : '' },
                 { type : 'static', text : text.substr(firstSpace + 1)} ]
    }

};
