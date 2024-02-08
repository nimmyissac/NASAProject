const launchesDatabase = require('../routes/launches/launches.mongo.js');
const planets = require('../routes/planets/planets.mongo.js')
const DEFAULT_FLIGHT_NUMBER = 100;


async function doesLaunchExist(launchId) {
    const launch = await launchesDatabase.findOne({ flightNumber: +launchId });
    return launch !== null;
}

async function getAllLaunches() {
    return await launchesDatabase
        .find({}, {
            '_id': 0,
            '__v': 0
        });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function scheduleNewLaunch(launch) {
    let newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        upcoming: true,
        success: true,
        customers: ['ZTM', 'NASA'],
    });
    await saveLaunch(newLaunch);
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({ keplerName: launch.target });
    if (!planet) {
        throw new Error('No matching planet found');
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function abortLaunch(launchId) {
    let abortedLaunch = await launchesDatabase
        .updateOne({ flightNumber: launchId }, {
            upcoming: false,
            success: false
        });

    return abortedLaunch.matchedCount === 1 && abortedLaunch.modifiedCount === 1;

}

module.exports = { scheduleNewLaunch, doesLaunchExist, abortLaunch, getAllLaunches };