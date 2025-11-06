const express = require('express');
const app = express();
app.use(express.json());

const orders = [];

app.get('/v1/health', (_, res) => res.json({ success: true, data: { status: 'ok' } }));

app.post('/v1/orders', (req, res) => {
  const { userId, items, total } = req.body;
  if (!userId || !items || !total) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_ORDER', message: 'Missing fields' } });
  }
  const id = orders.length + 1;
  const order = { id, userId, items, total, status: 'created' };
  orders.push(order);
  res.status(201).json({ success: true, data: { id } });
});

app.get('/v1/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ success: false, error: { code: 'ORDER_NOT_FOUND' } });
  res.json({ success: true, data: order });
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => console.log(`Orders service running on port ${PORT}`));
