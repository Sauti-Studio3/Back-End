const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');

describe('auth-router', () => {
  
  beforeAll(async () =>  {
    await db('users').truncate();
  })

  it('runs the test', () => {
    expect(true).toBe(true);
  })

  describe('POST /register', () => {
    it('returns json', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: 'leni',
          password: 'hauer',
          email: 'leni@mail.com'
        })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });

    it('forbids duplicate usernames', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: 'leni',
          password: 'hauer',
          email: 'leni@mail.com'
        })
        .then(res => {
          expect(res.status).toBe(500);
        });
    });

    it('returns 400 when missing required fields', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: 'james',
          password: 'andrews'
        })
        .then(res => {
          expect(res.status).toBe(400);
        });
    });
  });

  describe('POST /login', () => {
    it('returns a token', () => {
      return request(server).post('/api/auth/login')
        .send({
          username: 'leni',
          password: 'hauer'
        })
        .then(res => {
          expect(res.body).toHaveProperty('token');
        })
    });

    it('returns 401 for invalid credentials', () => {
      return request(server).post('/api/auth/login')
        .send({
          username: 'leni',
          password: 'mustard'
        })
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });

  describe('GET /users', () => {
    it('returns an array of 1 element', () => {
      return request(server).get('/api/auth/users')
        .then(res => {
          expect(res.body).toHaveLength(1);
        });
    });

    it('returns json', () => {
      return request(server).get('/api/auth/users')
        .then(res => {
          expect(res.type).toMatch(/json/i);
        })
    })
  });
})