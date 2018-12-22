const axios = require("axios");

describe("get - /puzzle", function () {
    it("request returns puzzle when puzzle is known", function(done) {
        axios.get("http://localhost:3000" + "/puzzles" + "/default")
            .then(function(response) {
                expect(response.data).not.toEqual("");
                done();
            })
            .catch(function(error) {
                done.fail(error);
            });
    });
});