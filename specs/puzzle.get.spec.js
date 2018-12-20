const https = require('https');

describe("get - /puzzle", function () {
    it("request returns puzzle when puzzle is known", function(done) {
        https.get("https://localhost:3000" + "/puzzle" + "/default", function (response) {
            var puzzle = "";
            response.on("data", function (chunk) {
                puzzle += chunk;
            });

            response.on("end", function () {
                expect(puzzle).not.toEqual("");
                done();
            });
        }).on('error', function() {
            done.fail("Endpoint not found")
        });
    });
});