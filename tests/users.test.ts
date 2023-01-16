import request from 'supertest';

import { httpServer } from '../src/index';

describe('GET /api/users', function() {
  it('responds with empty array', async function() {
    const response = await request(httpServer)
      .get('/api/users')
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
    
  });
});

describe('POST /api/user', function() {
  it('post user', async function() {
    const response = await request(httpServer)
      .post('/api/users')
      .send({ "username": "user1",
              "age": 13,
              "hobbies": ["football"]
      }) 
      .set('Accept', 'application/json')
      expect(response.statusCode).toEqual(201)
      expect(response.body).toHaveProperty('username')
      expect(response.body.username).toEqual("user1")
      expect(response.body).toHaveProperty('age')
      expect(response.body.age).toEqual(13)
      })
  });

describe('GET /api/users/:id', function() {
    it('responds with userId is invalid (not uuid)', async function() {
      const response = await request(httpServer)
        .get('/api/users/172632-46464-36363')
        .set('Accept', 'application/json')
      expect(response.status).toEqual(400);
      expect(response.body).toEqual('userId is invalid (not uuid)');
      
    });
  });

afterAll(() => {
  httpServer.close()
})




