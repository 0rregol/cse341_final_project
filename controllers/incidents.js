const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().connection.db.collection('incidents').find().toArray();
    res.status(200).json(result);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json('Invalid ID');
    const result = await mongodb.getDatabase().connection.db.collection('incidents').find({ _id: new ObjectId(req.params.id) }).toArray();
    if (result.length === 0) return res.status(404).json('Incident not found');
    res.status(200).json(result[0]);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createIncident = async (req, res) => {
  try {
    const incident = { type: req.body.type, location: req.body.location, date: req.body.date, status: req.body.status };
    const response = await mongodb.getDatabase().connection.db.collection('incidents').insertOne(incident);
    if (response.acknowledged) res.status(201).json(response);
    else res.status(500).json(response.error);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateIncident = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json('Invalid ID');
    const incident = { type: req.body.type, location: req.body.location, date: req.body.date, status: req.body.status };
    const response = await mongodb.getDatabase().connection.db.collection('incidents').replaceOne({ _id: new ObjectId(req.params.id) }, incident);
    if (response.modifiedCount > 0) res.status(204).send();
    else res.status(500).json('Error updating');
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteIncident = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json('Invalid ID');
    const response = await mongodb.getDatabase().connection.db.collection('incidents').deleteOne({ _id: new ObjectId(req.params.id) });
    if (response.deletedCount > 0) res.status(200).send();
    else res.status(500).json('Error deleting');
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAll, getSingle, createIncident, updateIncident, deleteIncident };