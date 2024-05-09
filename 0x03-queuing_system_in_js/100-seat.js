const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const kue = require('kue');

const app = express();
const port = 1245;

const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

let availableSeats = 50;
let reservationEnabled = true;

const queue = kue.createQueue();

async function reserveSeat(number) {
    await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
    const seats = await getAsync('available_seats');
    return parseInt(seats) || 0;
}

reserveSeat(availableSeats);

app.get('/available_seats', async (req, res) => {
    const currentSeats = await getCurrentAvailableSeats();
    res.json({ available_seats: currentSeats });
});

app.get('/reserve_seat', async (req, res) => {
    queue.process('reserve_seat', async (job, done) => {
        try {
            const currentSeats = await getCurrentAvailableSeats();
            const updatedSeats = currentSeats - 1;

            await reserveSeat(updatedSeats);

            if (updatedSeats === 0) {
                reservationEnabled = false;
            }

            if (updatedSeats >= 0) {
                console.log(`Seat reservation job ${job.id} successful`);
                done();
            } else {
                const errorMessage = 'Not enough seats available';
                console.error(`Seat reservation job ${job.id} failed: ${errorMessage}`);
                done(new Error(errorMessage));
            }
        } catch (error) {
            console.error(`Seat reservation job ${job.id} failed: ${error.message}`);
            done(error);
        }
    });

    res.json({ status: "Queue processing" });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

module.exports = app;
