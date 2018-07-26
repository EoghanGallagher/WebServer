

function JsonToCsv()
{
  const jsonexport = require('jsonexport');

  this.JsonExport = function( file )
  {
      jsonexport( file, function( err, csv )
     {
       if(err) return console.log(err);

       console.log(csv);

     });
   }
  }



module.exports = JsonToCsv;
