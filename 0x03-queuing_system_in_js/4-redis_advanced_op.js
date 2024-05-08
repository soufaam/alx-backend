import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => console.log('Redis client not connected to the server:', err));
client.on('connect', () => {
  console.log('Redis client connected to the server');
});
const obj = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};

for (const [key, value] of Object.entries(obj)) {
  client.hset('HolbertonSchools', key, value, redis.print);
}

client.hgetall('HolbertonSchools', (err, values) => {
  if (err) {
    console.log(err);
  } else {
    console.log(values);
  }
});
