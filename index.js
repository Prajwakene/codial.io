//1st step
const express = require('express');
const app = express();

//when we deploy it to the server this port number will be 80 
const port = 8000;

// 5th step....accessing the express-ejs-layouts  library 
const expressLayouts = require('express-ejs-layouts');

//7th step...extract style and sripts from sub page in to the layout 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//6th step..setting up the static files
// ./ tells in the neighbouring folder it willl loke for the folder name assets creating it
app.use(express.static('./assets'));


app.use(expressLayouts);

//3rd step
//use express router 
app.use('/', require('./routes'));


// 4th step...setting up the view engine using app.set documentry
app.set('view engine', 'ejs');
// ./ means it tis inte neighbouring folder
app.set('views', './views');



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
