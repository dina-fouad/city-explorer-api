'use strict';

require('dotenv').config();
const express = require('express');
// const weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');

const server = express();

const PORT = process.env.PORT;

server.use(cors());//my server can get any req from any clinet


//localhost:3065/
server.get('/weather', weatherHandler);
server.get('/movie', movieHandler)

server.get('/', (req, res) => {
    let str = 'hello from backend';
    res.send(str);
});

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


// let movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=1f883500be7d8b2a082810723cf1abfb&query=seattle`;
function movieHandler(req, res) {

    let movieQuery = req.query.city;
    let key = process.env.MOVIE_API_KEY;
    let movieUrl = `https://api.themoviedb.org/3/movie/550?api_key=${key}&query=${movieQuery}`;
   
    
    axios.get(movieUrl).then(result => {
            const movieArray = result.data.results.map(movieItem => {
                return new Movie(movieItem);
            })
            res.send(movieArray);
        })
        .catch(err => {

            res.status(500).send(`error in movie data ${err}`);
        })
}


server.get('*', (req, res) => {
    res.send('not found');
})

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `Low of ${item.min_temp}, high of ${item.max_temp} with ${item.weather.description}`;
    }
}

class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500/afkYP15OeUOD0tFEmj6VvejuOcz.jpg`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
        
    }
}


server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})