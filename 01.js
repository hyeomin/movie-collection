const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTM0OGMwNjkwODliYTZhOTMwYTdjNmRjNjkyZjE0OSIsInN1YiI6IjY1MmY1M2I5ZWE4NGM3MDBjYTEyYzU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VfZmrExLe9kTsAHtG8dqxjUDZdoxMYcINbJ2RuKS2E8'
    }
};

// Function to fetch top-rated movies
async function getData() {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=5a348c069089ba6a930a7c6dc692f149&append_to_response=videos,images", options);
    const data = await response.json();
    return data;
}

// Function to search movies based on a query
async function searchMovies(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=5a348c069089ba6a930a7c6dc692f149&query=${query}`, options);
    const data = await response.json();
    return data;
}

// Function to display movies
function displayMovies(movies) {
    const movieWrapper = document.querySelector('.movieWrapper');
    movieWrapper.innerHTML = ''; // Clear existing movies
    movies.forEach(movie => {
        createCard(movie);
    });
}

// Function to create a movie card
function createCard(movie) {
    const card = document.createElement('div');
    card.className = 'single-card';

    const img = document.createElement('img');
    img.className = 'movieImage';
    img.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path_to_default_image.png';
    img.alt = movie.original_title;

    const title = document.createElement('h3');
    title.textContent = movie.original_title;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(overview);

    document.querySelector('.movieWrapper').appendChild(card);
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission
    
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        const data = await searchMovies(query);
        displayMovies(data.results);
    } else {
        const data = await getData();
        displayMovies(data.results);
    }
});

// Initialize by fetching and displaying top-rated movies
const init = async () => {
    const data = await getData();
    displayMovies(data.results);
}

init();
