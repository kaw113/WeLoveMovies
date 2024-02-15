if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

// TODO: Add your code here
const methodNotAllowed = require("./errors/methodNotAllowed");
const asyncErrorBoundary = require("./errors/asyncErrorBoundary");

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

app.use(methodNotAllowed);
app.use(asyncErrorBoundary);

module.exports = app;
