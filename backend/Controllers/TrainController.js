const Train = require("../Models/trainSchema");

const getTrains = async (req, res, next) => {
  const { trainNumber } = req.query;

  try {
    if (trainNumber) {
      const train = await Train.findOne({ trainNumber });
      if (!train) {
        return res.status(404).json({ message: "Train not found" });
      }
      return res.json(train);
    }

    const trains = await Train.find();
    res.json(trains);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTrains };
