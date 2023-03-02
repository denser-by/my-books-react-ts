import Author from '../model/Author.js';
import FileService from './FileService.js';

class SvcAuthors {

    async create(author, picture) {
        const fileName = FileService.saveFile(picture);
        const createdAuthor = await Author.create({ ...author, picture: fileName });
        return createdAuthor;
    }

    async getAll() {
        const authors = await Author.find();
        return authors;
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const author = await Author.findById(id);
        return author;
    }

    async update(author) {
        if (!author._id)
            throw new Error('Не указан ID');
        const updatedAuthor = await Author.findByIdAndUpdate(author._id, author, { new: true });
        return updatedAuthor;
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const author = await Author.findByIdAndDelete(id);
        return author
    }
}

export default new SvcAuthors();