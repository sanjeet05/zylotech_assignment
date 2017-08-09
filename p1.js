var fs = require("fs");

// Asynchronous read a file
fs.readFile('p1-input.txt', 'utf8', function (err, data) {
   if (err) {
      return console.error(err);
   }

   // Helper: make a first letter is capital
   function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }

   var array = data.toString().split('\n');
   var noOfFiles = array[0];
   var fileList = [];
   var fileFile = array[1];
   fileFile = fileFile.substring(0, fileFile.lastIndexOf('.'));
   fileList.push(fileFile);

   var allText = [];
   var outputFileName = "";
   var spaceCount = 0;

   var size = array.length;
   for(var i=2; i<size; i++){
     var text = array[i];
     if(spaceCount !== 3){
       if(text !== ''){
         text = text.split("$").join("");
         allText.push(text);
         spaceCount = 0;
       }else {
         spaceCount = spaceCount+1;
       }
     }else {
       if(text === ''){
         return console.error("Error in input file");
       }
       text = text.substring(0, text.lastIndexOf('.'));
       text = capitalizeFirstLetter(text);
       fileList.push(text);
       spaceCount = 0;
     }
   }

  // make a fileName in camelCase
  fileList.forEach(function (line) {
    outputFileName = outputFileName+line;
   });

  // write the text into output file
  outputFileName = outputFileName+'.txt';
  var stream = fs.createWriteStream(outputFileName);
  stream.once('open', function(fd) {
    allText.forEach(function (line) {
      line = line+'\n';
      stream.write(line);
     });
    stream.end();
  });

  console.log("Program one has been Completed!");

});
