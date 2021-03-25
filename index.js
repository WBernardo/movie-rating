const APIUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1'
const APIKey = '04c35731a5ee918f014970082a0088b1'
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='
const imgPath = 'https://image.tmdb.org/t/p/w1280'


const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('find')

getMovies(APIUrl)

async function getMovies(url) {
    const res = await fetch(url)
    const resData = await res.json()

    console.log(resData)

    allMovies(resData.results)
}

function allMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {poster_path, title, vote_average, overview} = movie
        const movieFactor = document.createElement('div')
        movieFactor.classList.add('movie')

        movieFactor.innerHTML = `
            <div class='cardMovie'>
                <img 
                    src='${imgPath + poster_path}' 
                    alt='${title}' />
                <div class='movieInfo'>
                    <h3>${title}</h3>
                    <span class='${voteRate(vote_average)}'>${vote_average}</span>
                </div>
                <div class='overview'>
                <h3>Overview:</h3>${overview}</div>
            </div>
        `
        main.appendChild(movieFactor)
    });

}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const findMovie = search.value

    if(findMovie) {
        getMovies(searchAPI + findMovie)

        search.value = ''
    }
})

function voteRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

