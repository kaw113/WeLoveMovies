const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

// TODO: Add your routes here

const cors = require("cors");

router
  .route("/")
  .get(cors(), controller.list)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);

router
  .route("/:movieId/critics")
  .get(controller.listMovieCritics)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviewsByMovieId)
  .all(methodNotAllowed);

router.route("/:movieId/theaters")
  .get(controller.listTheatersByMovieId)
  .all(methodNotAllowed);

module.exports = router;
