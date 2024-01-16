const launches = new Map();
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);


function doesLaunchExist(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    const latestLaunch = Object.assign(launch, {
        flightNumber: latestFlightNumber,
        upcoming: true,
        success: true,
        customers: ['ZTM', 'NASA'],
    });
    launches.set(latestFlightNumber, latestLaunch);

    return latestLaunch;
}

function abortLaunchById(launchId) {
    let abortedLaunch = launches.get(launchId);
    abortedLaunch.upcoming = false;
    abortedLaunch.success = false;
    return abortedLaunch;
}

module.exports = { addNewLaunch, doesLaunchExist, abortLaunchById, getAllLaunches };