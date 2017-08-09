var fs = require("fs");
var async = require("async");

// Asynchronous read a file
fs.readFile('p2-input.txt', 'utf8', function (err, data) {
   if (err) {
      return console.error(err);
   }

   var array = data.toString().split('\n');
   var allText = [];

   //  helper function : XyloHack
    function XyloHack(n) {
      return (n%2 === 0 ? true : false);
    }

   for(var i=1; i<=array[0]; i++){
     var input = JSON.stringify(array[i]);

     var number = input.split('(')[1]; // get the number from function
     number = number.split(')')[0];
     var xyloHackResult = XyloHack(number);

     var text = input.split(".");
     var result = "";
     if(xyloHackResult){
       result = text[0].toUpperCase();
       var noQuotes = result.split('"').join(''); // replace the double quotes
       allText.push(noQuotes);
     }else {
       result = text[0].toLowerCase();
       var noQuotes = result.split('"').join(''); // replace the double quotes
       allText.push(noQuotes);
     }
   }


   // write the text into output file
   var stream = fs.createWriteStream('p2-output.txt');
   stream.once('open', function(fd) {
     allText.forEach(function (line) {
       line = line+'\n';
       line = line.replace(/\'/g, ""); // replace the single quotes
       stream.write(line);
      });
     stream.end();
   });

});

console.log("Program two has been Completed!");
