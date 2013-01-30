var fs  = require('fs'); 
var jsp = require("./UglifyJS/uglify-js").parser;
var pro = require("./UglifyJS/uglify-js").uglify;
 
function buildOne(flieIn, fileOut) {
    var origCode = fs.readFileSync(flieIn, 'utf8');
    var ast = jsp.parse(origCode); 
        ast = pro.ast_mangle(ast); 
        ast = pro.ast_squeeze(ast);
         
    var finalCode = pro.gen_code(ast);
    fs.writeFileSync(fileOut, finalCode, 'utf8');
    console.log("Uglify complate!");
}

buildOne('js2zip.js', 'min.js');


