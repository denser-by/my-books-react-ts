import Book from '../model/Book.js';

class CtrlBooks {

    async create(req, res) {
        try {
            const { book, title, content, picture } = req.body;
            const bookCreated = await Book.create({ book, title, content, picture });
            res.json(bookCreated);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const books = await Book.find();
            return res.json(books);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                res.status(400).json({ message: 'Id не указан' });
            const book = await Book.findById(id);
            return res.json(book);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const book = req.body;
            if (!book._id)
                res.status(400).json({ message: 'Id не указан' });
            const updatedBook = await Book.findByIdAndUpdate(book._id, book, { new: true });
            return res.json(updatedBook);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                res.status(400).json({ message: 'Id не указан' });
            const book = await Book.findByIdAndDelete(id);
            return res.json(book);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default CtrlBooks;