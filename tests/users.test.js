/**
 * @jest-environment node
 */
const express = require('express');

let server;
let base;

beforeEach(() => {
  delete require.cache[require.resolve('../server/routes/users')];
  const usersRouter = require('../server/routes/users');
  const app = express();
  app.use(express.json());
  app.use('/users', usersRouter);
  server = app.listen(0);
  base = `http://localhost:${server.address().port}`;
});

afterEach(() => {
  server.close();
});

test('accepts valid notification channel', async () => {
  const res = await fetch(`${base}/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notificationChannel: 'sms' })
  });
  expect(res.status).toBe(200);
  const body = await res.json();
  expect(body.notificationChannel).toBe('sms');
});

test('rejects invalid notification channel', async () => {
  const res = await fetch(`${base}/users/me`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notificationChannel: 'pigeon' })
  });
  expect(res.status).toBe(400);
  const body = await res.json();
  expect(body).toEqual({ error: 'Invalid channel' });

  const getRes = await fetch(`${base}/users/me`);
  const getBody = await getRes.json();
  expect(getBody.notificationChannel).toBe('email');
});
