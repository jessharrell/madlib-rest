Madlibs Server
===============
This is simple express server used to serve a rest api for madlibs. 
As this is node please start by running `yarn install`. 
After which `yarn serve server.config.json` may be used to start 
the server.

### End Points
`/puzzles`
* returns list of known puzzle ids

`/puzzles/<puzzle_id>`
* get - returns name of puzzle and puzzle as list of pieces.
  Each piece containing a type and text.

* post - expects body with name and puzzle where puzzle is a list of objects, each obj having a type and a text
  
  ie: 
  
        name: "Puzzle Title", 
        puzzle: [{type: "static", text: "puzzle content"}, {type: "verb", text: ""}, {type: "newline", text: ""}]
  
    
### Functionality Details
   
The server takes a configuration file at start which contains a path to a directory.
This directory should contain puzzle files. Each file represents a puzzle 
and the file name will be used as the puzzle identifier. The puzzle should be a 
text file. Any text preceded with an underscore will be consider dynamic 
and the text following the underscore will be used as it's type. For example: _noun
represents a dynamic word of type noun.
