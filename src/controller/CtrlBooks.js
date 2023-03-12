const SvcBooks = require('../service/SvcBooks.js');

class CtrlBooks {
    async create(req, res) {
        try {
            const createdBook = await SvcBooks.create(req.body);
            res.status(200).json(createdBook);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const books = await SvcBooks.getAll();
            return res.status(200).json(books);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const book = await SvcBooks.getOne(req.params.id);
            return res.status(200).json(book);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedBook = await SvcBooks.update(req.body);
            return res.status(200).json(updatedBook);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const deletedBook = await SvcBooks.delete(req.params.id);
            return res.status(200).json(deletedBook);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new CtrlBooks()