'use strict'

require('dotenv').config();
const express = require('express');
const weather = require('./data/weather.json')
const server = express();
const cors = require('cors'); 
server.use(cors());

const PORT = process.env.PORT || 3065;


server.get('/',(req,res)=>{
    res.send('dina')
})

server.get('/weather',handle);
function handle(request, response) {
    let searchQuery = request.query.searchQuery;
    const city = weather.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
    if(city != undefined)
    {
      const weatherArray = city.data.map(day => new Forecast(day));
      response.status(200).send(weatherArray);
    }
    else
    {
      errorHandler(response);
    }
  }

  function Forecast(day) {
    this.date = day.valid_date
    this.description = day.weather.description
  }




server.get('*', (req, res) => {
    res.send('not found');
})

server.listen(PORT,() =>{
    console.log(`listening on PORT ${PORT}`);
})