const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonexport = require('jsonexport');

const Session = require('./models/Session');
const JsonToCsv = require('./Utils/JsonToCsv');



const app = express();




//Connect to test DB
mongoose.connect('mongodb://localhost/TrailMaker');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to DB...');
});

//Create Schema


app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World'));

app.post( '/session', (req, res) => {

res.send( 'server works fine.....' );

console.log( req.body );

} );


//Parse session data from body of incoming request
//Save session data to db
app.put( '/session', (req, res) => {

  res.send( 'PUT REQUEST ACCEPTED.' );

  var sesh = new Session(req.body);

  sesh.save(function(err)
  {
    if (err) throw err;

    console.log('Session saved successfully!');
  });

} );

// Use Routes


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
