import  kue from 'kue';

function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
        throw new Error('Jobs is not an array');
    }

    jobs.forEach(jobData => {
        const job = queue.create('push_notification_code_3', jobData);

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
}
