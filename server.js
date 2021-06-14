'use strict'

require('dotenv').config();
const express = require('express');
const cityData = require('./data/weather.json')
const server = express();
const cors = require('cors'); 
server.use(cors());

// const PORT = process.env.PORT || 3001;
const PORT = 3065

server.get('/',(req,res)=>{
    res.send('dina')
})

server.get('/weather',(req,res)=>{
  
    let {searchQuery} = req.query;
    try {

        
        let cityNames = cityData.find(item=>{
            if (item.city_name.toLowerCase() == searchQuery.toLowerCase()) {
                return item;
            }
        })
        console.log('aaa',cityNames);
        let weatherData = cityNames.data.map(item=>{
            return new Forecast(item,searchQuery)
        })
        console.log('weather', weatherData);
        res.send(weatherData);
    }
    catch(error) {
        res.send('These input values are invalid!')
    }
        
    })
    
class Forecast {
    constructor(item,city_name){

        this.description = item.weather.description;
        this.date = item.valid_date;
        this.city_name = city_name;
    }

}





server.get('*',(req,res)=>{
    res.status(404).send({
        "error": "Something went wrong."
      });
})

server.listen(PORT,() =>{
    console.log(`listening on PORT ${PORT}`);
})