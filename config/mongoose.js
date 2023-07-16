const mongoose =require('mongoose');
// importing environment file
const env = require('./environment')
//incase of localhost we can write as 127.0.0.1 ...ipp adress of updated nopde  
mongoose.connect(`mongodb://127.0.0.1/${env.db}`);
// mongoose.set('strictQuery', false);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to  MongoDB"));

db.once('open', function(){
    console.log('connected to database :: MongoDB');
});


//exporting
module.exports = db;