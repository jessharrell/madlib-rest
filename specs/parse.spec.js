var parse = require("../services/parse")

describe("parse", function () {
    it("given only static text, returns list of obj, type static with same text", function () {
        var staticText = "some static text";
        var actual = parse(staticText);
        expect(actual).toEqual([{type:"static", text: staticText}]);
    });

    it("given noun at beginning and static text, returns noun obj then static obj", function () {
        var staticText = "some static text";
        var actual = parse("_noun " + staticText);
        expect(actual).toEqual([
            {type:"noun", text: ""},
            {type:"static", text: staticText}
        ]);
    });

    it("given verb at beginning and static text, returns verb obj then static obj", function () {
        var staticText = "some static text";
        var actual = parse("_verb " + staticText);
        expect(actual).toEqual([
            {type:"verb", text: ""},
            {type:"static", text: staticText}
        ]);
    });
});