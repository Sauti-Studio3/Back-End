const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');

describe('users-router', () => {
  beforeAll(async () => {
    await db('flows').truncate();
  })
  let token;
  let userId;
  beforeAll(done => {
    request(server)
      .post('/api/auth/login')
      .send({
        username: 'leni',
        password: 'hauer'
      })
      .end((err, res) => {
        token = res.body.token;
        userId = res.body.user.id;
        done();
      })
  })

  describe('POST /:id/flows', () => {

    it('returns 400 Bad Request if missing \'name\' field', () => {
      request(server)
        .post(`/api/users/${userId}/flows`)
        .set('Authorization', token)
        .send({
          nothing: 'I am an invalid request'
        })
        .then(res => {
          expect(res.status).toBe(400)
        });
    });

    it('returns an object with a \'name\' property', () => {
      request(server)
        .post(`/api/users/${userId}/flows`)
        .set('Authorization', token)
        .send({
          name: 'a new flow'
        })
        .then(res => {
          expect(res.body).toHaveProperty('name'); 
        });
    });
  });

  describe('GET /:id/flows', () => {

    it('returns 200 OK', () => {
      request(server)
        .get(`/api/users/${userId}/flows`)
        .set('Authorization', token)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
//ugh
    it('returns an array of 1 element', () => {
      request(server)
        .get(`/api/users/${userId}/flows`)
        .set('Authorization', token)
        .then(res => {
          expect(res.body).toHaveLength(1);
        })
    })
  })
})