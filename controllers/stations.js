const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().connection.db.collection('stations').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json('Invalid ID');
    const result = await mongodb.getDatabase().connection.db.collection('stations').find({ _id: new ObjectId(req.params.id) }).toArray();
    if (result.length === 0) return res.status(404).json('Station not found');
    res.status(200).json(result[0]);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createStation = async (req, res) => {
  try {
    const station = { name: req.body.name, address: req.body.address, city: req.body.city, phone: req.body.phone };
    const response = await mongodb.getDatabase().connection.db.collection('stations').insertOne(station);
    if (response.acknowledged) res.status(201).json(response);
    else res.status(500).json(response.error);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateStation = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json('Invalid ID');
    const station = { name: req.body.name, address: req.body.address, city: req.body.city, phone: req.body.phone };
    const response = await mongodb.getDatabase().connection.db.collection('stations').replaceOne({ _id: new ObjectId(req.params.id) }, station);
    if (response.modifiedCount > 0) res.status(204).send();
    else res.status(500).json('Error updating');
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteStation = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json('Invalid ID');
    const response = await mongodb.getDatabase().connection.db.collection('stations').deleteOne({ _id: new ObjectId(req.params.id) });
    if (response.deletedCount > 0) res.status(200).send();
    else res.status(500).json('Error deleting');
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAll, getSingle, createStation, updateStation, deleteStation };