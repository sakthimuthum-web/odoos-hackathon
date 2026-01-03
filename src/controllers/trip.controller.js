exports.createTrip = (req, res) => {
  res.json({ message: 'Trip created' });
};

exports.getTrips = (req, res) => {
  res.json({ trips: [] });
};
