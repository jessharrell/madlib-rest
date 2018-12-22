var fs = require('fs-extra');
var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/puzzles/:puzzle_id', function(req, res){
    var puzzleContent = fs.readFileSync("puzzle-library/" + req.params.puzzle_id)
    res.send(puzzleContent);
});

app.get('/', function (req, res) {
    res.send("healthy")
});

app.listen(3000);
console.log("listening on 3000");