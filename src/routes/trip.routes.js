const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Trip created' });
});

router.get('/', (req, res) => {
  res.json({ trips: [] });
});

module.exports = router;
