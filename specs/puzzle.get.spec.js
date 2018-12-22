var axios = require("axios");
var fs = require('fs-extra');
var uuid4 = require("uuid/v4");
var serverConfig = require("./test.server.config")

describe("get - /puzzle", function () {
    describe("requesting specific puzzle", function() {
        it("returns puzzle when puzzle is known", function (done) {
            var testID = uuid4();
            if(!fs.existsSync(serverConfig.PuzzleLocation)){
                fs.mkdirSync(serverConfig.PuzzleLocation);
            }
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID, "Puzzle Content")

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    try {
                        expect(response.data).toEqual("Puzzle Content");
                    } catch (error) {
                        fs.removeSync(serverConfig.PuzzleLocation);
                        done.fail(error);
                    }
                    fs.removeSync(serverConfig.PuzzleLocation);
                    done();
                })
                .catch(function (error) {
                    fs.removeSync(serverConfig.PuzzleLocation);
                    done.fail(error);
                });
        });

        it("returns different puzzle when puzzle is known", function (done) {
            var testID = uuid4();
            if(!fs.existsSync(serverConfig.PuzzleLocation)){
                fs.mkdirSync(serverConfig.PuzzleLocation);
            }
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID, "Different Puzzle Content")

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    try {
                        expect(response.data).toEqual("Different Puzzle Content");
                    } catch (error) {
                        fs.removeSync(serverConfig.PuzzleLocation);
                        done.fail(error);
                    }
                    fs.removeSync(serverConfig.PuzzleLocation);
                    done();
                })
                .catch(function (error) {
                    fs.removeSync(serverConfig.PuzzleLocation);
                    done.fail(error);
                });
        });
    });
});