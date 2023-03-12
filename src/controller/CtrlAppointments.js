const SvcAppointments = require('../service/SvcAppointments.js');

class CtrlAppointments {
    async create(req, res) {
        try {
            const createdAppointment = await SvcAppointments.create(req.body);
            res.status(200).json(createdAppointment);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const appointments = await SvcAppointments.getAll();
            return res.status(200).json(appointments);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const appointment = await SvcAppointments.getOne(req.params.id);
            return res.status(200).json(appointment);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedAppointment = await SvcAppointments.update(req.body);
            return res.status(200).json(updatedAppointment);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const deletedAppointment = await SvcAppointments.delete(req.params.id);
            return res.status(200).json(deletedAppointment);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CtrlAppointments()