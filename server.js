const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonexport = require('jsonexport');

const Json2csvParser = require('json2csv').Parser;


const Session = require('./models/Session');



const app = express();




//Connect to test DB
//mongoose.connect('mongodb://eoghan:midkemia76@ds161751.mlab.com:61751/detect', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/StarRacer');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error ::::'));
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



const fields = [ 'SessionName',
                // 'SessionNumber',
                 //'PlayerID',
                 //'GameID',
                 //'DeviceName',
                 //'DeviceModel',
                 //'DeviceType',
                 //'DeviceUniqueIdentifier',
                // 'SessionDuration',
                // 'TimeStamp',
                // 'SessionCompleted',

                 'transitions.TransitionNo',
                 'transitions.TransistionName'

                  ];



app.get('/api/session' , (req, res) => {

  Session.find({}, function (err, sessions)
  {
     // try
     // {
     //   const csv = json2csv( sessions, opts );
     //   res.send(csv);
     // }
     // catch (err)
     // {
     //   console.error(err);
     // }


     const json2csvParser = new Json2csvParser( { fields, unwind:['transitions' ,'transitions'] });
     const csv = json2csvParser.parse(sessions);

     //const json2csv = new json2csv({ fields });
     //const csv = json2csv.parse(sessions);

     res.send( csv );

  });



});


//Parse session data from body of incoming request
//Save session data to db
app.put( '/api/session', (req, res) => {

  res.send( 'PUT REQUEST ACCEPTED. Data Saved' );

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
