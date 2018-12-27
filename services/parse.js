module.exports = function(text) {

    if (text[0] !== "_"){
        return [{type: "static", text: text}];
    } else {
        var firstSpace = text.indexOf(" ");



        return [ { type : text.substr(0, firstSpace).substr(1), text : '' }, { type : 'static', text : text.substr(firstSpace + 1)} ]
    }

};
