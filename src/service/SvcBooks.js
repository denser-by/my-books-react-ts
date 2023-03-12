const book = require('../../models/index.js').Book;

class SvcBooks {
    async create(bookCreate) {
        try {
            const bookItem = await book.create({ name: bookCreate.name,info: bookCreate.info,year: bookCreate.year,cover_img: bookCreate.cover_img });
            return bookItem;
        } catch (e) {
            throw new Error('Can not create Book, ' + e);
        }
    }

    async getAll() {
        const { count, rows } = await book.findAndCountAll({});
        console.log("Found Book " + count + " records");
        if (count >= 1)
            return rows;
        return [];
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Book with id=" + id);
            return null;
        }
        return rows[0];
    }

    async update(bookUpdate) {
        const id = bookUpdate.id;
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Book with id=" + id);
            return null;
        }
        else {
            rows[0].set({ name: bookUpdate.name,info: bookUpdate.info,year: bookUpdate.year,cover_img: bookUpdate.cover_img });
            rows[0].save();
            return rows[0];
        }
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not delete Book with id=" + id);
            return null;
        }
        await rows[0].destroy({ force: true });
        console.log("Book with id=" + id + " has been deleted");
        return rows[0];
    }
}

module.exports = new SvcBooks()