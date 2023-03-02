import Author from '../model/Author.js';
import SvcAuthors from '../service/SvcAuthors.js';

class CtrlAuthors {

    async create(req, res) {
        try {
            const author = await SvcAuthors.create(req.body);
            res.json(author);
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
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            const author = await SvcAuthors.delete(req.params.id);
            return res.json(author);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new CtrlAuthors();