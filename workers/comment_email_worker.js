// creating a workers for us (queue)
const queue = require('../config/kue');

// importing commest_mailer
const commentsMailer = require('../mailers/comments_mailer');

//every workers has a process fuction
queue.process('emails', function(job, done){
    console.log('emails worker processing a job', job.data);
    //calls the mailer 
    commentsMailer.newComment(job.data);
    done();

});