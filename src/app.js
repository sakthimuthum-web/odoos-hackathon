const express = require('express');
const cors = require('cors');

const tripRoutes = require('../routes/trips');
const activityRoutes = require('../routes/activities');
const stopsRoutes = require('../routes/stops');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/trips', tripRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/stops', stopsRoutes);

app.get('/', (req, res) => {
  res.send('GlobeTrotter API running');
});

module.exports = app;
