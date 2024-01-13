const express = require('express');
const launchesRouter = express.Router();

const { getAllLaunches } = require('./launches.controller.js')

launchesRouter.get('/launches', (req, res) => getAllLaunches(req, res));

launchesRouter.get('/upcoming', (req, res) => getAllLaunches(req, res));
module.exports = launchesRouter;