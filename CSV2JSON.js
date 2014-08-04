//comma seperated values to json
//also include the ability to use a different seperator

var input, separator, rowSeparator, rowStrings, headerRow, headerExists, output;
function CSV2JSON(){

  input = document.querySelector("#csv-input").value;
  output = [];
  separator = ',';
  rowSeparator = '\n';
  headerExists = true;
  //split on the newline, this is incorrect, it should find newlines not in quotes
  rowStrings = splitBasedOnSeparator(input, rowSeparator, false); //include quotes

  //set up the header
  if(headerExists == true){
      headerRow = splitBasedOnSeparator(rowStrings[0],separator);
      rowStrings = rowStrings.slice(1); //the rest of the rows minus the header.
  }
  else{
    headerRow = rowStrings[0].split(separator);
    for(var i in headerRow){
      headerRow[i] = 'Column ' + i;
    }
  }

  //now let's make some json objects.
  for(var rowIndex in rowStrings){
    var rowObject = {};
    var row = splitBasedOnSeparator(rowStrings[rowIndex], separator, true); //don't include quotes

    for(var i in row){
      var column = row[i];
      rowObject[headerRow[i]] = column;
    }
    output.push(rowObject);
  }

  var jsonOutput = document.querySelector("#json-output");

  jsonOutput.innerHTML = JSON.stringify(output, undefined, 2); //extra params for pretty-print

}


function splitBasedOnSeparator(rowInput, separator, includeQuotes){
  //splits based on inner quotes
  var outputRow = [];
  var charRow = rowInput.split('');
  var inBetweenQuotes = false;
  var word = '';

  for(var i in charRow){

    if(charRow[i] == separator && inBetweenQuotes == false){
      outputRow.push(word);
      word = '';
    }
    else if (charRow[i] == '"'){
      inBetweenQuotes = !inBetweenQuotes;
      if(includeQuotes){
        word += charRow[i];
      }

    }
    else{
        word += charRow[i];
    }
  }
  //add that last word.
  outputRow.push(word);
  return outputRow;
}

function isNumber(obj) { return !isNaN(parseFloat(obj)) }
