const db = require("../db/connection");

async function list(is_showing) {
  return db("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

async function read(movie_id) {
  // TODO: Add your code here
  return db("movies").select("*").where({ movie_id }).first();
}

async function listMovieCritics() {
  return response.status(404).json({ error: 'Movie not found.' });
}

async function listReviewsByMovieId(movieId) {
  return db("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "r.movie_id": movieId })
    .select(
      "r.*",
      "c.critic_id as critic.critic_id",
      "c.preferred_name as critic.preferred_name",
      "c.surname as critic.surname",
      "c.organization_name as critic.organization_name"
    )
    .then((reviews) => {
      // Make sure to handle the case where there are no reviews
      if (reviews.length === 0) {
        return reviews;
      }

      // Map over reviews and create a critic property
      return reviews.map((review) => ({
        ...review,
        critic: {
          critic_id: review["critic.critic_id"],
          preferred_name: review["critic.preferred_name"],
          surname: review["critic.surname"],
          organization_name: review["critic.organization_name"],
        },
      }));
    });
}

async function listTheatersByMovieId(movieId) {
  return db("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .where({ "mt.movie_id": movieId })
    .select("*");
}

module.exports = {
  list,
  read,
  listMovieCritics,
  listReviewsByMovieId,
  listTheatersByMovieId,
};
