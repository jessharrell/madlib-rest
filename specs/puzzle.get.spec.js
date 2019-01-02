var axios = require("axios");
var fs = require('fs-extra');
var uuid4 = require("uuid/v4");
var serverConfig = require("./test.server.config")

describe("get - /puzzle", function () {
    beforeEach(function() {
        if(!fs.existsSync(serverConfig.PuzzleLocation)){
            fs.mkdirSync(serverConfig.PuzzleLocation);
        }
    });

    afterEach(function () {
        fs.removeSync(serverConfig.PuzzleLocation);
    });

    describe("requesting puzzle names", function() {
        it("returns empty list when no puzzles in library", function (done) {
            axios.get("http://localhost:3000/" + "puzzles/")
                .then(function (response) {
                    expect(response.data).toEqual([]);
                    done();
                })
                .catch(function (error) {
                    expect(error).toBeNull("received error - " + error);
                    done();
                });
        });

        it("returns list all puzzle ids in library", function (done) {
            var testID = uuid4();
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID + "1", "")
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID + "2", "")
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID + "3", "")

            axios.get("http://localhost:3000/" + "puzzles/")
                .then(function (response) {
                    expect(response.data).toEqual([testID + "1", testID + "2", testID + "3"]);
                    done();
                })
                .catch(function (error) {
                    expect(error).toBeNull("received error - " + error);
                    done();
                });
        });
    });

    describe("requesting specific puzzle", function() {
        it("returns puzzle when puzzle is known", function (done) {
            var testID = uuid4();
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID, "custom_name/Puzzle Content")

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    expect(response.data).toEqual({name: "custom_name", puzzle: [{type:"static", text:"Puzzle Content"}]});
                    done();
                })
                .catch(function (error) {
                    expect(error).toBeNull("received error - " + error);
                    done();
                });
        });

        it("returns different puzzle when puzzle is known", function (done) {
            var testID = uuid4();
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID, "/Different Puzzle Content")

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    expect(response.data).toEqual({name: "", puzzle: [{type:"static", text:"Different Puzzle Content"}]});
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

        it("returns a 410 when requested puzzle is invalid", function (done) {
            var testID = uuid4();
            fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID, "Puzzle missing title and therefore invalid")

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    expect(response).toBeNull("Received response for invalid puzzle")
                })
                .catch(function (error) {
                    expect(error.response.status).toEqual(410);
                    done();
                });
        });
    });
});