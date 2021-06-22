const { app } = require('../../src/app');
const request = require('supertest');

test('get root page', () => {
    return request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /text/)
        .then(res => {
            expect(res.text).toBe('Hello World!');
        });
});
