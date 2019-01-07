var fs = require('fs-extra');
var express = require('express');
var bodyParser = require('body-parser');
var parse = require('./services/parse');
var serialize = require('./services/serialize');


var app = express();
console.log("config file: " + process.argv[2]);
var config = JSON.parse(fs.readFileSync(process.argv[2]));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/puzzles/', function(req, res){
    res.send(fs.readdirSync(config.PuzzleLocation));
});

app.get('/puzzles/:puzzle_id', function(req, res){
    if(fs.existsSync(config.PuzzleLocation + "/" + req.params.puzzle_id)) {
        var rawPuzzleContent = fs.readFileSync(config.PuzzleLocation + "/" + req.params.puzzle_id);
        try {
            var puzzle = parse(rawPuzzleContent.toString());
            res.send({name: puzzle[0], puzzle: puzzle[1]});
        } catch (e) {
            res.status(410).send(e);
        }
    } else {
        res.status(404).send();
    }
});

app.post('/puzzles/:puzzle_id', function (req, res) {

    if(!req.body.title || !req.body.puzzle || !Array.isArray(req.body.puzzle)) {
        res.status(406).send();
    }
    else if(fs.existsSync(config.PuzzleLocation + "/" + req.params.puzzle_id)) {
        res.status(409).send();
    } else {
        try{
            var puzzleText = serialize(req.body.puzzle)
        } catch (e) {
            res.status(406).send(e);
        }

        fs.writeFileSync(config.PuzzleLocation + "/" + req.params.puzzle_id, puzzleText);
        res.status(200).send();
    }
});

app.get('/', function (req, res) {
    res.send("healthy")
});

app.listen(3000);
console.log("listening on 3000");