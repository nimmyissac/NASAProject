let mongoose = require('mongoose');

// create a schema
const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true
    },
    mission: {
        type: string,
        required: true
    },
    rocket: {
        type: string,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    destination: {
        type: string,
        required: true
    },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true
    },
});

//connects launchesSchema with the "launches" collection
module.exports = mongoose.model('launch', launchesSchema);
