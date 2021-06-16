const axios = require('axios'); 
module.exports = weatherHandler; 
function weatherHandler(req, res) {
    let getWeather = req.query.city;
    let key = process.env.WEATHER_KEY;

    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${getWeather}&key=${key}`;
    
    
    console.log(weatherUrl);
        axios
            .get(weatherUrl)
            .then(result => {
                console.log(result.data.data);
                const weatherArr = result.data.data.map(item => {
                     return new Forecast(item);
                })
                res.send(weatherArr);
            })
            .catch(err => {
                res.status(500).send(`Not found ${err}`);
            })
    
}
class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `Low of ${item.min_temp}, high of ${item.max_temp} with ${item.weather.description}`;
    }
}