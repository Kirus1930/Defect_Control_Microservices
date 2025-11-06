const express = require('express');
const app = express();
app.use(express.json());

const users = [];

app.get('/v1/health', (_, res) => res.json({ success: true, data: { status: 'ok' } }));

app.post('/v1/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ success: false, error: { code: 'USER_EXISTS', message: 'User already exists' } });
  }
  const id = users.length + 1;
  const user = { id, email, name, password };
  users.push(user);
  res.status(201).json({ success: true, data: { id } });
});

app.post('/v1/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, error: { code: 'INVALID_CREDENTIALS', message: 'Invalid login' } });
  res.json({ success: true, data: { token: 'fake-jwt-token', userId: user.id } });
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
