const kue = require('kue');
const createPushNotificationsJobs = require('./8-job'); // Assuming 8-job.js is in the same directory

describe('createPushNotificationsJobs', () => {
    let queue;

    beforeEach(() => {
        // Create a queue with Kue
        queue = kue.createQueue();
        // Enter test mode without processing the jobs
        queue.testMode.enter();
    });

    afterEach(() => {
        // Clear the queue and exit test mode after executing the tests
        queue.testMode.clear();
        queue.testMode.exit();
    });

    it('should throw an error if jobs is not an array', () => {
        expect(() => createPushNotificationsJobs({}, queue)).toThrow('Jobs is not an array');
    });

    it('should create jobs in the queue', () => {
        const jobs = [
            { phoneNumber: '1234567890', message: 'Test message 1' },
            { phoneNumber: '1234567891', message: 'Test message 2' }
        ];

        createPushNotificationsJobs(jobs, queue);

        // Assert that jobs were created in the queue
        expect(queue.testMode.jobs.length).toBe(2);
    });

    it('should log appropriate messages when jobs are created, completed, failed, and making progress', () => {
        const jobs = [
            { phoneNumber: '1234567890', message: 'Test message 1' },
            { phoneNumber: '1234567891', message: 'Test message 2' }
        ];

        createPushNotificationsJobs(jobs, queue);

        // Assert that appropriate messages were logged
        expect(queue.testMode.jobs[0].log).toContain('Notification job created');
        expect(queue.testMode.jobs[1].log).toContain('Notification job created');

        // Simulate completion of the jobs
        queue.testMode.jobs[0].emit('complete');
        queue.testMode.jobs[1].emit('complete');

        // Assert completion messages
        expect(queue.testMode.jobs[0].log).toContain('Notification job completed');
        expect(queue.testMode.jobs[1].log).toContain('Notification job completed');
    });
});
