const { addNewLaunch, doesLaunchExist, getAllLaunches, abortLaunchById } = require('../../models/launches.model')
function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
}


function httpAddNewLaunch(req, res) {
    const launch = req.body;
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property"
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid date"
        });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);
    if (!doesLaunchExist(launchId)) {
        return res.status(404).json({
            error: "launchId doesn't exist"
        })
    }
    let aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = { httpAbortLaunch, httpGetAllLaunches, httpAddNewLaunch }