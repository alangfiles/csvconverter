//comma seperated values to json
//also include the ability to use a different seperator

var input, separator, rowSeparator, rowStrings, headerRow, headerExists, output;
function CSV2JSON(){

  input = document.querySelector("#csv-input").innerHTML;
  output = [];
  separator = ',';
  rowSeparator = '\n';
  headerExists = true;
  //split on the newline, this is incorrect, it should find newlines not in quotes
  rowStrings = splitFileOnRows(rowSeparator);

  //set up the header
  if(headerExists == true){
      headerRow = rowStrings[0].split(separator);
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
    var row = splitRowString(rowStrings[rowIndex], separator);

    for(var i in row){
      var column = row[i];
      rowObject[headerRow[i]] = column;
    }
    output.push(rowObject);
  }
}

function splitFileOnRows(fileInput, rowSeparator){
  var outputFile = [];

  return outputFile;
}



function splitRowString(rowInput, separator){
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
    }
    else{
        word += charRow[i];
    }
  }
  return outputRow;
}
