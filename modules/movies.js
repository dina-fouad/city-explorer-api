
const axios = require('axios');


module.exports = movieHandler;


let inMemory = {};

// let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=1f883500be7d8b2a082810723cf1abfb&query=seattle`;
function movieHandler(req, res) {

    let movieQuery = req.query.city;
    let key = process.env.MOVIE_API_KEY;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${movieQuery}`;
   


    if (inMemory[movieQuery] !== undefined) {

        console.log('get the data from the Memory');
        
        res.send(inMemory[movieQuery]);
        
    } else{

        console.log('get the data from the API');
    
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
}



class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.imageUrl= item.poster_path;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
    }
}

