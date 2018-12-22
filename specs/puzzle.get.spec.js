var axios = require("axios");

var fs = require('fs-extra')
var uuid4 = require("uuid/v4");

describe("get - /puzzle", function () {
    describe("requesting specific puzzle", function() {
        it("returns puzzle when puzzle is known", function (done) {
            var testID = uuid4();
            if(!fs.existsSync("puzzle-library")){
                fs.mkdirSync("puzzle-library");
            }
            fs.writeFileSync("puzzle-library/" + testID, "Puzzle Content")

            axios.get("http://localhost:3000/" + "puzzles/" + testID)
                .then(function (response) {
                    try {
                        expect(response.data).toEqual("Puzzle Content");
                    } catch (error) {
                        fs.removeSync("puzzle-library");
                        done.fail(error);
                    }
                    fs.removeSync("puzzle-library");
                    done();
                })
                .catch(function (error) {
                    fs.removeSync("puzzle-library");
                    done.fail(error);
                });
        });
    });
});