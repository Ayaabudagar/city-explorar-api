const express = require('express');
const server = express();
const weatherData = require('./Data/data.json');
const cors = require('cors');
server.use(cors());
require('dotenv').config();
const axios = require('axios');
server.use(cors());
const PORT = process.env.PORT;


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
//localhost:3020/
server.get('/',(req,res) =>{
    res.send('I am in the root route');
})
//localhost:3020/getWeather
server.get('/getWeather',(req,res) =>{
    let locationWeather = weatherData.data.map (item=>{
        return item.weather;
    })
    res.send(locationWeather);
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

