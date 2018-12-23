var parse = require("../services/parse")

describe("parse", function () {
    it("given only static text, returns list of obj, type static with same text", function () {
        var staticText = "some static text";
        var actual = parse(staticText);
        expect(actual).toEqual([{type:"static", text: staticText}]);
    });
});