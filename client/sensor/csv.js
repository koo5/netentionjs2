var fs = require('fs');
var sys = require('sys');
var request = require('request');

var csvPattern = /(?:^|,)("(?:[^"]+)*"|[^,]*)/g;

/*
parseCsvFile('eqs7day-M1.txt', function(rec){
  sys.puts("An earthquake of magnitude "
           + rec.magnitude + " in " + rec.region)
});
*/

function parseCsvUrl(url, callback, finished){
  request({uri: url}, function (error, response, body) {
	  
	  var iteration = 0, header = [];

	  var lines = body.split('\n');

          lines.forEach(function(d, i){

              if(i == lines.length-1) return;
              if(iteration++ == 0 && i == 0){
                header = d.split(csvPattern);
              }else{
                callback(buildRecord(header, d));
              }
          });
	     
         finished();
   });
}

  function buildRecord(header, str){
    var record = {}
    str.split(csvPattern).forEach(function(value, index){
      if(header[index] != '')
        record[header[index].toLowerCase()] = value.replace(/"/g, '')
    })
    return record
  }
 
exports.parseCsvUrl = parseCsvUrl;

