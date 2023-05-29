import request from 'supertest';
import app from '../server';

describe('API', () => {

  it('get request without parameters', async () => {
    const response = await request(app).get('/api/available');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({"error": "request parameters 'date' and 'resourceId' are required" });
  });

  it('get request with bad parameters', async () => {
    const response = await request(app)
      .get('/api/available')
      .query({ param1: 'value1', param2: 'value2' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({"error": "request parameters 'date' and 'resourceId' are required" });
  });

  it('get request with bad type of parameters', async () => {
    const response = await request(app)
      .get('/api/available')
      .query({ date: 1234, resourceId: 'ABCDEF' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ "error": "wrong format for param date or resourceId" });
  });

  it('get request with good parameters and room available', async () => {
    const currentDate = new Date()
    
    currentDate.setHours(13)

    const response = await request(app)
      .get('/api/available')
      .query({ date: currentDate.toISOString(), resourceId: 1337 });
      
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "available": true });
  });
  
  it('get request with good parameters and room not available', async () => {
    const currentDate = new Date()
    
    currentDate.setHours(10, 30)

    const response = await request(app)
      .get('/api/available')
      .query({ date: currentDate.toISOString(), resourceId: 1337 });
      
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "available": false });
  });

  it('get request with good parameters but to a closed resource', async () => {
    const currentDate = new Date()
    
    currentDate.setHours(6)

    const response = await request(app)
      .get('/api/available')
      .query({ date: currentDate.toISOString(), resourceId: 4242 });
      
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ "available": false });
  });
});


