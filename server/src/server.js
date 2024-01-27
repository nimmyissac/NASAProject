const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model.js');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:twKMoODiWwTYkM49@nasacluster.4ztte11.mongodb.net/nasa?retryWrites=true&w=majority';
const server = http.createServer(app);

// mongoose.connection is an event emitter that emits event when connection is ready/succeeded/errors

// .once gets triggered only once
mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready!');
});

mongoose.connection.on('error', err => {
    console.error('err');
});

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT, () => { console.log(`listening to Port ${PORT}`); });
}

startServer();