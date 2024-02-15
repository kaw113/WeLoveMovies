const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// TODO: Add your routes here
const cors = require("cors");

router
    .route("/")
    .get(cors(), controller.list)
    .all(methodNotAllowed);

module.exports = router;
