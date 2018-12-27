module.exports = function(text) {

    if (text[0] !== "_"){
        var indexOfDynamic = text.indexOf("_")
        if (indexOfDynamic > 0) {
            return [{ type : 'static', text : text.substr(0 , indexOfDynamic - 1)},
                    { type : text.substr(indexOfDynamic+1), text : '' }]
        }

        return [{type: "static", text: text}];
    } else {
        var firstSpace = text.indexOf(" ");
        return [ { type : text.substr(0, firstSpace).substr(1), text : '' },
                 { type : 'static', text : text.substr(firstSpace + 1)} ]
    }

};
