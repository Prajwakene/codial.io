//1st step
const express = require('express');
const app = express();

//when we deploy it to the server this port number will be 80 
const port = 8000;

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
    console.log(`server is running in port : ${port}`);

})
