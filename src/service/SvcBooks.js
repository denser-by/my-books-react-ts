import Book from '../model/Book.js';
import FileService from './FileService.js';

class SvcBooks {

    async create(book, picture) {
        const fileName = FileService.saveFile(picture);
        const createdBook = await Book.create({ ...book, picture: fileName });
        return createdBook;
    }

    async getAll() {
        const books = await Book.find();
        return books;
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const book = await Book.findById(id);
        return book;
    }

    async update(book) {
        if (!author._id)
            throw new Error('Не указан ID');
        const updatedBook = await Book.findByIdAndUpdate(book._id, book, { new: true });
        return updatedBook;
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const book = await Book.findByIdAndDelete(id);
        return book
    }
}

export default new SvcBooks();