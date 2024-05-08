import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis client not connected to the server:', err));
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value);
}

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, replay) => {
    console.log(replay);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
