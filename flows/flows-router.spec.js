const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');
//hi
describe('flows-router', () => {
  beforeAll(async () => {
    await db('flows')
      .truncate()
      .insert({
        name: 'testing that flow',
        user_id: 1
      });
  });

  let token;
  beforeAll(done => {
    request(server)
      .post('/api/auth/login')
      .send({
        username: 'leni',
        password: 'hauer'
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('GET /:id', () => {
    let response;
    beforeAll(done => {
      request(server)
        .get('/api/users/flows/2')
        .set('Authorization', token)
        .end((err, res) => {
          response = res;
          done();
        });
    });
    it('returns flow with pages property', () => {
      expect(response.body).toHaveProperty('pages');
    });
    it('returns 200 OK', () => {
      expect(response.status).toBe(200);
    });
  });

  describe('PUT /:id', () => {
    it('returns an object with name property', () => {
      request(server)
        .put('/api/users/flows/2')
        .set('Authorization', token)
        .send({
          name: 'an even better flow'
        })
        .then(res => {
          expect(res.body).toHaveProperty('name');
        });
    });

    it('returns 200 OK', () => {
      request(server)
        .put('/api/users/flows/2')
        .set('Authorization', token)
        .send({
          name: 'the bestest ever flow'
        })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe('DELETE /:id', () => {
    let response;
    beforeAll(done => {
      request(server)
        .delete('/api/users/flows/2')
        .set('Authorization', token)
        .end((err, res) => {
          response = res;
          done();
        });
    });

    it('returns a flow object', () => {
      expect(response.body).toHaveProperty('name');
    });
    it('returns 200 Ok', () => {
      expect(response.status).toBe(200);
    });
  });
})