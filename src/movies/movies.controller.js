const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(request, response, next) {
  // TODO: Add your code here.
  const { movieId } = request.params;
  const movie = await service.read(movieId);
  if (movie) {
    response.locals.movie = movie;
    return next();
  }
  return response.status(404).json({ error: 'Movie not found.' });
}

async function read(request, response) {
  // TODO: Add your code here
  const movie = response.locals.movie;
  response.json({ data: movie });
}

async function list(request, response) {
  // TODO: Add your code here.
  const movies = await service.list(request.query.is_showing);
  response.json({ data: movies });
}

async function listMovieCritics(request, response) {
  return response.status(404).json({ error: "Route should not include critics." });
}

async function listReviewsByMovieId(request, response) {
  const { movieId } = request.params;
  const data = await service.listReviewsByMovieId(movieId);
  response.json({ data });
}

async function listTheatersByMovieId(request, response) {
  const { movieId } = request.params;
  const data = await service.listTheatersByMovieId(movieId);
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listMovieCritics: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listMovieCritics)],
  listReviewsByMovieId: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviewsByMovieId)],
  listTheatersByMovieId: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersByMovieId)],
};
