// Destructuring ile fakeDB den movies arrayi çekimi
var {
  fakeDB: { movies },
} = require("../fakeDB.js");

// Tüm filmleri getiren func
const getAllMovies = (req, res) => {
  res.status(200).send(movies);
};

// Routerdan gelen paramı çekip id ye göre filmi getiren func
const getMovie = (req, res) => {
  const { id } = req.params;
  let movie = movies.find((el) => el.id === Number(id));
  if (movie) {
    res.status(200).send(movies);
  } else {
    res.status(404).send("Böyle bir kullanıcı yok.");
  }
};

// Routerdan body'de gelen filmi pushlayan func
const createMovie = (req, res) => {
  let { movieInfo } = req.body;
  if (movieInfo.name) {
    if (movies.length > 0) {
      movieInfo = { id: movies[movies.length - 1].id + 1, ...movieInfo };
    } else {
      movieInfo = { id: 1, ...movieInfo };
    }
    movies.push(movieInfo);
    res.status(200).send(movieInfo);
  } else {
    res.status(404).send("Hatalı film bilgileri.");
  }
};

// Put için update func
const updateMovie = (req, res) => {
  const { id } = req.params;
  let { movieInfo } = req.body;
  let index = movies.findIndex((movie) => movie.id === Number(id));
  console.log(`index`, index);
  if (index !== -1) {
    if (movieInfo.name && movieInfo.rate) {
      movies[index] = { id: movies[index].id, ...movieInfo };
      res.status(200).send({ id: movies[index].id, ...movieInfo });
    } else {
      res.status(404).send("Eksik bilgi girdiniz.");
    }
  } else {
    res.status(401).send("Böyle bir film yok.");
  }
};

// Şu an bi model olmadığı için garip görünen patch func :D
const patchMovie = (req, res) => {
  const { id } = req.params;
  let { movieInfo } = req.body;
  let index = movies.findIndex((movie) => movie.id === Number(id));
  console.log(`index`, index);
  if (index !== -1) {
    movies[index] = {
      id: movies[index].id,
      name: movieInfo.name ? movieInfo.name : movies[index].name,
      rate: movieInfo.rate ? movieInfo.rate : movies[index].rate,
    };
    res.status(200).send({ id: movies[index].id, ...movieInfo });
  } else {
    res.status(401).send("Böyle bir film yok.");
  }
};

// ID'ye göre film silen func
const deleteMovie = (req, res) => {
  const { id } = req.params;
  let index = movies.findIndex((movie) => movie.id === Number(id));
  if (index !== -1) {
    movies = movies.filter((movie) => movie.id !== Number(id));
    res.status(200).send(movies);
  } else {
    res.status(404).send("Böyle bir film yok.");
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  patchMovie,
  deleteMovie,
};
