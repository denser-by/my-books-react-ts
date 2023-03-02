import Book from '../model/Book.js';
import SvcBooks from '../service/SvcBooks.js';

class CtrlBooks {

    async create(req, res) {
        try {
            const book = await SvcBooks.create(req.body);
            res.json(book);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const books = await SvcBooks.getAll();
            return res.json(books);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const book = await SvcBooks.getOne(req.params.id);
            return res.json(book);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const updatedBook = await SvcBooks.update(req.body);
            return res.json(updatedBook);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            const book = await SvcBooks.delete(req.params.id);
            return res.json(book);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new CtrlBooks();