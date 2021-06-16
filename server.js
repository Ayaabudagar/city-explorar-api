'use strict';
require('dotenv').config();
const express = require('express');
// const weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

//http://localhost:3020/movie?city=Amman
const movieHandler = require('./Modules/Movies.js');
server.get('/movie', movieHandler);

//http://localhost:3020/weather?city=Amman
const weatherHandler = require('./Modules/Weather.js');
server.get('/weather', weatherHandler);


server.get('*', (req, res) => {
    res.send('Not found');
}); 

server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})
