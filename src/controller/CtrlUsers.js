const SvcUsers = require('../service/SvcUsers.js');

class CtrlUsers {
    async create(req, res) {
        try {
            const createdUser = await SvcUsers.create(req.body);
            res.json(createdUser);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const users = await SvcUsers.getAll();
            return res.json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const user = await SvcUsers.getOne(req.params.id);
            return res.json(user);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await SvcUsers.update(req.body);
            return res.json(updatedUser);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const deletedUser = await SvcUsers.delete(req.params.id);
            return res.json(deletedUser);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CtrlUsers()