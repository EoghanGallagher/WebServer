const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonexport = require('jsonexport');

const Session = require('./models/Session');
const JsonToCsv = require('./Utils/JsonToCsv');



const app = express();




//Connect to test DB
mongoose.connect('mongodb://eoghan:!Midkemia!76@ds161751.mlab.com:61751/detect');

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


app.get('/api/session' , (req, res) => {

  res.setHeader('Content-Type', 'application/json');
  res.send( JSON.stringify(

    {
    "_id": {
        "$oid": "5b6319700db54600146d3441"
    },
    "transitions": [
        {
            "transitionErrors": [],
            "TransitionNo": 1,
            "TransistionName": " Star 1-Star A",
            "TransitionTime": "0:1.16",
            "Source": " Star 1",
            "Destination": "Star A",
            "TransitionComplete": true,
            "ErrorCount": 0
        },
        {
            "transitionErrors": [],
            "TransitionNo": 2,
            "TransistionName": "Star A-Star 2",
            "TransitionTime": "0:0.58",
            "Source": "Star A",
            "Destination": "Star 2",
            "TransitionComplete": true,
            "ErrorCount": 0
        },
        {
            "transitionErrors": [],
            "TransitionNo": 3,
            "TransistionName": "Star 2-Star B",
            "TransitionTime": "0:0.61",
            "Source": "Star 2",
            "Destination": "Star B",
            "TransitionComplete": true,
            "ErrorCount": 0
        },
        {
            "transitionErrors": [],
            "TransitionNo": 4,
            "TransistionName": "Star B-Star 3",
            "TransitionTime": "0:0.56",
            "Source": "Star B",
            "Destination": "Star 3",
            "TransitionComplete": true,
            "ErrorCount": 0
        },
        {
            "transitionErrors": [],
            "TransitionNo": 5,
            "TransistionName": "Star 3-Star C",
            "TransitionTime": "0:1.24",
            "Source": "Star 3",
            "Destination": "Star C",
            "TransitionComplete": true,
            "ErrorCount": 0
        },
        {
            "transitionErrors": [],
            "TransitionNo": 6,
            "TransistionName": "Star C-Star 4",
            "TransitionTime": "0:0.94",
            "Source": "Star C",
            "Destination": "Star 4",
            "TransitionComplete": true,
            "ErrorCount": 0
        },
        {
            "transitionErrors": [],
            "TransitionNo": 7,
            "TransistionName": "Star 4-Star D",
            "TransitionTime": "0:0.63",
            "Source": "Star 4",
            "Destination": "Star D",
            "TransitionComplete": true,
            "ErrorCount": 0
        }
    ],
    "SessionName": "trail_maker_session_b9add8c4-5839-49f6-aeec-97ebad3969d6",
    "SessionNumber": 22,
    "PlayerID": "player00001",
    "GameID": "0001",
    "DeviceName": null,
    "DeviceModel": "iMac18,2",
    "DeviceType": "Desktop",
    "DeviceUniqueIdentifier": "09DDC5B1-E183-5379-A4BA-28A00D4F17D3",
    "SessionDuration": "00:06",
    "TimeStamp": "08/02/2018 15:47:05",
    "SessionCompleted": true,
    "TransitionCount": 7,
    "FileName": "trail_maker_session_b9add8c4-5839-49f6-aeec-97ebad3969d6.dat",
    "__v": 0
}

  ) );

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
