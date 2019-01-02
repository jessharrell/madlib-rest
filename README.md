Madlibs Server
===============
This is simple express server used to serve a rest api for madlibs. 
As this is node please start by running `yarn install`. 
After which `yarn serve server.config.json` may be used to start 
the server.

### End Points
`/puzzles/<puzzle_id>`
* returns name of puzzle and puzzle as list of pieces.
  Each piece containing a type and text.
    
### Functionality Details
   
The server takes a configuration file at start which contains a path to a directory.
This directory should contain puzzle files. Each file represents a puzzle 
and the file name will be used as the puzzle identifier. The puzzle should be a 
text file. Any text preceded with an underscore will be consider dynamic 
and the text following the underscore will be used as it's type. For example: _noun
represents a dynamic word of type noun.
