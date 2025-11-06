const axios = require('axios');

describe('Integration test flow', () => {
  test('Health endpoints should respond OK', async () => {
    const urls = [
      'http://localhost:8000/v1/health',
      'http://localhost:8001/v1/health',
      'http://localhost:8002/v1/health'
    ];
    for (const url of urls) {
      const res = await axios.get(url);
      expect(res.data.success).toBe(true);
    }
  });
});
