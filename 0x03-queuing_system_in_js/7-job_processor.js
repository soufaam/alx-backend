import kue from 'kue';

const jobs = [
    {
      phoneNumber: '4153518780',
      message: 'This is the code 1234 to verify your account'
    },
    {
      phoneNumber: '4153518781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153518743',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153538781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153118782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4153718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4159518782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4158718781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4153818782',
      message: 'This is the code 4321 to verify your account'
    },
    {
      phoneNumber: '4154318781',
      message: 'This is the code 4562 to verify your account'
    },
    {
      phoneNumber: '4151218782',
      message: 'This is the code 4321 to verify your account'
    }
  ];

const blacklistedNumbers = ['4153518780', '4153518781'];
const myqueue = kue.createQueue();

jobs.forEach(element => {
  const job = myqueue.create('push_notification_code_2', element)

  job.on('enqueue', function() {
    console.log(`Notification job created: ${job.id}`);
});

job.on('complete', function() {
    console.log(`Notification job ${job.id} completed`);
});

job.on('failed', function(errorMessage) {
    console.log(`Notification job ${job.id} failed: ${errorMessage}`);
});

job.on('progress', function(progress, data) {
    console.log(`Notification job ${job.id} ${progress}% complete`);
});

job.save();
});

function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);
  if (blacklistedNumbers.includes(phoneNumber)) {
    const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
    return done(new Error(errorMessage));
  }
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
}
myqueue.process('push_notification_code_2', 2, function(job, done) {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
