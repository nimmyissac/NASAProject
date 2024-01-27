const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require('../routes/planets/planets.mongo.js');

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

async function loadPlanetsData() {
    // __dirname  => current folder this file is in
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    await savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err)
                reject(err);
            })
            .on('end', () => {
                resolve();
            })
    });

}

async function getAllPlanets() {
    return await planets.find({});
}

async function savePlanet(planet) {
    try {
        await planets.updateOne(
            { keplerName: data['kepler_name'] },
            { keplerName: data['kepler_name'] },
            { upsert: true });
    } catch (err) {
        console.log("could not save planet ", err);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}