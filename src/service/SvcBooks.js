const book = require('../../models/index.js').Book;

class SvcBooks {
    async create(bookCreate) {
        try {
            return await book.create({
                name: bookCreate.name,
                info: bookCreate.info,
                year: bookCreate.year,
                cover_img: bookCreate.cover_img,
                access_key: bookCreate.access_key
            });
        } catch (e) {
            throw new Error('Can not create Book, ' + e);
        }
    }

    async getAll() {
        var { count, rows } = await book.findAndCountAll({});
        if (count >= 1)
            return rows;
        return [];
    }

    async size() {
        return await book.count();
    }

    async hasOne(id) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count == 1 && rows[0].id == id)
            return true;
        return false;
    }

    async findOneByAccessKey(access_key) {
        if (access_key != null && access_key != undefined && access_key.length > 0) {
            var { count, rows } = await book.findAndCountAll({ where: { access_key: access_key } });
            if (count > 0)
                return rows[0];
        }
        return null;
    }

    async getOne(id) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        return rows[0];
    }

    async update(bookUpdate) {
        var id = bookUpdate.id;
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        rows[0].set({
            id: bookUpdate.id,
            name: bookUpdate.name,
            info: bookUpdate.info,
            year: bookUpdate.year,
            cover_img: bookUpdate.cover_img,
            access_key: bookUpdate.access_key
        });
        rows[0].save();
        return rows[0];
    }

    async delete(id) {
        if (id == null || id == undefined || id < 0)
            throw new Error('Не указан ID');
        var { count, rows } = await book.findAndCountAll({ where: { id: id } });
        if (count != 1)
            throw new Error('Object not found, ID=' + id);
        await rows[0].destroy({ force: true, truncate: true });
        return rows[0];
    }

    async deleteAll() {
        var { count, rows } = await book.findAndCountAll({});
        if (count < 1)
            throw new Error('Objects not found, items ' + count);
        rows.map(img => async function () {
            await img.destroy({ force: true, truncate: true });
        });
        return count;
    }
}

module.exports = new SvcBooks()