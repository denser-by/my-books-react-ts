const SvcAuthors = require('../service/SvcAuthors.js');

class CtrlAuthors {
    async create(req, res) {
        try {
            const createdAuthor = await SvcAuthors.create(req.body);
            res.json(createdAuthor);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const authors = await SvcAuthors.getAll();
            return res.json(authors);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const author = await SvcAuthors.getOne(req.params.id);
            return res.json(author);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedAuthor = await SvcAuthors.update(req.body);
            return res.json(updatedAuthor);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const deletedAuthor = await SvcAuthors.delete(req.params.id);
            return res.json(deletedAuthor);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CtrlAuthors()