const { app } = require('../../src/app');
const request = require('supertest');
const Animal = require('../../src/models/Animal');

afterEach(() => {
    return Animal.destroy({ truncate: true });
});

test('get root page of animals (no animals on database)', () => {
    return request(app)
        .get('/animal')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toStrictEqual([]);
        });
});

test('get root page of animals (no animals on database)', () => {
    return request(app)
        .get('/animal')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toStrictEqual([]);
        });
});

test('register animal to database', () => {
    return request(app)
        .post('/animal')
        .send({ name: 'Gato', species: 'Felis catus',  speed: 9.77 })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toEqual(
                expect.objectContaining({
                    name: 'Gato',
                    species: 'Felis catus',
                    speed: 9.77
                }
            ));
        });
});

test('register animal with incorrect data', () => {
    return request(app)
        .post('/animal')
        .send({ name: 'Cachorro',  speed: 5.45 })
        .expect(400)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toStrictEqual({
                code: 400,
                message: 'Bad request.',
            });
        });
});

test('update animal', async () => {
    const animal = await Animal.create({ name: 'Vaca', species: 'Bos taurus', speed: 1.00 });

    const response = await request(app)
        .put('/animal/' + animal.id)
        .send({ id: animal.id, name: 'Vaco', species: 'Bos taurus', speed: 1.1 })
        .expect(200)
        .expect('Content-Type', /json/);

    expect(response.body).toStrictEqual([1]);

    const animalUpdated = await Animal.findByPk(animal.id);
    expect(animalUpdated.name).toBe('Vaco');
    expect(animalUpdated.species).toBe('Bos taurus');
    expect(animalUpdated.speed).toBe(1.1);
});

test('delete animal', async () => {
    const animal = await Animal.create({ name: 'Cavalo', species: 'Equus ferus caballus', speed: 7.77 });

    const response = await request(app)
        .delete('/animal/' + animal.id)
        .expect(200)
        .expect('Content-Type', /json/);

    expect(response.body).toStrictEqual({ deleted: 1 });

    const animalDeleted = await Animal.findByPk(animal.id);
    expect(animalDeleted).toBeNull();
});

test('get animal', async () => {
    const animal = await Animal.create({ name: 'Urso', species: 'Ursus arctos horribilis', speed: 3.34 });

    const response = await request(app)
        .get('/animal/' + animal.id)
        .expect(200)
        .expect('Content-Type', /json/);
    
    expect(response.body).toEqual(
        expect.objectContaining({
            name: 'Urso',
            species: 'Ursus arctos horribilis',
            speed: 3.34,
        })
    );
});
