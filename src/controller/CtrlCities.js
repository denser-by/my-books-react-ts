const SvcCities = require('../service/SvcCities.js');

class CtrlCities {
    async create(req, res) {
        try {
            const createdCity = await SvcCities.create(req.body);
            res.status(200).json(createdCity);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const cities = await SvcCities.getAll();
            return res.status(200).json(cities);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const city = await SvcCities.getOne(req.params.id);
            return res.status(200).json(city);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedCity = await SvcCities.update(req.body);
            return res.status(200).json(updatedCity);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const deletedCity = await SvcCities.delete(req.params.id);
            return res.status(200).json(deletedCity);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CtrlCities()