const express = require('express');

const planetsRouter = express.Router();

const { getAllPlanets } = require("./planets.controller.js")

planetsRouter.get("/", (req, res) => getAllPlanets(req, res))

module.exports = planetsRouter;