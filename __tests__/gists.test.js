process.env.NODE_ENV - 'test';
const db = require('../db');
const request = require('supertest');
const app = require('../app');

beforeAll(async () => {
  await db.query(`DROP TABLE IF EXISTS gists;
  CREATE TABLE gists (id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    description TEXT,
    extension TEXT NOT NULL,
    content TEXT NOT NULL)`);
});

beforeEach(async () => {
  await db.query(
    `INSERT INTO gists (filename, description, extension, content) values ('firstgist.md', 'initial gist', 'md', 'this is my very first gist!'), ('punny.js', 'pun generator', 'js', 'console.log("you are so punny")'), ('answer.js', 'answer alerts', 'js', 'window.alert("Ehhh close enough, you get the gist of it")')`
  );
});

describe('GET /gists', () => {
  test('gets a list of existing gists', async () => {
    let response = await request(app).get('/gists');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty(
      'content',
      'this is my very first gist!'
    );
  });
});

describe('GET /gists/1', () => {
  test('gets a specific gist by id', async () => {
    let response = await request(app).get('/gists/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('filename', 'firstgist.md');
  });
});

describe('POST /gists', () => {
  test('creates a new gist', async () => {
    let response = await request(app)
      .post('/gists')
      .send({
        filename: 'hufflepuff.js',
        description: 'hufflepuff and proud',
        extension: 'js',
        content: "console.log('Hufflepuff party in the common room!')"
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('description', 'hufflepuff and proud');
  });
});

describe('PATCH /gists/1', () => {
  test('updates an existing gist', async () => {
    let response = await request(app)
      .patch('/gists/1')
      .send({
        filename: 'firstgist.md',
        description: 'initial gist',
        extension: 'md',
        content: 'UPDATED!'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content', 'UPDATED!');
  });
});

describe('DELETE /gists/2', () => {
  test('deletes an existing gist', async () => {
    let response = await request(app).delete('/gists/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Gist deleted' });
  });
});

afterAll(async () => {
  await db.query('DROP TABLE IF EXISTS gists');
  db.end();
});
