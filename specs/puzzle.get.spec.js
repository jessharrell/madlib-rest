var axios = require("axios");
var fs = require('fs-extra');
var uuid4 = require("uuid/v4");
var serverConfig = require("./test.server.config")

describe("get - /puzzle", function () {
    describe("requesting specific puzzle", function() {
        beforeEach(function() {
            if(!fs.existsSync(serverConfig.PuzzleLocation)){
                fs.mkdirSync(serverConfig.PuzzleLocation);
            }
        });

        afterEach(function () {
            fs.removeSync(serverConfig.PuzzleLocation);
        });

        it("returns puzzle when puzzle is known", function (done) {
            var testID = uuid4();
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID, "Puzzle Content")

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    expect(response.data).toEqual([{type:"static", text:"Puzzle Content"}]);
                    done();
                })
                .catch(function (error) {
                    expect(error).toBeNull("received error - " + error);
                    done();
                });
        });

        it("returns different puzzle when puzzle is known", function (done) {
            var testID = uuid4();
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID, "Different Puzzle Content")

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    expect(response.data).toEqual([{type:"static", text:"Different Puzzle Content"}]);
                    done();
                })
                .catch(function (error) {
                    expect(error).toBeNull("received error - " + error);
                    done();
                });
        });

        it("returns a 404 when puzzle is not known", function (done) {
            var testID = uuid4();

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    expect(response).toBeNull("Received response for unknown puzzle")
                })
                .catch(function (error) {
                    expect(error.response.status).toEqual(404);
                    done();
                });
        });
    });
});