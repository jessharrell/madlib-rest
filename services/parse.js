module.exports = function(text) {

    if (text[0] !== "_"){
        return [{type: "static", text: text}];
    } else {
        return [ { type : 'noun', text : '' }, { type : 'static', text : 'some static text' } ]
    }


};
