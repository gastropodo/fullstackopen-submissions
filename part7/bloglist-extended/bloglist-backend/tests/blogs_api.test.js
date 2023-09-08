const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const dataName = 'blog';
const Blog = require('../models/blog');
const User = require('../models/user');
const baseRoute = '/api/blogs';
const initialData = helper.initialBlogs;
const newData = helper.newBlog;
const invalidData = helper.invalidBlogs;
const dataInDb = helper.blogsInDb;
const nonExistingId = helper.nonExistingBlogId;
const checkProp = 'title';
const updateProp = {
    key: 'likes',
    value: initialData[0].likes + 1,
};
const user = helper.initialUsers[0];

beforeEach(async () => {
    await User.deleteMany({});
    const newUser = new User({
        ...user,
        passwordHash: await bcrypt.hash(user.password, 10),
    });
    await newUser.save();
    user.id = newUser._id.toString();
    await Blog.deleteMany({});
    for (let blog of initialData) {
        const newBlog = new Blog({ ...blog, user: newUser._id });
        await newBlog.save();
    }
    const result = await api
        .post('/api/login')
        .send({ username: user.username, password: user.password });
    user.token = result.body.token;
});

describe(`${dataName} tests`, () => {
    describe(`when there is initially some ${dataName}s saved`, () => {
        test(`${dataName}s are returned as json`, async () => {
            await api
                .get(baseRoute)
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(200)
                .expect('Content-Type', /application\/json/);
        });

        test(`all ${dataName}s are returned`, async () => {
            const res = await api
                .get(baseRoute)
                .set({ Authorization: `Bearer ${user.token}` });
            expect(res.body).toHaveLength(initialData.length);
        });

        test(`${dataName}s unique identifyer is named id not _id`, async () => {
            const res = await api
                .get(baseRoute)
                .set({ Authorization: `Bearer ${user.token}` });

            res.body.forEach((data) => {
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
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(result.body).toEqual(dataToView);
        });

        test(`fails with status code 404 if ${dataName} does not exist`, async () => {
            const validNonExistingId = await nonExistingId();

            await api
                .get(`${baseRoute}/${validNonExistingId}`)
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(404);
        });

        test('fails with status code 400 if id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445';

            await api
                .get(`${baseRoute}/${invalidId}`)
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(400);
        });
    });

    describe(`adding a new ${dataName}`, () => {
        test('succeeds with status code 201 with valid data', async () => {
            await api
                .post(baseRoute)
                .send(newData)
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(201)
                .expect('Content-Type', /application\/json/);

            const res = await api
                .get(baseRoute)
                .set({ Authorization: `Bearer ${user.token}` });
            const props = res.body.map((r) => r[checkProp]);

            expect(res.body).toHaveLength(initialData.length + 1);
            expect(props).toContain(newData[checkProp]);
        });

        test('fails with status code 401 id no token is provided', async () => {
            await api.post(baseRoute).send(newData).expect(401);
        });

        test('fails with status code 400 if data is invalid', async () => {
            for (let data of invalidData) {
                await api
                    .post(baseRoute)
                    .send(data)
                    .set({ Authorization: `Bearer ${user.token}` })
                    .expect(400);
            }

            const response = await api
                .get(baseRoute)
                .set({ Authorization: `Bearer ${user.token}` });
            expect(response.body).toHaveLength(initialData.length);
        });
    });

    describe(`deleting a ${dataName}`, () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const dataAtStart = await dataInDb();
            const dataToDelete = dataAtStart[0];

            await api
                .delete(`${baseRoute}/${dataToDelete.id}`)
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(204);

            const dataAtEnd = await dataInDb();
            expect(dataAtEnd).toHaveLength(initialData.length - 1);

            const props = dataAtEnd.map((r) => r[checkProp]);
            expect(props).not.toContain(dataToDelete[checkProp]);
        });

        test(`succeeds with status code 204 even ${dataName} does not exist, no modifications on database`, async () => {
            const validNonExistingId = await nonExistingId();

            await api
                .delete(`${baseRoute}/${validNonExistingId}`)
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(204);

            const dataAtEnd = await dataInDb();
            expect(dataAtEnd).toHaveLength(initialData.length);
        });
    });

    describe(`updating a ${dataName}`, () => {
        test(`succeeds with status code 200 if ${dataName} exists and data is valid`, async () => {
            const dataAtStart = await dataInDb();
            const dataToUpdate = dataAtStart[0];
            const newObject = { ...dataToUpdate, user: user.id };
            newObject[updateProp.key] = updateProp.value;

            const result = await api
                .put(`${baseRoute}/${dataToUpdate.id}`)
                .send(newObject)
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(result.body).toEqual(newObject);

            const dataUpdated = await api
                .get(`${baseRoute}/${dataToUpdate.id}`)
                .set({ Authorization: `Bearer ${user.token}` });
            expect(dataUpdated.body[updateProp.key]).toBe(updateProp.value);
        });

        test('fails with status code 400 if data is invalid', async () => {
            const dataAtStart = await dataInDb();
            const dataToUpdate = dataAtStart[0];
            dataToUpdate[checkProp] = null;

            await api
                .put(`${baseRoute}/${dataToUpdate.id}`)
                .send(dataToUpdate)
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(400);
        });

        test(`fails with status code 404 if ${dataName} does not exist`, async () => {
            const validNonExistingId = await nonExistingId();

            await api
                .put(`${baseRoute}/${validNonExistingId}`)
                .send(initialData[0])
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(404);
        });

        test('fails with status code 400 if id is invalid', async () => {
            const invalidId = '5a3d5da59070081a82a3445';

            await api
                .put(`${baseRoute}/${invalidId}`)
                .send(initialData[0])
                .set({ Authorization: `Bearer ${user.token}` })
                .expect(400);
        });
    });

    describe(`specific ${dataName}s tests`, () => {
        test('if likes property is missing, defaults to 0', async () => {
            const newBlog = {
                title: 'Canonical string reduction',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            };
            const res = await api
                .post(baseRoute)
                .send(newBlog)
                .set({ Authorization: `Bearer ${user.token}` });
            expect(res.body.likes).toBe(0);
        });
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
