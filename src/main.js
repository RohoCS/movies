let movies = document.querySelector(".movies");
let input = document.querySelector(".search__input");
let checkbox = document.querySelector(".checkbox");

let searchLast = null;

const addMovieToList = (movie) => {
  const div = document.createElement("div")
  const img = document.createElement("img")

  div.classList.add("movie")
  img.classList.add("movie__image")
  img.src = /(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'src/img/no-image.png'
  img.alt = `${movie.Title} ${movie.Year}`
  img.title = `${movie.Title} ${movie.Year}`

  movies.appendChild(div);
  div.appendChild(img);
  div.addEventListener("click", () => {
    window.open(`https://www.imdb.com/title/${movie.imdbID}`)
  })
}

const getData = url => fetch(url)
  .then(res => res.json())
  .then(json => json.Search)

const inputHandler = e => {
  const searchString = e.target.value.trim()

  if (searchString === searchLast) return
  searchLast = searchString
  movies.innerHTML = ""
  getData(`https://www.omdbapi.com/?apikey=ee2be59f&s=${searchString}`)
    .then(data => data.forEach(movie => addMovieToList(movie)))
    .catch(err => console.log(err))

}

input.addEventListener("input", inputHandler)