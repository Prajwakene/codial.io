// configuring kue takes only 3 lines of code 
const kue =require('kue');
const queue = kue.createQueue();


// exporting
module.exports = queue;