import kue from 'kue';

const queue = kue.createQueue();

const newqueue = kue.createQueue();
const obj = {
  phoneNumber: '1234567890',
  message: 'This is a notification message.'
};

const push_notification_queue= kue.createQueue();
const job = push_notification_queue.create('push_notification_code', obj);
job.on('enqueue', () => {
    console.log(`Notification job created ${job.id}`)
})
job.on('complete', function() {
    console.log('Notification job completed');
});

job.on('failed', function() {
    console.log('Notification job failed');
});

job.save();

function sendNotification(phoneNumber, message) {
  console.log(`sending notification to ${phoneNumber}, with message: ${message}`);
}

newqueue.process('push_notification_code', (job, done) => {
    const {phoneNumber, message} = job.data;
    sendNotification(phoneNumber, message)
    done();
});

