const user = require('../../models/index.js').User;

class SvcUsers {
    async create(userCreate) {
        try {
            const userItem = await user.create({ username: userCreate.username, password: userCreate.password, email: userCreate.email });
            return userItem;
        } catch (e) {
            throw new Error('Can not create User, ' + e);
        }
    }

    async getAll() {
        const { count, rows } = await user.findAndCountAll({});
        console.log("Found User " + count + " records");
        if (count >= 1)
            return rows;
        return [];
    }

    async getOne(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find User with id=" + id);
            return null;
        }
        return rows[0];
    }

    async update(userUpdate) {
        const id = userUpdate.id;
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not find User with id=" + id);
            return null;
        }
        else {
            rows[0].set({ username: userUpdate.username, password: userUpdate.password, email: userUpdate.email });
            rows[0].save();
            return rows[0];
        }
    }

    async delete(id) {
        if (!id)
            throw new Error('Не указан ID');
        const { count, rows } = await user.findAndCountAll({ where: { id: id } });
        if (count != 1) {
            console.log("Can not delete User with id=" + id);
            return null;
        }
        await rows[0].destroy({ force: true });
        console.log("User with id=" + id + " has been deleted");
        return rows[0];
    }
}

module.exports = new SvcUsers()