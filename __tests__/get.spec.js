const app = require('../server'); 
const supertest = require('supertest');
const { expect } = require('@jest/globals');


const volunteersController = require('../controllers/volunteers');
const trucksController = require('../controllers/trucks');
const stationsController = require('../controllers/stations');
const incidentsController = require('../controllers/incidents');


jest.mock('../data/database', () => ({
      initDb: jest.fn((callback) => callback(null)), 
       getDatabase: jest.fn().mockReturnValue({
        connection: {
            db: {
                collection: jest.fn().mockReturnValue({
                    find: jest.fn().mockReturnValue({
                        toArray: jest.fn().mockResolvedValue([
                            { id: 1, name: 'Test Data' } 
                        ]) 
                    })
                })
            }
        }
    })
}));

describe('GET Routes Unit Tests', () => {

   
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(), 
            json: jest.fn()
        };
    });

  
    test('getAllVolunteers should return 200', async () => {
        await volunteersController.getAllVolunteers(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

   
    test('getAllTrucks should return 200', async () => {
        await trucksController.getAllTrucks(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    
    test('getAllStations should return 200', async () => {
        await stationsController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

    
    test('getAllIncidents should return 200', async () => {
        await incidentsController.getAll(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });

});