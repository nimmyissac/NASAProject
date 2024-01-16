const path = require('path');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');

const planetsRouter = require('./routes/planets/planets.router.js');
const launchesRouter = require('./routes/launches/launches.router.js');

const app = express();



app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(morgan("combined"));

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

// This means if any path other than specifically defined here comes,
// load the static index.html. Client will handle the routing
/* Any frontend(React/ Angular / vue) which uses the history API (spefically the pushstate) for routing
   can be served from express like this
*/
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})


module.exports = app;