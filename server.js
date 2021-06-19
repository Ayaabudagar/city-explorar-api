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


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

server.get('/weather-data', (req, res) => {

    const lat = req.query.lat;
    const lon = req.query.lon;
 
    if (lat && lon) {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

        axios.get(weatherBitUrl).then(response => {
            const responseData = response.data.data.map(obj => new Weather(obj));
            res.json(responseData)
        }).catch(error => {
            res.send(error.message)
        });
    } else {
        res.send('please provide the proper lat and lon')
    }


});


class Weather {
    constructor(weatherData) {
        this.description = weatherData.weather.description;
        this.date = weatherData.valid_date;


    }
}



class ForeCast {
    constructor(object) {
        this.description = `Low of : ${object.low_temp} and a high of ${object.max_temp} with a ${object.weather.description} `
        this.date = object.valid_date;

    }
}



