/* eslint-disable no-undef */
const request = require('supertest');

const APIURL = 'https://localhost:3333';

describe('GET /user', () => {
  it('returns the user DB', () => request(APIURL)
    .get('/api/user')
    .expect(200)
    .expect('Content-Type', /json/));
});

describe('GET /appointment', () => {
  it('returns the user DB', () => request(APIURL)
    .get('/api/appointment')
    .expect(200)
    .expect('Content-Type', /json/));
});
