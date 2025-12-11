const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllVolunteers = async (req, res) => {
  try {
    
    const result = await mongodb.getDatabase().connection.db.collection('volunteers').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVolunteerById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid contact id to find a volunteer.');
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().connection.db.collection('volunteers').find({ _id: userId }).toArray();
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVolunteer = async (req, res) => {
  try {
    const volunteer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      badgeNumber: req.body.badgeNumber,
      rank: req.body.rank,
      stationId: req.body.stationId,
      bloodType: req.body.bloodType 
    };
    const response = await mongodb.getDatabase().connection.db.collection('volunteers').insertOne(volunteer);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the volunteer.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateVolunteer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid volunteer id to update.');
    }
    const userId = new ObjectId(req.params.id);
    const volunteer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      badgeNumber: req.body.badgeNumber,
      rank: req.body.rank,
      stationId: req.body.stationId,
      bloodType: req.body.bloodType
    };
    const response = await mongodb.getDatabase().connection.db.collection('volunteers').replaceOne({ _id: userId }, volunteer);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the volunteer.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid contact id to delete a volunteer.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().connection.db.collection('volunteers').deleteOne({ _id: userId }, true);
    
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the volunteer.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllVolunteers,
  getVolunteerById,
  createVolunteer,
  updateVolunteer,
  deleteVolunteer
};