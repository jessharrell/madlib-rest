var parse = require("../services/parse");

describe("parse", function () {

    var staticText = "some static text";

    it("returns title given text wrapped in back ticks", function () {
        var title = "Some Title";
        var actualTitle = parse(title + "/" + staticText)[0];
        expect(actualTitle).toEqual("Some Title");
    });

    it("given only static text, returns list of obj, type static with same text", function () {
        var actual = parse("/" + staticText)[1];
        expect(actual).toEqual([{type:"static", text: staticText}]);
    });

    it("given noun at beginning and static text, returns noun obj then static obj", function () {
        var actual = parse("/" +"_noun " + staticText)[1];
        expect(actual).toEqual([
            {type:"noun", text: ""},
            {type:"static", text: staticText}
        ]);
    });

    it("given verb at beginning and static text, returns verb obj then static obj", function () {
        var actual = parse("/" +"_verb " + staticText)[1];
        expect(actual).toEqual([
            {type:"verb", text: ""},
            {type:"static", text: staticText}
        ]);
    });

    it("given a noun at the end of the static text, returns static obj then noun obj", function () {
        var actual = parse("/" + staticText + " _noun")[1];
        expect(actual).toEqual([
            {type:"static", text: staticText},
            {type:"noun", text: ""}
        ]);
    });

    it("given verb at end of static text, returns static obj then verb obj", function () {
        var actual = parse("/" + staticText + " _verb")[1];
        expect(actual).toEqual([
            {type:"static", text: staticText},
            {type:"verb", text: ""}
        ]);
    });

    it("given noun in middle of static text, return static, noun, static", function () {
        var actual = parse("/" + staticText + " _noun " + staticText)[1];
        expect(actual).toEqual([
            {type:"static", text: staticText},
            {type:"noun", text: ""},
            {type:"static", text: staticText}
        ]);
    });

    it("given two nouns in middle of static text, return static, noun. noun, static", function () {
        var actual = parse("/" + staticText + " _noun " + " _noun " + staticText)[1];
        expect(actual).toEqual([
            {type:"static", text: staticText},
            {type:"noun", text: ""},
            {type:"noun", text: ""},
            {type:"static", text: staticText}
        ]);
    });

    it("throws error when puzzle has no title", function () {
        var puzzleWithoutTitle = "Broken Puzzle";
        expect(function () {parse(puzzleWithoutTitle)}).toThrow("Missing Title");
    });

    it("parses newlines into newline element", function() {
        var actual = parse("/" + staticText + "\n" + staticText)[1];
        expect(actual).toEqual([
            {type:"static", text: staticText},
            {type:"newline", text: ""},
            {type:"static", text: staticText}
        ]);
    });

    it("parses newline following a dynamic", function () {
        var actual = parse("/" + staticText + " _noun" + "\n" + staticText)[1];
        expect(actual).toEqual([
            {type:"static", text: staticText},
            {type:"noun", text: ""},
            {type:"newline", text: ""},
            {type:"static", text: staticText}
        ]);
    })
});