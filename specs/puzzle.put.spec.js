var axios = require("axios");
var fs = require('fs-extra');
var uuid4 = require("uuid/v4");
var serverConfig = require("./test.server.config");

describe("put - /puzzle", function () {
    beforeEach(function() {
        if(!fs.existsSync(serverConfig.PuzzleLocation)){
            fs.mkdirSync(serverConfig.PuzzleLocation);
        }
    });

    afterEach(function () {
        fs.removeSync(serverConfig.PuzzleLocation);
    });

    it("returns 409 - Conflict when given a puzzleId that already exists", function (done) {
        var testID = uuid4();
        fs.writeFileSync(serverConfig.PuzzleLocation + "/" + testID, "existing puzzle/Puzzle Content");

        var data = {title: "Duplicate"};
        axios.post("http://localhost:3000/" + "puzzles/" + testID, data)
            .then(function (response) {
                expect(response).toBeNull("Received response for conflicting puzzle");
                done();
            })
            .catch(function (error) {
                expect(error.response.status).toEqual(409);
                done();
            });
    });

    it("returns 406 - Not Acceptable when given a puzzle without a title", function (done) {
        var testID = uuid4();
        var data = {};
        axios.post("http://localhost:3000/" + "puzzles/" + testID, data)
            .then(function (response) {
                expect(response).toBeNull("Received response for no title puzzle");
                done();
            })
            .catch(function (error) {
                expect(error.response.status).toEqual(406);
                done();
            });
    });

    it("returns 406 - Not Acceptable when given a puzzle with an empty title", function (done) {
        var testID = uuid4();
        var data = {title: ""};
        axios.post("http://localhost:3000/" + "puzzles/" + testID, data)
            .then(function (response) {
                expect(response).toBeNull("Received response for empty title puzzle");
                done();
            })
            .catch(function (error) {
                expect(error.response.status).toEqual(406);
                done();
            });
    });

    it("stores puzzle given unique id and a title", function (done){
        var testID = uuid4();
        var data = {title: "My Unique Puzzle"};
        axios.post("http://localhost:3000/" + "puzzles/" + testID, data)
            .then(function (response) {
                expect(response.status).toEqual(200);
                expect(fs.existsSync(serverConfig.PuzzleLocation + "/" + testID)).toBeTruthy()
                done();
            })
            .catch(function (error) {
                expect(error).toBeNull();
                done();
            });
    });

});