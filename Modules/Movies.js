const axios = require('axios');
module.exports = movieHandler;
function movieHandler(req, res) {
    let city = req.query.city;
    let key = process.env.MOVIE_KEY;



    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${city}`;

    axios
        .get(movieUrl)
        .then(result => {
            const movieArr = result.data.results.map(movieItem => {
                return new Movie(movieItem);
            })
            res.send(movieArr);
        })
        .catch(err => {
            res.status(500).send(`Not found ${err}`);
        })
}


class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
    }
}