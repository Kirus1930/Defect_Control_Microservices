const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const USERS_URL = process.env.USERS_URL || 'http://localhost:8001';
const ORDERS_URL = process.env.ORDERS_URL || 'http://localhost:8002';

app.get('/v1/health', (_, res) => res.json({ success: true, data: { status: 'ok' } }));

// Прокси-запросы к Users API
app.post('/v1/auth/register', async (req, res) => {
  try {
    const r = await axios.post(`${USERS_URL}/v1/auth/register`, req.body);
    res.status(r.status).json(r.data);
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

app.post('/v1/auth/login', async (req, res) => {
  try {
    const r = await axios.post(`${USERS_URL}/v1/auth/login`, req.body);
    res.status(r.status).json(r.data);
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

// Прокси-запросы к Orders API
app.post('/v1/orders', async (req, res) => {
  try {
    const r = await axios.post(`${ORDERS_URL}/v1/orders`, req.body);
    res.status(r.status).json(r.data);
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
