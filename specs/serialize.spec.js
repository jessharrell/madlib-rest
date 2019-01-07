var serialize = require("../services/serialize");

describe('serialize', function () {
    it('should return string for static followed by verb', function() {
        var puzzle = [{type: "static", text: "Dogs"}, {type:"verb", text:""}];
        expect(serialize(puzzle)).toEqual("Dogs _verb");
    });

    it('should return string for noun followed by static', function() {
        var puzzle = [{type:"noun", text:""}, {type: "static", text: "runs"}];
        expect(serialize(puzzle)).toEqual("_noun runs");
    });
});