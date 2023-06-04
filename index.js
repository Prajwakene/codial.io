//1st step
const express = require('express');

// 9th step
const cookieParser = require('cookie-parser'); 

const app = express();

//when we deploy it to the server this port number will be 80 
const port = 8000;

// 5th step....accessing the express-ejs-layouts  library 
const expressLayouts = require('express-ejs-layouts');


//8th step...importing

const db = require('./config/mongoose')
//11th step
//used for the session cookie
const session = require('express-session');

//we need passport and the localstategy  that we are are setting
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const { connect, mongo } = require('mongoose');

//14th step ...setting up the mongo store for cookie sesion
const mongoStore =require('connect-mongo')(session);

//15th step ..importing node-sass-middleware ...a SASS
const sassMiddleware = require('node-sass-middleware');

//we need this SCSS befor the derver starting 
app.use(sassMiddleware({
    //source is the => from where do i pick up the SCSS file to convert in to CSS 
    src:'./assets/scss',
    //desination => where do i need to put my files
    dest: './assets/css',
    //to show tthe error onn terminal if ther is error in css file...in production mode mode this should be false
    debug:true,
    //to menifest the code if we the code in multiple line 
    outputStyle:'extended',
    //where do i lookout for CSS file
    prefix:'/css'

}))

//10th step 
app.use(express.urlencoded());
//setting up th e cookie parser
app.use(cookieParser());

//7th step...extract style and sripts from sub page in to the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//6th step..setting up the static files
// ./ tells in the neighbouring folder it willl loke for the folder name assets creating it
app.use(express.static('./assets'));
app.use(expressLayouts);
// 4th step...setting up the view engine using app.set documentry
app.set('view engine', 'ejs');
// ./ means it tis inte neighbouring folder
app.set('views', './views');

//12th step...momgo store is used to store the session cookie in thee DB
app.use(session({
    name:'codial',
    //whenever the encryption happen there is key to encode and decode we use key to encrypt
    //TODO chnage th esecret before deployement in production mode
    //used for encryption
    secret:'blahsomething',
    
    //when ever there is request which is not initisliazed a s 
    saveUninitialized: false,
    resave: false,
    cookie: {
        //this is for eg, if you are logedin on th bank or  pf website more than 10 min then it willl logout you after 10 min 
        //maxAge is work in milisecond
        maxAge : (1000 * 60 * 100)
    },
    //definign the another key 
    //it is an instance of MongoStrore
    store:new mongoStore(
        {
        mongooseConnection:db,
        autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

// we need to tell the to the app to use the passport
app.use(passport.initialize());
//passport is use to use the session 
app.use(passport.session());

//13th step

app.use(passport.setAuthenticatedUser);

//3rd step
//use express router 
app.use('/', require('./routes'));


//2nd step
app.listen(port ,function(err){
    //if there is error 
    if(err){
        // console.log('Error:', err );
        // instead of above console we are using  the Interpolation
        // Interpolation(using backticks => ``)
        console.log(`Error in running the server: ${err}`);
    }
    //otherwise
    console.log(`server is running on port : ${port}`);

})
