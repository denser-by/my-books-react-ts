const SvcRoles = require('../service/SvcRoles.js');

class CtrlRoles {
    async create(req, res) {
        try {
            const createdRole = await SvcRoles.create(req.body);
            res.status(200).json(createdRole);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const roles = await SvcRoles.getAll();
            return res.status(200).json(roles);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const role = await SvcRoles.getOne(req.params.id);
            return res.status(200).json(role);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedRole = await SvcRoles.update(req.body);
            return res.status(200).json(updatedRole);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const deletedRole = await SvcRoles.delete(req.params.id);
            return res.status(200).json(deletedRole);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CtrlRoles()