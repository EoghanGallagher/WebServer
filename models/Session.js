var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Create Schema

// var sessionSchema = new Schema({
//     sessionName: String,
//     sessionNumber: String,
//     playerID: String,
//     gameID: String,
//     deviceName: String,
//     deviceModel: String,
//     deviceType: String,
//     deviceUID: String,
//     sessonDuration: String,
//     timeStamp: String,
//     transitionCount: String,
//     created_at: Date,
//     updated_at: Date
// });



var sessionSchema = new Schema({
     transitions: { type: 'array', items: [Object] },
     SessionName: { type: 'string' },
     SessionNumber: { type: 'number' },
     PlayerID: { type: 'string' },
     GameID: { type: 'string' },
     DeviceName: { type: 'string' },
     DeviceModel: { type: 'string' },
     DeviceType: { type: 'string' },
     DeviceUniqueIdentifier: { type: 'string' },
     SessionDuration: { type: 'string' },
     TimeStamp: { type: 'string' },
     SessionCompleted: { type: 'boolean' },
     TimeToStartSession: {type: 'string'},
     TransitionCount: { type: 'number' },
     FileName: { type: 'string' },
     createdAt: { type: 'Date' },
     updatedAt: { type: 'Date' }
    });

    sessionSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};


//var Fields = Object.keys( sessionSchema.schema.paths );

//Create model using schema above
var Session = mongoose.model('Session', sessionSchema );

//Make this available
module.exports = Session;
