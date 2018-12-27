var parse = require("../services/parse")

describe("parse", function () {

    var staticText = "some static text";

    it("given only static text, returns list of obj, type static with same text", function () {
        var actual = parse(staticText);
        expect(actual).toEqual([{type:"static", text: staticText}]);
    });

    it("given noun at beginning and static text, returns noun obj then static obj", function () {
        var actual = parse("_noun " + staticText);
        expect(actual).toEqual([
            {type:"noun", text: ""},
            {type:"static", text: staticText}
        ]);
    });

    it("given verb at beginning and static text, returns verb obj then static obj", function () {
        var actual = parse("_verb " + staticText);
        expect(actual).toEqual([
            {type:"verb", text: ""},
            {type:"static", text: staticText}
        ]);
    });

    it("given a noun at the end of the static text, returns static obj then noun obj", function () {
        var actual = parse(staticText + " _noun");
        expect(actual).toEqual([
            {type:"static", text: staticText},
            {type:"noun", text: ""}
        ]);
    });

    it("given verb at end of static text, returns static obj then verb obj", function () {
        var actual = parse(staticText + " _verb");
        expect(actual).toEqual([
            {type:"static", text: staticText},
            {type:"verb", text: ""}
        ]);
    });
});