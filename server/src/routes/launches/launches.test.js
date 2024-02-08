const request = require('supertest');
const app = require('../../app.js')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo.js');
// the outer describe helps to set up a common test environment for all the other
// tests within, for example making connection to mongoDB before the tests.
describe('Launches API', () => {
    // will run once before all the tests that come after
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    });

    describe("Test GET /launches", () => {
        test('It should respond with 200 success', async () => {
            const response = await request(app).get('/launches').expect('Content-Type', /json/).expect(200);
            expect(response.statusCode).toBe(200);
        });
    });

    describe('Test POST /launch', () => {
        const completeLaunchData = {
            mission: "Launch Mission",
            target: "Kepler-442 b",
            rocket: "NCC 1701-D",
            launchDate: "January 4, 2028"
        }
        const launchDataWithoutDate = {
            mission: "Launch Mission",
            target: "Kepler-442 b",
            rocket: "NCC 1701-D",
        }
        test('It should respond with 201 created', async () => {
            const response = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date((await response).body.launchDate).valueOf();
            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);

        });
        test('It should catch missing required properties', async () => {
            const response = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: "Missing required launch property"
            });
        });

        test('It should catch invalid dates', async () => {
            const launchDataWithInvalidDate = {
                mission: "Launch Mission",
                target: "Kepler-442 b",
                rocket: "NCC 1701-D",
                launchDate: "Test"
            }

            const response = await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect(400);

            expect(response.body).toStrictEqual({
                error: "Invalid date"
            })
        });
    });
})
