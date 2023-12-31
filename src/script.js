const searchButton = document.getElementById('search-btn');
const movieInput = document.getElementById('searchInput');
const section = document.querySelector('section');
const todayDate = document.getElementById('today-date')

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTM0OGMwNjkwODliYTZhOTMwYTdjNmRjNjkyZjE0OSIsInN1YiI6IjY1MmY1M2I5ZWE4NGM3MDBjYTEyYzU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VfZmrExLe9kTsAHtG8dqxjUDZdoxMYcINbJ2RuKS2E8'
    }
};

// get full data
const getData = async function () {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1", options);
    const data = await response.json();
    return data;
}

// create new array
const extractedProperties = function (movie) {
    return {
        poster_path: movie.poster_path,
        original_title: movie.original_title,
        overview: movie.overview,
        vote_average: movie.vote_average,
        id: movie.id
    }
}

// make movie
const makeMovieList = async function () {
    const data = await getData();
    const result = data.results;

    const movieWrapper = document.querySelector('.movieWrapper');
    movieWrapper.innerHTML = '';

    result.forEach(movie => {
        createCard(movie);
    });
}

function createCard(movie) {
    const card = document.createElement('div');
    card.className = 'single-card';

    const img = document.createElement('img');
    img.className = 'movieImage';
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.original_title;

    const movieTitle = document.createElement('h3');
    movieTitle.className = 'movieTitle'
    movieTitle.innerText = movie.original_title;

    const movieOverview = document.createElement('p');
    movieOverview.className = 'movieOverview'
    movieOverview.innerText = movie.overview;

    const movieVoteAvg = document.createElement('p');
    movieVoteAvg.className = 'movieVoteAvg'
    movieVoteAvg.innerText = `별점: ${movie.vote_average}`;

    card.appendChild(img);
    card.appendChild(movieTitle);
    card.appendChild(movieOverview);
    card.appendChild(movieVoteAvg);

    document.querySelector('.movieWrapper').appendChild(card);

    card.addEventListener('click', (e) => {
        e.preventDefault;
        alert(`영화 ID: ${movie.id}`)
    })


}


const searchMovie = async function () {
    const data = await getData();
    const result = data.results;

    const inputValue = movieInput.value;
    const regEx = new RegExp(inputValue, 'gi');

    section.innerHTML = '';

    result.forEach((data) => {
        if (data.original_title.match(regEx)) {
            createCard(data);
        }
    });
}

searchButton.addEventListener('click', searchMovie);

document.addEventListener('DOMContentLoaded', (event) => {
    const today = new Date();

    const formattedDate = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    todayDate.innerHTML += ` <span class="date">오늘은 ${formattedDate}입니다.</span>`;
});


window.onload = makeMovieList;