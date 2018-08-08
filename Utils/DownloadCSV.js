const fastCsv = require('fast-csv');


var downloadCSV = function(request, response) {
    // Obtain your cursor ...
    const cursor = ...
    // The transformer function
    const transformer = ...;

    // Name of the downloaded file - e.g. "Download.csv"
    const filename = ...;

    // Set approrpiate download headers
    response.setHeader('Content-disposition', `attachment; filename=${filename}`);
    response.writeHead(200, { 'Content-Type': 'text/csv' });

    // Flush the headers before we start pushing the CSV content
    response.flushHeaders();

    // Create a Fast CSV stream which transforms documents to objects
    var csvStream = fastCsv
        .createWriteStream({headers: true})
        .transform(transformer)

    // Pipe/stream the query result to the response via the CSV transformer stream
    cursor.stream().pipe(csvStream).pipe(response);
}


module.exports = downloadCSV;
