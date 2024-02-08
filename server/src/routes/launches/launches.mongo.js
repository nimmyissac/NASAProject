let mongoose = require('mongoose');

// create a schema
const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    destination: {
        type: String,
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
