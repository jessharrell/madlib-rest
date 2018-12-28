module.exports = function(text) {
    var indexOfDynamic = text.indexOf('_')
    if (indexOfDynamic < 0){
        return [{type: 'static', text: text}];
    } else {
        var indexOfNextSpace = text.substr(indexOfDynamic + 1).indexOf(" ");
        if(indexOfNextSpace > 0){
            var list = [{type: 'static', text: text.substr(0, indexOfDynamic - 1)},
                {type: text.substr(indexOfDynamic + 1, indexOfNextSpace), text: ''},
                {type: 'static', text: text.substr(indexOfDynamic + 1 + indexOfNextSpace + 1)}]

            return list.filter(function (element) {
                return element.type !== 'static' || element.text !== ''
            })
        } else {
            return [{ type : 'static', text : text.substr(0 , indexOfDynamic - 1)},
                { type : text.substr(indexOfDynamic+1), text : '' }];
        }
    }
};
