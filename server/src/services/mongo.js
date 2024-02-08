const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://nasa-api:twKMoODiWwTYkM49@nasacluster.4ztte11.mongodb.net/nasa?retryWrites=true&w=majority';

// mongoose.connection is an event emitter that emits event when connection is ready/succeeded/errors

// .once gets triggered only once
mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready!');
});

mongoose.connection.on('error', err => {
    console.error('err');
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}