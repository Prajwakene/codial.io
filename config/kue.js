// configuring kue takes only 3 lines of code 
const kue =require('kue');
const queue = kue.createQueue();

// queue is basically group of similar jobslike all emails can put together



// exporting
module.exports = queue;