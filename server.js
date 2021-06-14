const express = require('express');
const server = express();
const weatherData = require('./Data/data.json');
const cors = require('cors');
server.use(cors());

const PORT = 3020;


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
    
