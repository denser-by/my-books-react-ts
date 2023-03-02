import Author from '../model/Author.js';

class CtrlAuthors {

    async create(req, res) {
        try {
            const { author, title, content, picture } = req.body;
            const authorCreated = await Author.create({ author, title, content, picture });
            res.json(authorCreated);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const authors = await Author.find();
            return res.json(authors);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                res.status(400).json({ message: 'Id не указан' });
            const author = await Author.findById(id);
            return res.json(author);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const author = req.body;
            if (!author._id)
                res.status(400).json({ message: 'Id не указан' });
            const updatedAuthor = await Author.findByIdAndUpdate(author._id, author, { new: true });
            return res.json(updatedAuthor);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                res.status(400).json({ message: 'Id не указан' });
            const author = await Author.findByIdAndDelete(id);
            return res.json(author);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default CtrlAuthors;