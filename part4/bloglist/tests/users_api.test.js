const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const dataName = 'user';
const User = require('../models/user');
const baseRoute = '/api/users';
const initialData = helper.initialUsers;
const newData = helper.newUser;
const invalidData = helper.invalidUsers;
const dataInDb = helper.usersInDb;
const nonExistingId = helper.nonExistingUserId;
const checkProp = 'username';

beforeEach(async () => {
    await User.deleteMany({});
    for (let user of initialData) {
        user.passwordHash = await bcrypt.hash(user.password, 10);
    }
    await User.insertMany(initialData);
});

describe(`${dataName} tests`, () => {
    describe(`when there is initially some ${dataName}s saved`, () => {
        test(`${dataName}s are returned as json`, async () => {
            await api
                .get(baseRoute)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        });

        test(`all ${dataName}s are returned`, async () => {
            const res = await api.get(baseRoute);
            expect(res.body).toHaveLength(initialData.length)
        });

        test(`${dataName}s unique identifyer is named id not _id`, async () => {
            const res = await api.get(baseRoute);

            res.body.forEach(data => {
                expect(data.id).toBeDefined();
                expect(data._id).toBeUndefined();
            });
        });
    });

    describe(`viewing a specific ${dataName}`, () => {
        test('succeeds with a valid id', async () => {
            const dataAtStart = await dataInDb();
            const dataToView = dataAtStart[0];

            const result = await api
                .get(`${baseRoute}/${dataToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(result.body).toEqual(dataToView);
        });

        test(`fails with status code 404 if ${dataName} does not exist`, async () => {
            const validNonExistingId = await nonExistingId();

            await api
                .get(`${baseRoute}/${validNonExistingId}`)
                .expect(404)
        });

        test('fails with status code 400 if id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445';

            await api
                .get(`${baseRoute}/${invalidId}`)
                .expect(400)
        });
    });

    describe(`adding a new ${dataName}`, () => {
        test('succeeds with status code 201 with valid data', async () => {
            await api
                .post(baseRoute)
                .send(newData)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const res = await api.get(baseRoute);
            const props = res.body.map(r => r[checkProp]);

            expect(res.body).toHaveLength(initialData.length + 1);
            expect(props).toContain(newData[checkProp]);
        });

        test('fails with status code 400 if data is invalid', async () => {
            for (let data of invalidData) {
                await api
                    .post(baseRoute)
                    .send(data)
                    .expect(400)
            }

            const response = await api.get(baseRoute);
            expect(response.body).toHaveLength(initialData.length);
        });
    });
});

afterAll(async () => {
    await mongoose.connection.close()
});