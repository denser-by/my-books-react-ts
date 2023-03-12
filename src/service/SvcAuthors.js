const author = require('../../models/index.js').Author;

class SvcAuthors {
    async create(authorCreate) {
        try {
            const authorItem = await author.create({ name:authorCreate.name, info:authorCreate.info, age:authorCreate.age, photo:authorCreate.photo });
            return authorItem;
        } catch (e) {
            throw new Error('Can not create Author, ' + e);
        }
    }

    async getAll() {
        const { count, rows } = await author.findAndCountAll({});
        console.log("Found Author " + count + " records");
        if (count >= 1)
            return rows;
        return [];
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Author with id=" + id);
            return null;
        }
        return rows[0];
    }

    async update(authorUpdate) {
        const id = authorUpdate.id;
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find Author with id=" + id);
            return null;
        }
        else {
            rows[0].set({ name:authorUpdate.name, info:authorUpdate.info, age:authorUpdate.age, photo:authorUpdate.photo });
            rows[0].save();
            return rows[0];
        }
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await author.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not delete Author with id=" + id);
            return null;
        }
        await rows[0].destroy({ force: true });
        console.log("Author with id=" + id + " has been deleted");
        return rows[0];
    }
}

module.exports = new SvcAuthors()