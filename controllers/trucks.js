const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTrucks = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().connection.db.collection('trucks').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTruckById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid truck id.');
    }
    const truckId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().connection.db.collection('trucks').find({ _id: truckId }).toArray();
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTruck = async (req, res) => {
  try {
    const truck = {
      plateNumber: req.body.plateNumber, // Patente o código (ej: B-1)
      brand: req.body.brand,             // Marca (ej: Renault)
      model: req.body.model,             // Modelo
      year: req.body.year,               // Año
      status: req.body.status || 'Active' // Estado
    };
    
    const response = await mongodb.getDatabase().connection.db.collection('trucks').insertOne(truck);
    
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the truck.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTruck = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid truck id to update.');
    }
    const truckId = new ObjectId(req.params.id);
    const truck = {
      plateNumber: req.body.plateNumber,
      brand: req.body.brand,
      model: req.body.model,
      year: req.body.year,
      status: req.body.status
    };
    
    const response = await mongodb.getDatabase().connection.db.collection('trucks').replaceOne({ _id: truckId }, truck);
    
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the truck.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTruck = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid truck id to delete.');
    }
    const truckId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().connection.db.collection('trucks').deleteOne({ _id: truckId }, true);
    
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the truck.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck
};