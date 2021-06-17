'use strict';

require('dotenv').config();
const express = require('express');
// const weatherData = require('./data/weather.json');
const cors = require('cors');
// const axios = require('axios');

const server = express();

const PORT = process.env.PORT;

server.use(cors());//my server can get any req from any clinet


const weatherHandler = require('./modules/weather.js');
const movieHandler = require('./modules/movies.js')

//localhost:3065/
server.get('/weather', weatherHandler);
server.get('/movie', movieHandler)

server.get('/', (req, res) => {
    let str = 'hello from backend';
    res.send(str);
});




server.get('*', (req, res) => {
    res.send('not found');
})



server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})