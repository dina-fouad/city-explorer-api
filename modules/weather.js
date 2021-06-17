

const axios = require('axios');

module.exports = weatherHandler;



//localhost:3065/weather?city
function weatherHandler(req, res) {


// let weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=london&key=75d1bfd7e0f2432f845b070401bf2c97'
    let weatherQuery = req.query.city;
    let key = process.env.WEATHER_API_KEY;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${weatherQuery}&key=${key}`;

    axios.get(weatherUrl).then(result => {
            const weatherArray = result.data.data.map(weatherItem => {
                return new Forecast(weatherItem);
            })
            res.send(weatherArray);
        })
        .catch(err => {

            res.status(500).send(`error in weather data ${err}`);
        })
}






class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `Low of ${item.min_temp}, high of ${item.max_temp} with ${item.weather.description}`;
    }
}

