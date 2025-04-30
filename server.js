const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;
const TOTAL_DEVICES = 100000;

function generateDevices(count, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const id = offset + i;
    return {
      id,
      name: `Device ${id + 1}`,
      imageUrl: `https://picsum.photos/seed/${id}/200/200`,
      details: {
        model: `Model ${id % 10}`,
        os: `OS ${id % 5}`,
        serial: `SN${10000 + id}`,
        status: id % 2 === 0 ? 'Active' : 'Inactive',
      },
    };
  });
}

app.use(cors());

app.get('/api/devices', (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 50;
  const offset = (page - 1) * pageSize;
  const count = Math.min(pageSize, TOTAL_DEVICES - offset);
  const devices = generateDevices(count, offset);
  res.json({ devices, total: TOTAL_DEVICES });
});

app.listen(PORT, () => {
  console.log(`Device API server running at http://localhost:${PORT}/api/devices`);
});
